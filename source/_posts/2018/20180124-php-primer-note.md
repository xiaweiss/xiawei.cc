---
categories: 技术
date: 2018-01-24
file-title: {{ title }}
tags: [php, note]
title: php 学习笔记
updated: 2018-02-07
---

![](https://xiaweiss.com/images/20180124.jpg)

> 一直想做点自己的小东西，所以开始学习后端知识了
> 目前是一些基础的语法速学记录，还在更新中，以后有时间会整理归纳

<!-- more -->

php 代码块 <?php   ?>
php 连接符 .
多行时，每行结尾必须加 ;
单行注释 //
多行注释 `/*   */`
变量 $开头 变量名必须以字母或下划线开始，如`”$_name”,”$name” ,”$name2”`等，但是”$9name”是不对的。
下划线命名法  `$my_apple`、驼峰命名法 `$myApple`
获取当前PHP消耗的内存 memory_get_usage()
在PHP中，支持8种原始类型，其中包括四种标量类型、两种复合类型和两种特殊类型
echo 打印
var_dump 输出类型和值
var_export 打印数组

布尔类型 不区分大小写 echo true;得到值1，echo false; 不输出值
== 比较运算符优先于 = 赋值运算符

整型 123
负数 -123
八进制数 0123
十六进制数 0x1a

浮点型 1.234
科学计数法，小写e或大写E  1.2e3 //1200  7.0e-10  //0.007

字符串
字符串型可以用三种方法定义：单引号形式、双引号形式和Heredoc结构形式。
字符串中包含引号的时候，1 单引号中嵌入双引号 2 双引号中嵌入单引号 3 里面的引号前使用转义符 \

当双引号中包含变量时，变量会与双引号中的内容连接在一起；
当单引号中包含变量时，变量会被当做字符串输出。
```php
$love = "I love you!";
$string1 = "hi,$love";// hi,I love you!
$string2 = 'hi,$love';// hi,$love
```

当我的字符串很长怎么办？

我们可以使用Heredoc结构形式的方法来解决该问题，首先使用定界符表示字符串（<<<），接着在“<<<“之后提供一个标识符GOD，然后是字符串，最后以提供的这个标识符结束字符串
```php
$string1 = <<<GOD
A
B
C
GOD;

echo $string1;//A B C
```
在赋值符号后，输入定界符“<<<”,接着是标识符，你可以用你的女神作为标识符“GOD”，如第1行，也可以使用你喜欢的狗狗，“DOG”作为标识符，但是，结尾处的标识符也必须是一样的。此外，在结尾的一行，如第4行，一定要另起一行，并且此行除了“GOD”，并以“；”号结束之外，不能有任何其他字符，前后都不能有，包括空格，否则会出现错误的哦。

特殊类型1—资源 1.txt
特殊类型2—空类型 null 大写NULL也可以

echo NULL，输出无结果

$var3 = "节日快乐！";
unset($var3);//NULL

常量 不允许重复定义、修改值
定义 define('name',value)  注意第三个参数写 true，可以大小写不敏感
还有一种定义方式，const PI = 3.14; 大小写敏感

取值 可以直接取值，也可以使用 constant('name')


[dinfine 和 const 的区别](https://stackoverflow.com/questions/2447791/define-vs-const)
注意
define() 必须在 class 外使用，在全局生效，运行时执行
const 在条件表达式内部不能使用，在当前命名空间生效，编译时执行，定义的速度更快
一般不用条件表达式时，尽量用 const

系统常量
__FILE__ 文件名和路径
__LINE__ 当前代码在第几行
PHP_VERSION 当前解析器的版本号
PHP_OS 执行当前PHP版本的操作系统名称

defined('常量名') 检测常量是否定义，返回 true 或 false


PHP运算符一般分为算术运算符、赋值运算符、比较运算符、三元运算符、逻辑运算符、字符串连接运算符、错误控制运算符。

赋值运算符 一般赋值 =   引用赋值 &，例如 $c = &$a;
“&”：引用赋值，意味着两个变量都指向同一个数据。它将使两个变量共享一块内存，如果这个内存存储的数据变了，那么两个变量的值都会发生变化。

逻辑运算符
与 &&、或 ||、非！、异或 xor (注意 and or xor 运算优先级很低，需要小括号括住)

字符串连接运算符 `.` 、 `.=`

错误控制运算符 @，可以放在变量和函数执行语句之前
开启了 track_errors 后，可以使用变量 $php_errormsg 输出错误信息
```php
ini_set('track_errors', 1);
$conn = @mysql_connect('localhost','username','password');
echo "出错了，错误原因是：".$php_errormsg;
```

算术运算符 `+ 、- 、* 、/ 、% 、+= 、-= 、*= 、/= 、%=`
向下取整 floor(4.25); //4
向上取整 ceil(4.25); //5

条件结构  if、switch
循环结构  while、do while、for、foreach
```php
foreach (数组 as 值){
//执行的任务
}
foreach (数组 as 下标 => 值){
 //执行的任务
}
```

数组
//设置某个变量为一个空数组
```php
$arr = array();
$fruit = array("苹果","香蕉","菠萝");
var_export($fruit);//打印数组
```

索引数组赋值有三种方式:
```php
$arr[0]='苹果';
array('0'=>'苹果');
array('苹果');//自动产生索引 0

$arr[] = '梨';//末尾插入新值
```

访问某个数组中索引的值
$arr[0] 或 $arr['0'];

获取数组长度 count($array);

php类
```php
//定义一个类，类名必须是字母或下划线开头
//$this 指向实例化后的类，来访问该类里的其他变量
class Car {
    var $name = '汽车';
    function getName() {
        return $this->name;
    }
}

//实例化一个car对象
$car = new Car();//这里括号不传参数时，可以省略
$car->name = '奥迪A6'; //设置对象的属性值
echo $car->getName();  //调用对象的方法 输出对象的名字
```

类的的属性和 fuction 前面有关键字public（公有），protected（受保护）或 private（私有），var 视为公有
类的 function 可以不写关键字，视为公有。属性必须写，否则报错。
受保护的不可以被外部调用，私有的只能被自己内部调用


使用关键字static修饰的，称之为静态方法，静态方法不需要实例化对象，可以通过类名直接调用，操作符为双冒号::
```php
class Car {
    public static function getName() {
        return '汽车';
    }
​}
echo Car::getName(); //结果为“汽车
```
注意静态方法，可以像普通方法一样调用，但静态属性不可以
静态方法内不可以使用 $this

静态属性 可以使用 static::$属性名，或者 self::$属性名 访问
静态方法 使用 static::方法名() 执行
访问父类时，使用 parent，例如 parent::方法名();

注意下面代码，写不写 static 输出结果是一样的。但属性这么玩会报错。
```php
class b {
  static function show () {
    return 123;
  }
};

$obj = new b();
echo $obj->show();//123
echo $obj::show();//123
```

类的构造函数，实例化 new 类时，这个函数会被执行
```php
function __construct();
```

在子类中如果定义了__construct则不会调用父类的__construct，如果需要同时调用父类的构造函数，需要使用`parent::__construct()`显式的调用。
```php
class Car {
  function __construct() {
    echo "父类的构造函数被调用\n";
  }
}

class Truck extends Car {
  function __construct() {
    echo "子类的构造函数被调用\n";
    parent::__construct();
  }
}
$car = new Truck();
```

类的析构函数，类被销毁时会调用 `__destruct`

类继承
子类可以继承
父类的属性和方法
但当子类有同名的属性和方法时，父类的会不执行，可以静态方法的方式来访问。

```php
class Car {
    public $speed = 0; //汽车的起始速度是0

    public function speedUp() {
        $this->speed += 10;
        return $this->speed;
    }
}
//定义继承于Car的Truck类
class Truck extends Car {
    public function speedUp() {
        parent::speedUp();
        $this->speed += 50;
    }
}

$car = new Truck();
$car->speedUp();
echo $car->speed;
```

Cookie
设置 cookie
```php
setcookie('test2', '哈', time() + 10, '/');//存入的值为 %E5%93%88
setrawcookie('test3', '哈');//存入的值为 哈

```



> 图片来源：https://www.pixiv.net/member_illust.php?mode=medium&illust_id=59688723
参考资料：
[慕课 PHP 入门篇](https://www.imooc.com/learn/54)
[慕课 PHP 进阶篇](https://www.imooc.com/learn/26)
