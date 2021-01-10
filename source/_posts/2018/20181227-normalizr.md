---
categories: 技术
date: 2018-12-27
file-title: {{ title }}
tags: javascript
title: Normalizr 使用教程
updated: 2018-12-27
---

![20181227](https://xiawei.cc/images/20181227.jpg)

> Normalizr 前端用于格式化数据结构的 Javascript 工具库。
> 官方文档写的不是很容易理解，这里按我的思路介绍一下，方便快速上手

<!-- more -->
[封面图来源][0]

{{ pixiv }}

可以把后端接口返回的数据格式化为类似数据表的形式，方便在 redux、flux 中进行数据管理

至于是否真的有必要使用，[这段评论][1]讲的挺好
> 部分项目里面有大量的类和对象（这些类和对象都是前端处理），这时候我们其实想要一个前端关系型数据库，而且还得能放进redux里面，该数据库要有索引（加快查询速度），符合数据库范式（增删改查数据不会产生副作用）。此时，normalizr就需要使用了

官方文档：https://github.com/paularmstrong/normalizr

例子
```javascript
const myData = [ { id: 1, name: 'apple' }, { id: 2, name: 'banana' } ]
const fruit = new schema.Entity('fruits');
const mySchema = [ fruit ]
const normalizedData = normalize(myData, mySchema)

console.log(normalizedData)
```

运行结果
```javascript
{
  entities: { fruits:
     { '1': { id: 1, name: 'apple' },
       '2': { id: 2, name: 'banana' } } }
  result: { fruits: [ 1, 2 ] }
}

```

使用说明：
1. 首先需要想象预期得到什么样的结果，来定义预期的数据结构

2. 声明需要提取出来的部分 schema.Entity
声明 schema
schema 共有 5 种方法 Array、Entity、Object、Union、Values

其中 Entity 基础类型用于提取数据，是必须要使用的，其他的看情况

例如 在数据里 `[ { id: 1, name: 'apple' }, { id: 2, name: 'banana' } ]`, 预期要把单个的水果信息`{ id: 1, name: 'apple' }`提取出来，变为索引 id `1`

那么首先就要定义一下这个 fruit

```javascript
const fruit = new schema.Entity('fruits')
```

此时预期的结构就是 `{ fruits }`

2. 声明数据值的类型
接下来需要确认 fruits 的值类型，这个例子里，是个数组
所以需要使用 new schema.Array(definition) 方法

```javascript
const mySchema = new schema.Array(fruit)
```

这里可以直接使用简写方式

```javascript
const mySchema = [ fruit ]
```

此时，预期的结构就是 `{ fruits: [] }`

3. 最后一步，输入原始数据，和预期的结构，完成格式化

```javascript
const normalizedData = normalize(myData, mySchema)
```

格式化完成

下面再依照上述步骤分析官方文档的 Quick Start 这个例子

先看原始数据
```javascript
{
  id: '123',
  author: {
    id: '1',
    name: 'Paul'
  },
  title: 'My awesome blog post',
  comments: [
    {
      id: '324',
      commenter: {
        id: '2',
        name: 'Nicole'
      }
    }
  ]
}
```

预期输出的格式
```javascript
{
  articles: {
    '123': {
      id: '123',
      author: '1',
      title: 'My awesome blog post',
      comments: [ '324' ]
    }
  },
  users: {
    '1': { 'id': '1', 'name': 'Paul' },
    '2': { 'id': '2', 'name': 'Nicole' }
  },
  comments: {
    '324': { id: '324', 'commenter': '2' }
  }
}
```

1. 声明预期的格式
先声明预期的格式 `{ articles, users, comments }`

```javascript
const article = new schema.Entity('articles')
const user = new schema.Entity('users')
const comment = new schema.Entity('comments')
```

然后这里注意到

* articles: 整个原始数据里 author 字段包含了用户信息、 comments 字段包含了评论信息
* comments: 评论信息里 commenter 字段包含了用户信息
* users: author 字段没有包含其他信息


所以需要明确相互的关系，改成这样

```javascript
const article = new schema.Entity('articles', { author, comments })
const user = new schema.Entity('users')
const comment = new schema.Entity('comments', { commenter })
```

2. 声明数据值的类型

接下来，进一步进行声明，并且适当调换变量的顺序，将范围大的放在后面
```javascript
const user = new schema.Entity('users')
const comment = new schema.Entity('comments', { commenter: user })
const article = new schema.Entity('articles', { author: user, comments: [comment] })
```

3. 最后一步，输入原始数据，和预期的结构，完成格式化

可以看出来，整个输入的数据，就是一个 article，所以这里的 mySchema 就是 article

```javascript
const mySchema = article
const normalizedData = normalize(myData, mySchema)
```


[0]: https://www.pixiv.net/member_illust.php?mode=medium&illust_id=55883093
[1]: https://segmentfault.com/q/1010000008816485
