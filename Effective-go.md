# Effective Go

对于编程语言来说，可以简单地分为基础和高级用法两部分，基础用法主要在于自己多写，只要多写，慢慢就会熟练了，也没有看别人总结的必要。所以这里准备总结一下进阶用法。

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

看完以上的入门内容之后，就可以自己写一些简单的程序了，这个时候可以再去看《The Go Programming Language》这本书，被称为“Go语言圣经”，书并不厚，内容比较基础但覆盖的比较全面。中文版的民间翻译也不错：[Go语言圣经（中文版）](http://books.studygolang.com/gopl-zh/)

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

在项目中使用```go mod init```，会初始化一个```go.mod```文件，里面记录了项目文件中依赖的包以及对应版本。使用```go mod tidy```，则会自动整理（添加、删除）依赖，包括下载依赖包，但不会更新依赖包在```go.mod```中记录的版本。想要将某个依赖更新到最新版，可以使用```go get -u XXX```。

有时会遇到某个依赖包的远程的某个版本被删掉了，这时编译时就会因为找不到对应版本而报错，解决方法是将依赖更新到最新版本。

如果想要强制指定某个依赖的版本，比如因为兼容性问题不想更新到最新版的时候，则可以在```go.mod```中使用```replace```，比如：

```replace github.com/golang/protobuf => github.com/golang/protobuf v1.3.5```

## 接下来的部分
- gorm以及一些进阶用法
- sort&interface，reflect
- 匿名函数
- slice和map的底层原理
- defer的用法
- catch panic
- goroutine
- testing
- 内存管理、垃圾回收？？？
- go web 编程