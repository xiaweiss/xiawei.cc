---
categories: 技术
date: 2018-01-01
file-title: {{ title }}
tags: [javascript]
title: 前端基础知识
updated: 2018-01-01
---

![](https://xiawei.cc/images/20180222.jpg)

<!-- more -->

## html
### 1. html 5 新特性

用于绘画的 canvas 元素

用于媒介回放的 video 和 audio 元素

对本地离线存储的更好的支持
localStorage、sessionStorage 不同浏览器容量不同，容量 4.98M。但注意 javascript 使用 utf-16 编码，所以最多有2.5M
http://dev-test.nemikor.com/web-storage/support-test/

Cookie不同浏览器容量不同， 最多容量4M ，50条数据。

新的特殊内容元素，比如 article、footer、header、nav、section

新的表单控件，比如 calendar、date、time、email、url、search

### 2. 同源策略
http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
同协议，同端口，同域名（一级二级域名是不同域名）

如果非同源，共有三种行为受到限制。

（1） Cookie、LocalStorage 和 IndexDB 无法读取。

（2） DOM 无法获得。

（3） AJAX 请求不能发送

### 3. 跨域
JSONP 它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。

它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

### 4. 标签语义化

通过标签判断内容语义，例如根据h1标签判断出内容是标题，根据`<p>`判断内容是段落、`<input>`标签是输入框等。

判断标签是否语义化：去掉样式，看网页结构是否组织良好有序，是否仍然有很好的可读性。

为什么标签要语义化
1. 搜索引擎友好。
2. 更容易让屏幕阅读器读出网页内容。
3. 去掉或样式丢失的时候能让页面呈现清晰的结构。
4. 便于团队开发和维护。

标题使用`<h2>`而不是`<div class="h2">`,段落使用`<p>`标签，锚点使用`<a>`。

## http 状态码

1** 信息
2** 成功  200
3** 重定向  304 (未修改)
4** 客户端错误
5** 服务器错误

## css3

选择器 [attribute^=value]  :nth-of-type(n) :nth-child(n)
盒模型 -> box-sizing:content-box border-box
背景和边框-> 圆角边框/背景图
文本效果
2D/3D 转换 -> 移动translate、缩放scale、转动rotate、拉长或拉伸skew  六个值的矩阵matrix
过渡 -> transition
动画  CSS3 动画属性
多列布局
弹性盒子(Flex Box)

##  javascript特性

### 1 类型
基本类型 number、boolean、string、null、undefined
复杂类型 array、function、object

### 2 类型的困惑
尽量避免用 new
```javascript
new String('a') instanceof String //true
'a' instanceof String //false

typeof null //'object'
typeof []   //'object'
[] instanceof Array //true
```
条件表达式里 null、undefined、'' 会被判定为 false

### 3 函数
```javascript
var a = function a () {
  'function' == typeof a //true，这里的 a 是前面那个 var a
}
```

### 4 函数的参数变量

```javascript
var a = fuction (b,c) {}
a.length //3
```

### 5 闭包
在某个作用域中定义的变量只能在该作用域或其内部作用域中才能访问到
```javascript
var a = 5;

function woot() {
  a==5;//false
  console.log(a==5);
  var a=6;

  function test () {
    a==6;//true
    console.log(a==6);
  }

  test();
};

woot();
```

自执行函数，通过声明调用匿名函数，定义新的作用域

```javascript
var a = 3;
(function(){
  var a = 5;
})()

a == 3; //true
```

### 6 类
类通过函数定义
```javascript
function Animal (name) {
  this.name=name;
}
Animal.prototype.getName() {
  return this.name;
}
```

### 7 深浅拷贝
属性的可枚举性和所有权 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties

`for...in` 可以循环出 可枚举属性，自身对象及其原型链。再使用 hasOwnProperty 判断，得到自身属性

## es6
### 1. let, const

var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

不允许重复声明

暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的

### 2. 块级作用域

ES5 只有全局作用域和函数作用域
ES6 的块级作用域 {}

### 3. es7

Array.prototype.includes  -> 代替 indexOf，返回true或false，还可以参数规定从第几位开始
求冥运算（次方）

## 事件传播

冒泡捕获
先捕获再冒泡

阻止传播 e.stopPropagation();

事件委托
```javascript
var parent = document.getElementById("parent");
var child = document.getElementById("child");
parent.onclick = function(e){
  if(e.target.id == "child"){
      console.log("您点击了child元素")
  }
}
```

## React 生命周期

http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

getderivedstatefromprops
