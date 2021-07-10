# Gorm一些比较trick的用法踩坑总结

# Multiple Select

在代码里，如果我想select的数量是不确定的，是根据一个传入的列表动态决定的，有可能是6个数有可能是8个数，这时有可能会想到动态地拼 gorm 的 select 语句：
```go
var db *gorm.DB
var conditionList [][]int32 // 省略初始化
for _, val := range conditionList {
    db = db.Select("count(product_type in (?), orders.id, null))", val)
}
```
也就是，拼出来之后得到一个类似这样的gorm语句：
```go
db = db.Select("count XXX").Select("count XXX").Select(......)
```

**但是** ，这样运行之后会发现实际的sql语句只会有一个 select，其他的select都没有了，相当于只剩下：
```go
db = db.Select("count XXX")
```

这是因为在gorm里 `select` 只能指定(assign)一次。所以剩下的方法就是，自己拼一个大的字符串形式的select语句：

```go
var db *gorm.DB
var conditionList [][]int32 // 省略初始化
selectSql := ""
for _, val := range conditionList {
    if len(selectSql) == 0 {
        selectSql += fmt.Sprintf("count(product_type in (%v), orders.id, null))", val)
    } else {
        selectSql += fmt.Sprintf(",count(product_type in (%v), orders.id, null))", val)
    }
}
db = db.Select(selectSql)
```

当然，这样直接拼字符串会有sql注入的风险，更好的方法是使用 gorm 自带的拼接，实现方式是把动态条件统一放到一个 interface{} 的列表中，比如：

```go
var db *gorm.DB
var conditionList [][]int32 // 省略初始化
selectSql := ""
selectCondition := make([]interface{}, 0)
for _, val := range conditionList {
    if len(selectSql) == 0 {
        selectSql += "count(product_type in (?), orders.id, null))"
    } else {
        selectSql += ",count(product_type in (?), orders.id, null))"
    }
    selectCondition = append(selectCondition, val)
}
db = db.Select(selectSql, selectCondition...)
```
这样就能动态地拼接多个select语句了

# Scan to dynamic list

[https://kylewbanks.com/blog/query-result-to-map-in-golang](https://kylewbanks.com/blog/query-result-to-map-in-golang)

与上面的动态 select 类似，我们写代码的时候还不确定 select 了几个数，但后面需要 scan 出来，标准的scan 语句是

```go
var db *gorm.DB
var v1, v2, v3 int32
err := db.Row().Scan(&v1, &v2, &v3)
```

即scan 内部的参数是确定的，但对于动态的select，我们只能在运行的时候才能确定它的数量，这时怎么写gorm的scan语句呢？

第一反应可能想到，上面的几个数都是 int32 类型，所以gorm是否支持直接把所有结果扫到一个列表中呢：

```go
var db *gorm.DB
res ：= make([]int32, len(conditionList))
err := db.Row().Scan(res)
```
如果这样写，会收到类似```index out of range```的报错，因为res变量实际上还是只能接收结果集中的一列，其他列是没有指定变量来接收的

查了一下，发现scan是支持扫到一个interface的列表的：

```go
var db *gorm.DB
res := make([]interface{}, len(conditionList))
err := db.Row().Scan(res...)
```

但是，如果仅仅这样写，运行时又会有另一个报错：```destination not a pointer```，大意就是res里的元素并不是指针类型。所以我们需要把它的每个元素变成指针，就OK了：

```go
var db *gorm.DB

cols := make([]int32, len(conditionList))
scanRes := make([]interface{}, len(conditionList))
for i := range cols {
   scanRes[i] = &cols[i]
}

err := db.Row().Scan(res...)
```

最后再把scanRes里面的值读出来：

```go
res := make([]int32, 0)
for index := range scanRes {
    colVal, ok := scanRes[index].(*int32)
    if ok {
       res = append(res, *colVal)
    }
}
```

# Scan to interface

一般来说我们scan的时候，都是确定用什么类型的变量去接收值的，比如int32，string等，但如果直接用一个interface去接收，会发生什么？

```go
var db *gorm.DB
var res interface{}
db = db.Select("count(orders.id)").Table("orders").Where("XXXXX")
err := db.Row().Scan(&res)

switch res.(type) {
case int64:
    ...
case int32:
    ...
}
```

这个时候，符合我们对count结果的预期，res是一个int64的类型。不过，当我们的select语句变为：

```go
var db *gorm.DB
var res interface{}
db = db.Select("sum(orders.price)").Table("orders").Where("XXXXX")
err := db.Row().Scan(&res)

switch res.(type) {
case int64:
    ...
case int32:
    ...
}
```

这个时候，res的类型居然是 `[]uint8` ，内容是像[51 48 48 52 48]这样的东西，怎么也想不到是代表什么含义。后来在同事的灵光一闪下，觉得会不会是ascii码，然后一问48在ascii码里就是0，瞬间明了了。

所以，直接scan到interface，运气好的话会得到你想要的类型，运气不好的话gorm就会乱扫。还是用自己定义好的类型比较靠谱

# FirstOrCreate的同时更新一些字段

场景：满足某些where条件的某条记录，如果已经存在，则将这条记录的某些字段进行更新，如果不存在，则创建这条记录，同时更新指定的字段

FirstOrCreate语句可以满足不存在则创建记录的要求，但没法继续对指定字段进行更新，如果我们想要完成“不存在即创建，然后更新指定字段”的需求，有以下几种方式：

1. 使用多条语句，先使用where条件查找记录，若记录不存在，则直接创建，创建的同时指定要更新的字段值；若记录存在，直接更新 

2. 使用FirstOrCreate，找到该条要更新的记录，然后更新字段 

3. 使用事务 


下面介绍我目前发现的最佳方式：使用FirstOrCreate配合assign语句：

```go
var db *gorm.DB
// ...init...
userModel := &UserExtraInfo{
    AppId: appId,
    UserId: userId,
    KeyName: keyName,
    Value: value,
}
err = db.Where(UserExtraInfo{
    AppId: appId,
    UserId: userId,
    KeyName: keyName,
}).Assign(map[string]interface{}{
    "value": value,
}).FirstOrCreate(&userModel).Error
```

这样，就能在一条语句中完成上面的要求。需要注意的是，这种方式不太好写入 create_time和modify_time字段，所以对于这两个字段，最好在ddl中使用 `default current_timestamp` ，然后在gorm语句中忽略这两个字段：

```go
type UserExtraInfo struct {
    Id int64
    AppId int32
    UserId int64
    KeyName string
    Value string
    CreateTime time.Time `gorm:"-"`
    ModifyTime time.Time `gorm:"-"`
}
```

# 没有defer rows.Close()带来的坑

一篇很棒的剖析源码的blog： [GORM 之 for (rows.Next) 提前退出别忘了 Close](https://learnku.com/articles/39382)

gorm中调用Rows()函数进行查询的时候，需要获取一个连接。策略是：

1. 如果连接池中有空闲连接，返回一个空闲的
2. 如果连接池中没有空的连接，且没有超过最大创建的连接数，则创建一个新的返回
3. 如果连接池中没有空的连接，且超过最大创建的连接数，则等待连接释放后，返回这个空闲连接

rows.Close() 会释放掉连接，除此之外，在for rows.Next()的时候，如果没有下一行的话，或者准备下一条记录的时候出错了，也会释放连接。而如果用的是if rows.Next()，则可能会导致很多连接都没有释放。

# ErrRecordNotFound的坑
原先的一个查找的写法：
```go
if err := db.Table("users").Where("wechat_account = ?", wechat_id).First(u).Error; err != nil {
   return nil, err
}
```

这里隐含了一个依赖，就是如果没有查找到相应记录，会返回`ErrRecordNotFound`的错误。但是重构之后写法改成了传入optional条件进行query的形式，最终查询使用的语句是`db.Find()`。而在gorm中，First在查找不到记录时会返回`ErrRecordNotFound`的错误，但是Find不会，就导致重构前后的逻辑不一致
