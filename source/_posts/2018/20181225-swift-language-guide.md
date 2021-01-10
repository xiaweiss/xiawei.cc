---
categories: 技术
date: 2018-12-25
file-title: {{ title }}
tags: iOS
title: Swift 指南学习笔记
updated: 2019-02-13
---

![20181225](https://xiawei.cc/images/20181225.jpg)

> 正在学习 Swift 中，简要的笔记~

<!-- more -->
[封面图来源][0]

[中文翻译 Swift 指南][1](需要科学上网)
[官方文档 Swift Language Guide][2]
推荐使用的划词翻译 Chrome 插件：[翻译侠][3]
如果官方版本有问题，请暂时使用这个 [替代版本][4]

### 基础内容

#### 数据类型

* Int      整数
* Double   浮点数 精度15位（不推荐 Float，精度6位）
* Bool     布尔值
* Tuples   元组, Tuples 不可以直接使用，语法例如(Int, String)
* nil      表示没有值
* Optional 可选类型，在类型后加上 ？表示。例如Int?，表示值可能为 nil，或者 Int 类型
* Array    数组

TODO: 获取判断数据类型  type(of: date)

#### 数据类型转换
所有转换都使用数据类型的函数来转换，即全部都为显式转换
例如字符串 Int("32")

#### 变量声明
var 声明变量
let 声明常量

声明变量时必须指定默认值。`var foo: Int = 1`
没有默认值时，也可以指定为可选类型。`var foo: Int?`
赋值的情况下类型指定可以省略，系统会自动推断，按住 option 键点击变量，即可看到类型推断的结果

#### 调试输出
print(foo, bar)

#### if 语句及强制展开
给可选类型赋值时，得到的值仍然是可选类型
例如声明 `var foo: Int? = 1`, foo 的值为 `Optional(1)`

使用可选类型内部的值有以下几种方式

1. 确认变量有值时，使用 `!` 强制展开（Forced Unwrapping）
```Swift
if foo != nil {
  foo!
}
```

2. 使用 if 语句自带的语法，进行可选项绑定（Optional Binding）
即如果 foo 内部的值不为 nil 时，它的内部的值会赋给 bar
变量 bar 只能在当前的 if 代码块内使用
```Swift
if let bar = foo {
  bar
}
```

3. 隐式展开可选项 Implicitly Unwrapped Optionals
把 `!` 放在类型声明后了，语法更简洁，bar 值是 foo 变量内部的值 或者 nil
```
let bar: Int! = foo
```

4. 利用 合并空值运算符 Nil-Coalescing Operator
如果 foo 内部有值，则返回内部值。如果 foo 内部值为 nil，则返回 `??` 后的默认值
默认值的类型必须与 foo 内置值类型相同
```
foo ?? nil
```

#### 错误处理

函数可以把自身的错误传递出去，传递到调用函数的作用域

通过 throws 来标记这种函数
```swift
func canThrowErrors() throws -> String
```

执行时，要求加上 try 标识符
```swift
try canThrowErrors()
```

由于有可能抛出错误信息，所以需要对错误进行捕获处理
错误会默认在 error 变量里
```swift
do {
  try canThrowErrors()
} catch {
  print(error)
}
```

另外还有 try? 和 try! 可以使用

使用 try? 错误时会得到值 nil

以下的 x、y 的处理相同的
```swift
let x = try? canThrowErrors()

let y: Int?
do {
    y = try canThrowErrors()
} catch {
    y = nil
}
```

自己确保不会出错时，可以使用 try! 取消错误传递，例如加载本地图片时
但如果出错了，会报运行时错误
```swift
let photo = try! loadImage("./Resources/John Appleseed.jpg")
```

### 基本运算符

#### 算术运算符 + - * / %  +=  -=

#### 一元减号运算符 Unary Plus Operator，可以取到负值
```Swift
var foo = 3
-foo // -3
foo = -3
-foo // 3
```

#### 合并空值运算符 Nil-Coalescing Operator
```Swift
a ?? b
```
如果可选项 a 有值则展开，如果没有值，是 nil ，则返回默认值 b 。表达式 a 必须是一个可选类型。表达式 b 必须与 a 的储存类型相同。

#### 区间运算符 Range Operators
闭区间 ClosedRange 例如 `1...5` 1,2,3,4,5
半开区间 Range 例如 `0..<5`  0,1,2,3,4

### 字符串
isEmpty 判断是否为空
字符串插值
```Swift
let multiplier = 3
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
// message is "3 times 2.5 is 7.5"
```

### 集合类型
![CollectionTypes_intro_2x](https://xiawei.cc/images/20181225-collection-types-intro.png)
数组 Array
集合 Set
字典 Dictionary

某个集合类型声明后，它内部所有值都是相同的类型

#### 数组
Array<Element> 或 [Element], 启动 Element 是内部元素的类型

声明数组
```Swift
var a = Array<Int>() // 空数组 []
var b = [Int]()      // 空数组 []
var c = Array(repeating: 0.0, count: 3) // [0.0, 0.0, 0.0]
var shoppingList: [String] = ["Eggs", "Milk"]
```

数组方法
```Swift
isEmpty
count
append(_:)
remove(at:)
insert(_:at:)
```

修改某个范围的值
`shoppingList[4...6] = ["Bananas", "Apples"]`

遍历数组
```Swift
for value in shoppingList {
    print(value)
}

for index in 0..<shoppingList.count {
    let value = shoppingList[index]
    print("index: \(index), value: \(value)")
}

// enumerated 方法返回元组
for (index, value) in shoppingList.enumerated() {
    print("index: \(index), value: \(value)")
}
```

#### 合集
合集将不重复的值，无序存放
Set<Element>

```Swift
var num: Set<Int> = [2, 1, 3]
```

合集方法
```Swift
isEmpty
contains(_:)
insert(_:)
remove(_:)
removeAll()
```

遍历合集
合集是无序的，遍历前使用 sorted 可以排序
```Swift
for value in num.sorted() {
    print(value) // 1,2,3
}

for value in num.sorted(by: >) {
    print(value) // 3,2,1
}
```

合集操作
![setVennDiagram_2x-1](https://xiawei.cc/images/20181225-set-venn-diagram.png)
intersection、symmetricDifference、union、subtracting

### 闭包
函数里可以传递函数作为参数，先声明一个接受函数作为参数的函数

```Swift
func calculator(n1: Int, n2: Int, operation: (Int, Int)->Int) -> Int {
    return operation(n1, n2)
}
```

使用声明函数的方式来调用

```Swift
func add (num1: Int, num2: Int) -> Int {
    return num1 + num2
}

calculator(n1: 1, n2: 2, operation: add)

```

使用闭包的方式来调用

```Swift
calculator(n1: 1, n2: 2, operation: {(num1: Int, num2: Int) -> Int in
    return num1 + num2
})
```

由于 swift 可以类型推断，而且 calculator 函数里声明过类型，可以去掉类型，简化为

```Swift
calculator(n1: 1, n2: 2, operation: {(num1, num2) in
    return num1 + num2
})
```

由于只有一行代码 return xxx，可以去掉 return 简化为
```Swift
calculator(n1: 1, n2: 2, operation: {(num1, num2) in num1 + num2})
```

闭包中，编译器会将参数标识为0、1、2，…，其中0代表第一个参数值，以此类推
```Swift
calculator(n1: 1, n2: 2, operation: { $0 + $1 })
```

甚至可以进一步简化，如果函数的最后一个参数是闭包，则可以先删除operation参数名称，再将闭包代码移到函数右边小括号的外面
```Swift
calculator(n1: 1, n2: 2) { $0 + $1 }
```

又例如把数组的每项值加一

```Swift
let array = [2, 5, 3, 7, 23, 54]

func addOne (n1: Int) -> Int {
    return n1 + 1
}

array.map(addOne)
```

使用闭包可以简化为
```Swift
array.map {$0 + 1}
```



### ChangeLog
20190129 添加错误捕获
20190213 添加闭包

[0]: https://www.pixiv.net/member_illust.php?mode=medium&illust_id=41544976
[1]: https://www.cnswift.org/the-basics
[2]: https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html
[3]: https://chrome.google.com/webstore/search/翻译侠
[4]: https://github.com/magic-FE/translate-man/issues/60
