# 技术学习 Roadmap

- [计算机基础知识](#计算机基础知识)
- [工具类](#工具类)
- [开发语言](#开发语言)
- [存储](#存储)
    - [MySQL](#mysql)
    - [Redis](#redis)
    - [更多存储](#更多存储)
- [进阶](#进阶)
    - [系统设计](#系统设计)
    - [编程哲学](#编程哲学)
    - [零碎topic](#零碎topic)
- [源码](#源码)

# 计算机基础知识
包括：

- 计算机网络：《计算机网络：自顶向下方法》
- 操作系统
- Linux操作系统原理，内核设计与实现
- 面向对象，设计模式：极客时间-《设计模式之美》；[Golang设计模式](https://github.com/senghoo/golang-design-pattern)
- 数据结构与算法：leetcode，《算法》，UCB网课CS 61B
- 分布式系统：[MIT 6.824](https://github.com/chaozh/MIT-6.824)、[MIT 6.824中文笔记](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/)、《分布式系统：概念与设计》

这些知识，不需要专门去学了，工作中也用不到，而社招面试的时候再用快速备战的方式去补就行了。

# 工具类
你不得不掌握的一些技术知识，掌握了会对你的生产力有极大提升，但是也不需要深入掌握。能够在需要的时候直接拿来用，快速上手写出来就行。

- 脚本语言：python，包括：文件处理、系统操作、爬虫，等等
- SQL：一些比较复杂的sql写法，hive-sql
- git
- vim
- Linux shell：常用shell命令

# 开发语言
Golang需要掌握的地方稍微多一些，可能需要比上述工具要深入一些，做到 effective go：

- 基础语法、常用标准库、包管理
- for、slice、map底层原理
- defer、panic、recover
- interface
- 并发编程：Goroutines，Channels，锁
- gc
- 性能优化专项

# 存储
## MySQL
掘金专栏：
https://juejin.cn/user/2418581312906087/books?type=bought

《高性能MySQL》

以及不懂的地方看MySQL官方文档

## Redis
《Redis设计与实现》

## 更多存储
- MongoDB
- hive/flink
- Elastic Search：极客时间专栏

# 进阶

## 系统设计
其实这部分的内容感觉都可以放到面试前再看，效率最大。一亩三分地上的系统设计神贴（已排序）：

- https://www.1point3acres.com/bbs/thread-683982-1-1.html
- https://www.1point3acres.com/bbs/thread-692488-1-1.html
- https://www.1point3acres.com/bbs/thread-559285-1-1.html
- https://www.1point3acres.com/bbs/forum.php?mod=viewthread&tid=771667&ctid=233194

DDIA：https://vonng.gitbooks.io/ddia-cn/content/

## 编程哲学

- 《代码大全》《重构》《代码整洁之道》
- 《编程珠玑》
- 《程序员的职业素养》
- 《程序员修炼之道》
- The Passionate Programmer: Creating a Remarkable Career in Software Development
- The Pragmatic Programmer - your journey to mastery(20th Anniversary Edition)
- ...

## 零碎topic

- Raft
- [MapReduce](https://juejin.cn/post/6844903812784717831)
- service mesh；dapr？

# 源码

先选一个深入就行：

- 消息队列
- golang源码：调度器、map、context......
- ~~gRpc~~，kitex
- ~~gin~~
- golang的缓存/友好的开源项目；[7days-golang](https://github.com/geektutu/7days-golang)
- 可以从[大佬书单](http://xiaorui.cc/archives/3342)获得一些灵感

## Kafka

- [掘金小册](https://juejin.cn/book/6844733792683458573)

## Zookeeper

文章：

- https://juejin.cn/post/6844903608975114247
- https://juejin.cn/post/6844903677367418893

专栏：[极客时间](https://time.geekbang.org/course/intro/100034201)

## Pulsar

- [官方文档](https://pulsar.apache.org/docs/v2.0.1-incubating/getting-started/ConceptsAndArchitecture/)；[中文](http://pulsar.apache.org/docs/zh-CN/next/concepts-architecture-overview/)
- [Pulsar原理](https://blog.csdn.net/u010869257/article/details/83211152)
- [Pulsar与Kafka对比](https://zhuanlan.zhihu.com/p/182573701)
- [BooKeeper原理](http://matt33.com/2019/01/28/bk-store-realize/)
