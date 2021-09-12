# Build-your-programming-skills
A learning road map for junior programmers focusing from basic to advanced technical skills

工作之后，应该如何规划自己的技术学习路线？可以学的太多，但我们不能什么都学，而是应该有一个清晰的roadmap，一步一步慢慢积累，这样才能获得最大的加速度

这个仓库主要是记录我的学习笔记，会随着我的技术学习不断更新。目前有以下部分的内容：

- [Git](./Git-basic.md)
    - 基本命令
    - 分支管理
    - 查看记录
    - 提交更改
    - 分支合并
    - 撤销与回滚
- Golang，分为几个部分：
    1. [Effective Go](./Effective-go.md)
    2. [Golang性能优化与最佳实践](./Go-Best-Practice.md)
    3. [Go Dive（底层原理解析）](./Go-dive.md)
- [MySQL](./MySQL.md)
    - InnoDB记录结构
    - InnoDB数据页结构
    - 索引原理

------
剩余的篇幅，简单记录一下我所规划的技术学习路线，即我的roadmap：

## 计算机基础知识
包括：

- 计算机网络：《计算机网络：自顶向下方法》
- 操作系统
- Linux操作系统原理，内核设计与实现
- 面向对象，设计模式：极客时间-《设计模式之美》
- 数据结构与算法：leetcode，《算法》，UCB网课CS 61B

这些知识，不需要专门去学了，工作中也用不到，而社招面试的时候再用快速备战的方式去补就行了。

## 工具类
你不得不掌握的一些技术知识，掌握了会对你的生产力有极大提升，但是也不需要深入掌握。能够在需要的时候直接拿来用，快速上手写出来就行。

- 脚本语言：python，包括：文件处理、系统操作、爬虫，等等
- SQL：一些比较复杂的sql写法，hive-sql
- git
- vim
- Linux shell：常用shell命令

## 开发语言
还有一个，开发语言golang，不过golang需要掌握的地方稍微多一些，可能需要比上述工具要深入一些，做到effective go：

- 基础语法、常用标准库、包管理
- for、slice、map底层原理
- defer、panic、recover
- interface
- 并发编程：Goroutines，Channels，锁
- gc
- 性能优化专项

## 进阶

- 分布式：MIT course、DDIA、raft
- 《Redis设计与实现》
- MongoDB；hive/flink；es
- MySQL：掘金小册、《高性能MySQL》
- 架构，系统设计

下面分别说。当然，遇事不决，可以上极客时间找专栏看。
### 分布式
DDIA，永远滴神！
- MIT 6.824：https://github.com/chaozh/MIT-6.824
- raft 可视化：http://thesecretlivesofdata.com/raft/

### MySQL
掘金专栏：
https://juejin.cn/user/2418581312906087/books?type=bought

以及不懂的地方看MySQL官方文档

### 系统设计
其实这部分的内容感觉都可以放到面试前再看，效率最大。一亩三分地上的系统设计神贴（已排序）：

- https://www.1point3acres.com/bbs/thread-683982-1-1.html
- https://www.1point3acres.com/bbs/thread-692488-1-1.html
- https://www.1point3acres.com/bbs/thread-559285-1-1.html
- https://www.1point3acres.com/bbs/forum.php?mod=viewthread&tid=771667&ctid=233194

## 源码

先选一个深入就行：

- 消息队列
- gRpc
- ginex
- golang的缓存/友好的开源项目