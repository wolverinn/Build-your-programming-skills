# Go 性能优化&最佳实践

# Best Practice
## 哪些情况适合放在rpc？

- 可复用的一些逻辑，放在rpc方便多个上游调用，而下游只需要维护一套逻辑 

- 某张表由该服务来维护，可以把相关的增删查改操作都放在rpc层维护 

- http只进行读操作，更新创建删除放在rpc层 

## Bulletins
来自「Go语言圣经」：

- 不要将 Context 放到结构体中，而是以参数传递，并且在作为参数传递时，需要将其作为第一个参数传递
- 在Go语言中只有当两个或更多的类型实现一个接口时才使用接口，对于接口设计的一个好的标准就是 ask only for what you need（只考虑你需要的东西）。Go语言对面向对象风格的编程支持良好，但这并不意味着你只能使用这一风格。不是任何事物都需要被当做一个对象；独立的函数有它们自己的用处
- 变量命名：名字的长度没有逻辑限制，但是Go语言的风格是尽量使用短小的名字，对于局部变量尤其是这样；你会经常看到i之类的短名字，而不是冗长的theLoopIndex命名。通常来说，如果一个名字的作用域比较大，生命周期也比较长，那么用长的名字将会更有意义
- 变量覆盖：下面语句的err会被覆盖，从而导致错误不能正确返回 

```go
func shadow() (err error) {
    if y, err := check2(x); err != nil { // y和if语句中err被创建
        return // if语句中的err覆盖外面的err，所以错误的返回nil！
    } else {
        fmt.Println(y)
    }
    return
}
```

# Performance Optimization
十分推荐：[Go 语言高性能编程](https://geektutu.com/post/high-performance-go.html)，聚焦性能优化

## 字符串拼接
频繁操作字符串时，不推荐使用 `a += b` 或者`fmt.Sprintf("%s%s", a, b)`的形式，因为golang中字符串类型的变量是不可变的，所以每次go都会新创建一个临时变量。推荐的做法是： 

```go
var b bytes.Buffer
...
for condition {
    b.WriteString(str) // 将字符串str写入缓存buffer
}
return b.String()
```

还可以用`strings.Builder`或者`[]byte`：
```go
var builder strings.Builder
for condition {
	builder.WriteString(str)
}
return builder.String()
```

使用`[]byte`：
```go
buf := make([]byte, 0)
for condition {
	buf = append(buf, str...)
}
return string(buf)
```

`strings.Builder` 和 `bytes.Buffer` 底层都是 `[]byte` 数组，但 `strings.Builder` 性能比 `bytes.Buffer` 略快约 10% 。一个比较重要的区别在于，`bytes.Buffer` 转化为字符串时重新申请了一块空间，存放生成的字符串变量，而 `strings.Builder` 直接将底层的 []byte 转换成了字符串类型返回了回来。


- `bytes.Buffer`
```go
// To build strings more efficiently, see the strings.Builder type.
func (b *Buffer) String() string {
	if b == nil {
		// Special case, useful in debugging.
		return "<nil>"
	}
	return string(b.buf[b.off:])
}
```
- `strings.Builder`
```go
// String returns the accumulated string.
func (b *Builder) String() string {
	return *(*string)(unsafe.Pointer(&b.buf))
}
```

`bytes.Buffer` 的注释中还特意提到了：

> To build strings more efficiently, see the strings.Builder type.

## 对切片进行切片
使用`slice2 := slice1[m:n]`的方式在已有切片的基础上创建新的切片，不会创建新的底层数组。因此如果原切片由大量元素组成，即使新创建的切片只用到了其中一小部分元素，原切片的整个底层数组占用的内存还是会一直得不到释放。因此推荐的做法是使用`copy()`：

```go
result := make([]int, 2)
copy(result, origin[len(origin)-2:])
return result
```

## 使用`for range`迭代slice
一般来说，有以下三种方式遍历slice：

```go
// 1. 使用下标
for i := 0; i < len(slice1); i++ {
    item := slice1[i]
}

// 2. 使用range遍历下标访问
for i := range slice1 {
    item := slice1[i]
}

// 3. 使用range同时遍历下标和元素
for i, item := range slice1{
    // ...
}
```

上面几种方式中，方法#1和#2的性能是差不多的，而方法#3的差别就在于每次遍历元素时，都需要给当前遍历的元素创建一个拷贝，因此如果slice中的元素占用内存较高（比如一个元素很多的struct，而且还不是指针形式），那么方法#3的性能就会显著不如前两者。

## 用map实现集合(set)
对于集合来说，只需要 map 的键，而不需要值。即使是将值设置为 bool 类型，也会多占据 1 个字节。因此，可以将值定义为空结构体`struct{}{}`，节省内存空间：

```go
strSet := make(map[string]struct{})
```

空结构体不占用任何的内存空间，我们可以通过下面的代码查看它占用的字节数：

```go
fmt.Println(unsafe.Sizeof(struct{}{}))
```

## 加锁
Go 语言标准库 `sync` 提供了 2 种锁，互斥锁(sync.Mutex)和读写锁(sync.RWMutex)。读写锁的特点是在没有加写锁的情况下，多个读锁是不会阻塞的。因此，在读多写少的场景下，读写锁的性能会优于互斥锁的性能。

## 使用`sync.Pool`复用对象
`sync.Pool`可以保存和复用临时对象，好处是在高并发场景下，如果一个临时对象需要不断的被创建和使用，那么使用`sync.Pool`可以避免每次进行内存分配和垃圾回收，从而提升程序的性能。`sync.Pool` 用于存储那些被分配了但是没有被使用，而未来可能会使用的值。这样就可以不用再次经过内存分配，可直接复用已有对象。

`sync.Pool` 是并发安全的，同时大小也是可伸缩的，高负载时会动态扩容，存放在池中的对象如果不活跃了会被自动清理。

使用`sync.Pool`只需实现New函数即可：

```go
type Student struct{
    name string
}

var studentPool = sync.Pool{
    New: func() interface{} { 
        return new(Student) 
    },
}
```

获取`sync.Pool`中存储的对象：

```go
// 当调用 Get 方法时，如果pool里缓存了对象，就直接返回缓存的对象。如果没有，则调用 New 函数创建一个新的对象。
stu := studentPool.Get().(*Student) // 返回为interface类型，所以需要做类型转换
// do something
// 对象使用完毕后，放回pool，一般会先将对象清理为空
studentPool.Put(stu)
```

## 锁优化
1. 减少持有时间

```go
var users map[string]string{
    "name": "password",
}
var mu sync.Mutex

func CheckUser(name, password string) bool {
    mu.Lock()
    defer mu.Unlock()
    // access map
    // do something
    return 
}
```

优化版本：

```go
func CheckUser(name, password string) bool {
    func() {
        mu.Lock()
        defer mu.Unlock()
        // access map
    }
    // do something
    return 
}
```

2. 优化锁的粒度
使用分段锁。比如一个大map，通过设置多个锁，每个锁控制其中一部分，实现并发性能提升

3. 读写分离，使用读写锁
4. 使用原子操作

```go
atomic.Value
atomic.Load // load, store, swap ...
```

5. 使用race detector检测data race
