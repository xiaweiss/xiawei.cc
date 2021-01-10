---
categories: 技术
date: 2017-11-15
file-title: {{ title }}
tags: [apache, centOS, php, 环境配置]
title: 在centOS7 编译安装 php、apache
updated: 2017-11-15
---
> 之前购买了阿里云服务器，为了运行自己的网站，需要 webServer
> apache httpd + php 或者 nginx + php 都是不错的选择
> 新手还是推荐使用 宝塔面板，可以一键安装部署

<!--more-->

## 0. 安装图形界面（不建议）
不推荐安装，会降低服务器性能。但自己本地练习，可以考虑安装
```
yum group install "GNOME Desktop" "Graphical Administration Tools"
yum groupinstall "Server with GUI"
```
默认启动图形界面：
```
# ln -sf /lib/systemd/system/runlevel5.target /etc/systemd/system/default.target
```
命令行界面：
```
# ln -sf /lib/systemd/system/runlevel3.target /etc/systemd/system/default.target
```
命令行界面下，启动图形界面：
```
# startx
```

## 1. 远程连接工具
windows 使用 Xshell
Linux 和 mac 使用 Terminal 即可

## 2. 设置用户
首先登录 root 账号

新增用户
```
useradd xiawei
```
修改用户密码
```
passwd 新密码
```
添加 sudo 权限
通过修改 /etc/sudoers

必须使用命令
```
visudo
```
找到 root  ALL=(ALL)   ALL
然后添加 xiawei ALL = (ALL)  ALL

## 3. 准备工作

源码目录：  **~/source**
安装目录： **/usr/local/soft**
网站目录： **/usr/local/soft/web**
```
	$mkdir source
    $sudo mkdir /usr/local/soft
    $sudo chown sxin:sxin /usr/local/soft/
    $mkdir /usr/local/soft/web
```
我们从官网下载Httpd和Php的源码
```
	$wget -P ~/source/ http://cn2.php.net/distributions/php-7.1.5.tar.gz
  $wget -P ~/source/ http://archive.apache.org/dist/httpd/httpd-2.4.25.tar.gz
```
解压
```
	$cd ~/source
	$tar -zxvf php-7.1.5.tar.gz && tar -zxvf httpd-2.4.25.tar.gz
```

## 4. 安装Httpd 2.4

Httpd Version 2.4 Compiling and Installing    http://httpd.apache.org/docs/2.4/install.html

### 4.1 Requirements
根据官网的文档。我们要先安装apr,apr-util和pcre

下载apr,apr-util,pcre源码
```
$wget -P ~/source/ http://archive.apache.org/dist/apr/apr-1.5.2.tar.gz
$wget -P ~/source/ http://archive.apache.org/dist/apr/apr-util-1.5.4.tar.gz
$wget -P ~/source/ ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.39.tar.gz
```

解压

```
$cd ~/source/ && tar -zxvf apr-1.5.2.tar.gz && tar -zxvf apr-util-1.5.4.tar.gz && tar -zxvf pcre-8.39.tar.gz
```

编译安装apr

```
$cd ~/source/apr-1.5.2/
$./configure --prefix=/usr/local/soft/apr
$make
$make install
```

编译安装apr-util

```
$cd ~/source/apr-util-1.5.4/
$./configure --prefix=/usr/local/soft/apr-util --with-apr=/usr/local/soft/apr
$make
$make install
```

编译安装pcre
> 如果安装时出错 configure: error: You need a C++ compiler for C++ support
> 解决:安装 yum install -y gcc gcc-c++

```
$cd ~/source/pcre-8.39/
$./configure --prefix=/usr/local/soft/pcre
$make
$make install
```

### 4.2 编译安装httpd
```
$cd ~/source/httpd-2.4.25/
$./configure --prefix=/usr/local/soft/httpd24 --with-apr=/usr/local/soft/apr --with-apr-util=/usr/local/soft/apr-util/ --with-pcre=/usr/local/soft/pcre --enable-so
$make
$make install
```
注:如果编译过程中 遇到  "Did not find pcre-config script at"等类似的错误 说明 pcre版本下载错了。 下的是PCRE2 要下载PCRE. 8.X是PCRE 10.X是PCRE2

## 5. 安装PHP 7.1.5
官方文档：
  [英文版](http://php.net/manual/en/install.unix.apache2.php)
	[中文版](http://php.net/manual/zh/install.unix.php)

```
$cd ~/source/php-7.1.5
$./configure --prefix=/usr/local/soft/php71 --with-config-file-path=/usr/local/soft/php71/conf --with-apxs2=/usr/local/soft/httpd24/bin/apxs
$make
$make install
```
注:如果编译过程中 遇到  "xml2-config not found. Please check your libxml2 installation"等类似的错误
请执行"sudo yum install libxml2 libxml2-devel -y"
编译过程中会遇到很多warning . 这个可以忽略。不过后面用过相关库会报错。 可以直接yum安装 也可以编译安装.和上面apr类似.也可以 用到了在安装扩展


## 6. 配置
### 6.1 配置PHP（可选）
将 source php 文件夹里的配置文件拷贝
```
$mkdir /usr/local/soft/php71/conf
$cp php.ini-development /usr/local/soft/php71/conf/php.ini
$vim /usr/local/soft/php71/conf/php.ini
```
定位到 include_path
输入/include_pah
```
include_path = ".:/usr/local/soft/php71/lib/php"
```
(Esc :wq)

### 6.2 配置HTTP
```
$vim /usr/local/soft/httpd24/conf/httpd.conf
```
整合PHP+HTTPD
定位到 LoadModule 附近[随便] (其实第一行 libphp7.so 已经有了)


LoadModule php7_module modules/libphp7.so
AddType application/x-httpd-php .php
AddType application/x-httpd-php-source .phps 监听端口 (没用80端口，80端口留给ngigx转发. 因为如果服务器有tomcat和httpd共存的话就只能其中一个用80端口)
Listen 1024 配置虚拟主机
运行用户[xxx 当前登录用户] User xxx
Group xxx


打开 Include conf/extra/httpd-vhosts.conf (最前面的#去掉)
```
$vim /usr/local/soft/httpd24/conf/extra/httpd-vhosts.conf
$mkdir -p /usr/local/soft/web/lesson1
```
写入
```
<VirtualHost *:1024>
DocumentRoot /usr/local/soft/web/lesson1
ServerName localhost:1024
DirectoryIndex index.html index.php
<Directory "/usr/local/soft/web/lesson1">
Options FollowSymLinks
Require all granted
</Directory>
</VirtualHost>
```


## 7. 启动HTTPD
```
$/usr/local/soft/httpd24/bin/apachectl start
```
如果出现 "AH00558: httpd: Could not reliably determine the server"s fully qualified domain name, using 127.0.0.1. Set the "ServerName" directive globally to suppress this message"
等提示信息 可以直接忽略或者去配置文件 把ServerName写上

通过 `ps -ef|grep httpd` 可以看服务是否启动成功

```
$vim /usr/local/soft/web/lesson1/index.php
<?php echo "hello jtthink";
```

访问 localhost:1024/index.php 即可看到结果.

## 8. 配置 阿里云 安全组设置，开放端口
阿里云设有安全拦截，必须开发端口才可以访问
[阿里云文档](https://bbs.aliyun.com/read/320667.html?spm=0.0.0.0.c7jrks)


参考资料：
[Install Gnome GUI on CentOS 7 / RHEL 7 - ITzGeek](http://www.itzgeek.com/how-tos/linux/centos-how-tos/install-gnome-gui-on-centos-7-rhel-7.html)
[Centos72下PHP71+Httpd24的 环境搭建（一） ](http://b.jtthink.com/read.php?tid=195)
[Centos72下PHP71+Httpd24的 环境搭建（二） ](http://b.jtthink.com/read.php?tid=196)
