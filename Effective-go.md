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
firstOfMonth := time.Date()
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
    // os.Args[0]是程序的地址，从索引1开始才是命令行参数
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

## 接下来的部分
- gorm以及一些进阶用法
- sort&interface，reflect
- slice和map的底层原理
- defer的用法
- catch panic
- go mod注意事项，package，私有方法
- goroutine
- testing
- 内存管理、垃圾回收？？？
- go web 编程