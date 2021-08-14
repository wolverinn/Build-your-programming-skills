# Go Dance

对于编程语言来说，可以简单地分为基础和高级用法两部分，基础用法主要在于自己多写，只要多写，慢慢就会熟练了，也没有看别人总结的必要。所以这里准备总结一下进阶用法。

<!-- GFM-TOC -->
- [入门指南](#入门指南)
- [进阶指南](#进阶指南)
- [Useful Go Built-in Libraries](#useful-go-built-in-libraries)
    - [time](#time)
    - [encoding/json](#encoding/json)
    - [net/http](#net/http)
    - [math/rand](#math/rand)
    - [os](#os)
    - [strings](#strings)
    - [strconv](#strconv)
    - [unicode](#unicode)
    - [sort](#sort)
    - [testing](#testing)
- [包管理](#包管理)
    - [Package](#package)
    - [Go Module](#go-module)
- [函数进阶](#函数进阶)
    - [函数值](#函数值)
    - [匿名函数](#匿名函数)
    - [变长参数](#变长参数)
    - [defer](#defer)
    - [捕获异常](#捕获异常)
- [Interface & Reflect](#interface-&-reflect)
- [并发编程：Goroutines，Channels，sync包](#并发编程-Goroutines-Channels-sync包)
    - [Goroutines](#goroutines)
    - [Channels](#channels)
    - [sync.Mutex](#sync.Mutex)
- [Go Web编程](#go-web编程)
    - [Gorm操作数据库](#gorm操作数据库)

<!-- GFM-TOC -->

-------

## 入门指南
先简单的分享一下我入门的路线，我认为不用跟着某个网课之类的从头到尾走一遍，而是先快速掌握基本的语法，然后开始上手写代码，慢慢就熟练了，并且遇到不会的高阶用法的时候，也可以再去了解。

基本的地方主要包括：
- 如何安装、配置、编译运行
- go的**包管理**机制，如何导入包，如何更新、添加和删除依赖
- 基本输入输出怎么写，如何定义变量和对**变量**赋值，如何定义结构体以及赋值，如何使用指针
- 如何定义**函数**，**if、for、switch**语句怎么写
- 如何为结构体创建一个**方法**（method）
- 主要的**数据结构**如何定义、遍历、传递，主要有slice（切片）、map

有两个小巧的教程很适合：
- [Go by Example](https://gobyexample.com/)
- [Go语言之旅](https://tour.go-zh.org/welcome/1)

除此之外，还需要知道一些基本的 Goland IDE 的快捷操作，比如：
- 按住command键点击变量可快速跳转到定义
- opt+command+左：跳转到上个光标位置
- command+shift+f: 路径下搜索
- 双击shift：搜索全局
- command＋／：注释，取消注释
- 配置file watcher自动go fmt，goimports

## 进阶指南
看完以上的入门内容之后，就可以自己写一些简单的程序了，这个时候可以再去看《The Go Programming Language》这本书，被称为“Go语言圣经”，书并不厚，内容比较基础但覆盖的比较全面。中文版的民间翻译也不错：[Go语言圣经（中文版）](http://books.studygolang.com/gopl-zh/)

之后可以沿着下面几个方向来进阶学习：

1. 并发编程专题：Go语言圣经中也有，也比较推荐[Go语言高级编程](https://chai2010.cn/advanced-go-programming-book/ch1-basic/ch1-05-mem.html)中第一章的并发部分
2. 性能优化专项：可以多看一些博客文章，以及推荐[Go 语言高性能编程](https://geektutu.com/post/high-performance-go.html)
3. Go底层原理，包括并发（sync包）；slice与map的底层实现；内存管理、垃圾回收；Goroutine，调度器
4. Go Web编程：如果是为了开发工作的话不看也行，而看的目的就说要上升到源码，这一步开始就可以追求源码级了解了。参考的电子书：[Go语言高级编程](https://chai2010.cn/advanced-go-programming-book/ch4-rpc/readme.html)
5. Go著名项目，源码分析：比如消息队列、grpc、gin、分布式缓存groupcache，也可以参考[7days-golang](https://github.com/geektutu/7days-golang)

## Useful Go Built-in Libraries
当然，仅仅掌握最基本的用法，在开发中还是会遇到很多不顺手的地方，很多地方在实现的时候可能还是需要现场去查怎么用。但掌握了go的一些常用内置库的用法之后，开发起来就能顺手多了。下面介绍一些高频的内置库

推荐教程：[Go语言标准库](https://books.studygolang.com/The-Golang-Standard-Library-by-Example/)

### time
- 获取时间、时间戳

```go
// 获取当前时间
timeNow := time.Now()
// .Unix()可以将time.Time转换为时间戳
timestampNow := time.Now().Unix()
```
- 时间的加减

```go
time.Now().AddDate(0,0,1) // 当前时间+1天
time.Now().AddDate(0,-1,0) // 当前时间-1个月
time.Now().Add(3*time.Hour) // 当前时间+3小时

interval, _ := time.ParseDuration("24h")
interval1, _ := time.ParseDuration(fmt.Sprintf("-%vh", 3*24))
temp := time.Now().Add(interval)

// 得到某个时间距当前时间的差值
var a time.Time
duration := time.Since(a).Hours()
```

- 字符串格式的时间、时间、时间戳互相转换

```go
timeNow := time.Now()
// 时间转时间戳：.Unix()
nowUnix := timeNow.Unix()
// 时间戳转时间: time.Unix()
timeNow = time.Unix(nowUnix, 0)
// 时间转字符串格式，格式为"2006-01-02 15:04:05"，可以控制输出的格式，例如"2006-01 15:04"
nowStr := timeNow.Format("2006-01-02 15:04:05")
// 字符串格式解析为本地时间
timeNow, err := time.ParseInLocation("2006-01-02 15:04:05", nowStr, time.Local)
```

- 获取周几、本月1号的时间

```go
// 获取周几
weekDay := time.Weekday()
time.Weekday() == time.Monday() // 判断是否为周一

// 本月1号
timeNow := time.Now
firstOfMonth := time.Date(timeNow.Year(), timeNow.Month(), 1, 0, 0, 0, 0, time.Local)
```

### encoding/json
需要事先定义好变量类型，可以是普通数据结构，也可以是struct
```go
a := map[string]interface{}
aJosn, err := json.Marshal(a) // 编码为json

err := json.Unmarshall(aJson, &a) // json解码
```

### net/http
- Get方法

```go
resp, err := http.Get("https://www.baidu.com")
if err != nil {return}
defer resp.Body.Close()  // 一定要关闭Body
s, err := ioutil.ReadAll(resp.Body)
```

- Post方法，主要使用http.Client的Do方法

```go
httpClient := &http.Client{
    Timeout: 10 * time.Second,  // 一定要注意设置超时时间
}
// 假设已经设置好了url和要post的表单数据，这里FormData是json编码之后的数据，json编码见上面
url := "...."
FormData := "...."
// 设置request参数
req, err := http.NewRequest("POST", url, bytes.NewBuffer(FormData))
req.Header.Set("Content-Type", "application/json") // 还可以设置请求头参数
// 初始化http.Client发送请求
resp, err := httpClient.Do(req)
if err != nil {return}
defer resp.Body.Close()

// 解析返回的数据
statusCode := resp.StatusCode
header := resp.Header
body, _ := ioutil.ReadAll(resp.Body)
```

### math/rand
```go
// 先生成随机数种子
rand.Seed(time.Now().UnixNano())
rand.Intn(x) // 在0-x的范围内随机选一个数
```

go中的rand不支持从一个slice中随机选择一个元素，因此想要实现这个功能，只能结合：
```go
s1 := []string{"1","2","3"}
rand_value := s1[rand.Intn(len(s1))]
```

rand还可以打乱数组中的元素，调用rand.Shuffle即可：
```go
rand.Seed(time.Now().UnixNano())
// 将lst乱序，第一个参数是lst长度，第二个参数是一个func，实现了swap功能
rand.Shuffle(len(lst), func(i, j int) {lst[i], lst[j] = lst[j], lst[i]})
```

### os
获取命令行参数
```go
if len(os.Args) > 1 {
    // os.Args[0]是命令本身的名字，从索引1开始才是命令行参数
    a := os.Args[1]
}
```

### strings
一些字符串操作

```go
import "strings"

a := "go"
b := "hello"
strings.EqualFold(a, b)  // 计算两个字符串忽略大小写是否相等
strings.Contains(a, "i")
strings.ContainsAny(a, "i x")
strings.Count(b, "lo")
strings.Split("hello,world", ",")  // 同python的split
strings.Join([]string{"1","2","3"}, ",") // 同python的join
strings.HasPrefix("http://www", "http")
strings.HasSuffix("hello.go", "go")
strings.Index("hello", "l")
strings.LastIndex("hello","l")
strings.Join([]string{"name=xxx", "age=xx"}, "&")
strings.Replace("this\nis\na\nhello\n", "\n", " ", 2)  // 最后一个int指替换次数，如果小于0表示全部替换
strings.ToLower(a)  // strings.ToUpper(s string)
strings.Trim(str, " ") // 基本上就是python中的strip
```

### strconv
常用的字符串转换，主要是字符串和整数互转

主要使用```strconv.Parseint(s string, base int, bitSize int)```，返回int64，参数base表示转换为指定的进制，比如10进制，bitSize表示整数的实际类型，用于确定取值范围，比如0、8、16、32 和 64 分别代表 int、int8、int16、int32 和 int64。：
```go
import "strconv"
var a = "43212"
a_conv, _ := strconv.Parseint(a, 10, 0)
```

- int64转换为字符串

```go
strconv.FormatInt(102323, 10) // 10是base
```

### unicode
- 判断字符串是否含中文：

```go
import "unicode"
str := "Hello, 世界"
for _, r := range str {
	if unicode.Is(unicode.Han, r) {
		fmt.Print(string(r))
	}
}
// 直接取len()的话，一个中文字符会占3个长度
```

- 判断中文字符串长度：

```go
import "unicode/utf8"
utf8.RuneCountInString(str) // 判断长度
// 截取中文字符串
str = string([]rune(str)[:4])
```

### sort
sort包使得我们可以对自定义的一些类型进行排序，而我们需要做的就是对我们想要排序的类型实现```Len()```，```Less()```，和```Swap()```三个方法，之后就可以调用```sort.Sort()```进行排序。比如，我们自定义了一种结构体：

```go
type Person struct {
    Name string
    Age int
}
```

那么，当我们相对一个```[]Person```类型的变量进行排序的时候，我们首先需要对```[]Person```这种类型实现一下```Len()```，```Less()```，和```Swap()```三个方法：

```go
type PersonSlice []Person

func(p *PersonSlice) Len() int {
    return len(p)
}
func (p *PersonSlice) Swap(i, j int) {
    p[i], p[j] = p[j], p[i]
}
func (p *PersonSlice) Less(i, j int) bool {
    return p[i].age < p[j].age  // 如果要从高到低排则交换一下顺序即可
}
```

接下来就可以直接调用sort包进行排序了：

```go
var ps []Person // 这里省略初始化

sort.Sort(PersonSlice(ps)) // 先进行类型转换，将ps转换为PersonSlice类型
```

当然，对于一些基础的类型：```int```，```float64```，```string```，sort包已经内置了对它们的排序函数，直接调用```sort.Strings()```就行

### testing
简单介绍一下golang中的测试函数，使用测试函数我们可以方便地测试代码，比如我们在某个包中实现了一些函数，想要测试函数的功能是否符合预期，这时专门为这些函数去写一个main函数来执行显得有些麻烦，而通过测试函数我们可以实现这一目的。

在包目录内，新建一个以```_test.go```结尾的文件，然后把测试代码放在这个文件里面。在构建代码的时候，```*_test.go```不会被构建为包的一部分。

在```*_test.go```文件中，我们可以开始写我们的测试函数，测试函数需要以```Test```开头，并且需要使用testing包，函数的后缀名需要以大写开头，比如：

```go
fun TestName(t *testing.T) {
    /*
    ...
    */
}
```

写好测试函数之后，我们在包目录下，运行```go test```，然后包下面的所有测试函数都会得到调用，并且输出结果

## 包管理
### Package
go的文件都以```package PACKAGE_NAME```开头，表示这个文件属于哪个包，如果是```package main```表示这个文件是可以运行的。同一目录下的文件的package名称都相同。

我们可以通过新建一个目录，在目录下新建若干go源文件的方式来创建自己的package，每个go源文件的的package的名字都是统一的（即我们创建的包的名字），它们也都属于同一个包，不同源文件中定义的函数也都可以互相使用，并不存在需要先声明再调用的限制。在该目录下可以使用```go build```对我们的包进行编译。

在其他文件中，可以使用```import "path/to/PACKAGE_NAME"```来导入包，从而引用包中的结构体、函数等等。go不允许循环引用。使用```import ALIAS "path/to/PACKAGE_NAME"```的方式可以以别名的形式导入包。

go也不允许导入未使用的包，如果我们需要使用某个包中的init()方法，但又不会使用这个包，可以使用```import _ PACKAGE```匿名导入。如果导入了未使用的包，编译会报错，一个比较好的方式是使用```goimports```工具，可以自动清除文件中未使用的导入包。对某个路径下的所有文件使用```goimports```的方法为：```goimports -w path/```

在package中，我们可以定义一系列的变量、常量、类型、结构体、方法、函数等，如果我们定义的变量、函数、etc...的名称是大写开头，则这些变量、函数对于调用这个包的外部调用者是可见的，如果是小写开头，则这些变量、函数就叫做unexported（未导出的），**可以理解为私有方法**，只有在包的内部才能使用这些变量、函数。这样的方式提供了安全性和更好的封装性，包的调用者不需要关心一些实现细节，而是只使用包提供的方法。

有些包中可能会需要一个初始化函数，来初始化一些全局变量，比如初始化某个map的长度，初始化一个数据库链接等等。在包中使用```init()```函数，则在初始化的时候，```init()```中的内容会自动执行。**每个包都会以导入的顺序进行初始化，然后main函数才会开始执行**。

另一种初始化包级变量的方式是手动定义可导出的初始化函数，比如```InitMap()```，然后在主函数的文件的```init()```函数中，手动调用这个包的```InitMap()```

### Go Module
go提供了自己的包管理工具```go mod```，在环境变量中配置```export GO111MODULE=on```即可使用。```go mod```可以自动添加、删除、下载依赖，支持从常用的git仓库如GitHub下载依赖，非常易于使用。

在项目中使用```go mod init```，会初始化一个```go.mod```文件，里面记录了项目文件中依赖的包以及对应版本。使用```go mod tidy```，则会自动整理（添加、删除）依赖，包括下载依赖包，但不会更新依赖包在```go.mod```中记录的版本。想要将某个依赖更新到最新版，可以使用```go get XXX```。关于`go get`有几点冷知识：

- `go get XXX`某个包，如果这个包之前是用语义化版本控制的，也就是git上打tag的`v1.0.4`的这种形式，那么`go get`只会更新这个包到最新的语义化版本，也就是说如果有最新的commit没有打tag，使用`go get`还是不能更新到这个commit，这时可以用`get get XXX@master`
- `go get -u XXX`中的`-u`参数不是更新到最新版本的意思，而是指同时更新该依赖中所有参与编译的依赖到最新版本
- 若`go get`的目标package为main，还会同时编译安装二进制到`$GOPATH/bin`

如果多个依赖包中对某个特定依赖包的依赖版本不同，`go mod`会选择所有依赖版本中最高的那个版本

如果想要强制指定某个依赖的版本，比如因为兼容性问题不想更新到最新版的时候，则可以在```go.mod```中使用```replace```，比如：

```replace github.com/golang/protobuf => github.com/golang/protobuf v1.3.5```

使用`go mod graph`可以查看所有依赖项之间的依赖关系，比如用`go mod graph | grep XXX`可以查到某个依赖项是如何被依赖的。

常见报错：

- 升级了某个依赖之后，编译报错。原因一般是使用了`go get -u`同时升级了依赖的依赖，而导致了不兼容，所以如无必要，不使用`-u`参数
- `unknown revision v1.X.X`：该依赖包的远程的某个版本被删掉了，这时编译时就会因为找不到对应版本而报错，解决方法是将依赖更新到最新版本

## 函数进阶
### 函数值
函数也可以当作值来使用，一个简单的例子：
```go
func square(n int) int { return n * n }

func main() {
    f := square
    fmt.Println(f(3)) // "9"
}
```

函数像其他值一样，拥有类型，可以**被赋值给其他变量，传递给函数，从函数返回**。一个将函数值传递给函数的例子：
```go
func TryTimes(ctx context.Context, tryTime int, duration time.Duration, dofunc func() error) (err error) {
	if tryTime < 1 && tryTime > 5 {
		return fmt.Errorf("Error TryTime")
	}
	for i := 0; i < tryTime; i++ {
		err = dofunc()
		logs.CtxInfo(ctx, "try No.%v time err: %v", i, err)
		if err == nil {
			break
		}
		time.Sleep(duration)
	}
	return err
}
```

### 匿名函数
通过```func```关键字后面不带函数名的方式，我们可以定义匿名函数，比如用在上面定义的```TryTimes```函数中：
```go
err = TryTimes(ctx, 3, 0, func() error {
    err := rpc.Call(...)
    return err
})
```

后面的defer语句中，也可以用到匿名函数，将匿名函数放在defer的后面。

匿名函数中如果捕获了外部变量，称为闭包（closure），闭包对捕获的外部变量并不是传值方式访问，而是以引用的方式访问。

有两种匿名函数的写法需要注意一下：

```go
var i int

defer fmt.Println(i) // 即刻确定i

defer func() {
    fmt.Println(i) // 运行结束捕获i
}

i += 1
```

再看一个例子加深理解：

```go
func Increase() func() int {
	n := 0
	return func() int { // 这里返回了一个闭包函数，该函数访问了外部变量n
		n++
		return n
	}
}

func main() {
	in := Increase()
	fmt.Println(in()) // 1
	fmt.Println(in()) // 2
}
```

### 变长参数
在声明函数时，通过在参数类型前面加上```...```可以让函数接收任意数量的该类型参数，在golang的```fmt.Sprintf```，```append```，gorm的```db.Where()```中都使用了这种方式。一个例子：

```go
func sum(vals ...int) int {
    total := 0
    for _, val := range vals {
        total += val
    }
    return total
}
```

### defer
defer中的内容可以在函数**正常结束返回（return）**或者函数产生**panic异常结束**的时候得到执行，这一机制可以让我们方便地进行一些资源的释放，或者捕获panic异常，因为不管在函数执行过程中发生了什么，defer中的内容总是确保可以得到执行。

在没有defer的情况下，我们需要小心地处理每一次错误返回以及异常处理，确保在函数返回时能够同时将开启的资源释放掉，这就意味着我们要在很多地方写上释放资源的语句。随着函数越来越复杂，维护清理逻辑将变得越来越困难。而使用defer之后，我们只需要在开启资源的时候同时加上一条defer语句回收资源，就能保证资源得到释放。

defer常用的场景举例：
```go
// 加锁之后释放锁
var mu sync.Mutex
mu.Lock()
defer mu.Unlock()

// 关闭数据库链接
rows := *sql.Rows
defer rows.Close()

// 释放文件资源
f, _ := os.Open(filename)
defer f.Close()
```

当然，defer还有一个常见用法是用来捕获运行时发生的panic异常，见下文。

在函数中可以多次使用defer语句，最终这些defer语句的执行顺序按照先入后出（FILO）的原则，即**先声明的后执行**。

defer的执行时机是在return之前，看如下两个例子：

```go
func testDeferReturn() int {
   a := 1
   defer func() {
      a = 2
   }()
   return a // 返回 1
}

func testDeferReturn1() (ret int) {
   ret = 1
   defer func() {
      ret = 2
   }()
   return ret // 返回 2
}
```

### 捕获异常
函数运行过程中有可能会发生panic，比如数组的索引越界，或者尝试访问一个未初始化的值为nil的map，或者尝试访问某个值为nil的结构体中的一些元素。如果这时不想让进程崩溃，可以使用```recover```捕获异常：

```go
func DoSomething() (err error) {
    defer func() {
        if p := recover(); p != nil {
            err = fmt.Errorf("internal error: %v", p)
        }
    }()
    /*
    ...
    */
}
```

通过```runtime.Stack```，我们可以获取完整的堆栈调用信息，帮助我们更好地定位问题：

```go
import "runtime/debug"

func DoSomething() (err error) {
    defer func() {
        if p := recover(); p != nil {
            err = fmt.Errorf("internal error: %v", p)
            logs.Printf("fatal panic, error: %v, stack: %v", p, debug.Stack())
        }
    }()
    /*
    ...
    */
}
```

## Interface & Reflect
[Interface](./golang/Golang%20Interface%20&%20Reflect.md)

## 并发编程：Goroutines，Channels，sync包
todo
### Goroutines
在Go语言中，每一个并发的执行单元叫作一个goroutine。使用go关键字即可以创建一个goroutine，使得我们能够并发执行一些任务：

```go
go func() () {
    // ...
}()
```

goroutine是并发执行的，不会阻塞下面的操作。但如果我们使用了多个goroutine，并且想要等待这些goroutine全都运行完毕再执行下一步的操作，这时可以使用```sync.WaitGroup```：

```go
wg := sync.WaitGroup{}

wg.Add(1)
go func() () {
    defer wg.Done()
    // ...
}()
wg.Add(1)
go func() () {
    defer wg.Done()
    // ...
}()
...

wg.Wait() // 等待上面的goroutine都执行完毕
```

### Channels
一个channel是一个通信机制，它可以让一个goroutine通过它给另一个goroutine发送值信息。每个channel都有一个特殊的类型，也就是channels可发送数据的类型。一个可以发送int类型数据的channel一般写为chan int。一个channel有发送和接受两个主要操作

```go
ch := make(chan int) // ch has type 'chan int'，是一个不带缓存的channel

ch <- x  // a send statement
x = <-ch // a receive expression in an assignment statement
<-ch     // a receive statement; result is discarded

for x := range ch {
    fmt.Println(x) // channel支持range操作，当channel关闭且没有值可接收时for循环退出
}

close(ch) // 关闭操作
x, ok := <-ch // 对于已经关闭的channel，ok为false
```

Channel还支持close操作，用于关闭channel，随后对基于该channel的任何发送操作都将导致panic异常。对一个已经被close过的channel进行接收操作依然可以接受到之前已经成功发送的数据；如果channel中已经没有数据的话将产生一个零值的数据。试图重复关闭一个channel将导致panic异常，试图关闭一个nil值的channel也将导致panic异常。

channel分为带缓存的和不带缓存的两种。一个基于无缓存Channels的发送操作将导致发送者goroutine阻塞，直到另一个goroutine在相同的Channels上执行接收操作；反之，如果接收操作先发生，那么接收者goroutine也将阻塞，直到有另一个goroutine在相同的Channels上执行发送操作。

通过```ch := make(chan string, 3)```的方式可以创建一个带缓存的channel，如果内部缓存队列是满的，那么发送操作将阻塞直到因另一个goroutine执行接收操作而释放了新的队列空间。相反，如果channel是空的，接收操作将阻塞直到有另一个goroutine执行发送操作而向队列插入元素。内置的```cap()```可以获取channel的容量，而```len()```可以获取channel中有效元素的个数。

可以通过带缓存的管道来实现最大并发数控制：

```go
var limit = make(chan int, 3)

func main() {
    for _, w := range work {
        go func() {
            limit <- 1
            w()
            <-limit
        }()
    }
    select{}
}
```

select语句会选择case中能够执行的语句去执行，有点类似switch，如果多个case同时就绪时，select会随机地选择一个执行

```go
for {
    select {
    case <-ch1:
        // ...
    case x := <-ch2:
        // ...use x...
    case ch3 <- y:
        // ...
    case <-time.After(time.Second):
        // ... timeout
    default:
        // ...
        return
    }
}
```

需要注意的是，select中如果用了break，跳出的只是select，而不是外面的for循环

### sync.Mutex
```sync.Mutex```提供了互斥锁：

```go
var mu sync.Mutex

func DoSomething() {
    mu.Lock() // 如果已经上锁，则这一步会阻塞直到锁被释放
    defer mu.Unlock()
    // ...
}
```

除此之外，还有```sync.RWMutex```，```sync.Once```也提供了很不错的特性。

`sync.RWMutex`提供了读写锁，一般有以下几种情况：

- 在没有写锁的情况下，读锁是无阻塞的
- 写锁之间互斥，存在写锁，则其他写锁阻塞
- 写锁和读锁之间互斥，存在写锁则读锁阻塞，存在读锁则写锁阻塞

使用`sync.RWMutex`加读写锁的方法：


- Lock 加写锁；Unlock 释放写锁
- RLock 加读锁；RUnlock 释放读锁

`sync.Once`一般用于初始化变量，好处是可以在代码任意位置用到的时候再初始化，而不一定要放在init中，并且并发场景下是线程安全的，基于`sync.Once`重新实现单例模式：

```go
var (
    instance *singleton
    once     sync.Once
)

func Instance() *singleton {
    once.Do(func() {
        instance = &singleton{}
    })
    return instance
}
```

## Go Web编程
开发中都是用的框架，基本上只需要关注得到request参数之后处理返回response的逻辑部分。所以如果想要了解更多，可以去看：
- [Go web 编程](https://astaxie.gitbooks.io/build-web-application-with-golang/content/zh/)：这本电子书是作者从零开始介绍如何自己实现常用的web操作，个人感觉可能不如直接去看流行的web框架源码分析
- [Go语言高级编程](https://chai2010.cn/advanced-go-programming-book/ch4-rpc/readme.html)：包含了rpc和http的一些源码实现分析，写的还不错

### Gorm操作数据库
gorm框架是go web编程中操作数据库的一个常用的库，基本用法可以参考写的很不错的[官方文档](https://gorm.io/zh_CN/docs/query.html)，你可能还需要这个工具：[sql2go](https://sql2gorm.mccode.info/)

除此之外，我总结了一些gorm的进阶用法，这里单独写一下。

[gorm trick](./golang/Gorm一些比较trick的用法踩坑总结.md)
