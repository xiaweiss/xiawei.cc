---
categories: 技术
date: 2017-11-14
file-title: {{ title }}
tags: [git, 环境配置]
title: 使用 git hook 实现服务器代码自动部署
updated: 2018-11-19
---
> 前几天把 Hexo 博客部署到了阿里云服务器，但发现每次推送文章都需要去服务器同步代码。最终寻找到 git hook 来解决了这个问题

<!--more-->

## 1. 说明
在服务器，要建一个相当于 github 存放功能的裸仓库来存储代码。
之所以叫裸仓库，是因为这个仓库只是为了存代码用的，没有工作目录，不可以在它里面查看改写代码。

在网站文件夹下，会有一个工作目录来存放代码，这个目录的代码可以像clone github代码库一样，clone 服务器里的裸仓库。

当服务器里裸仓库收到提交进来的代码后，会触发 git hook 的 post-receive 事件，配置好的程序就可以自动去工作目录的仓库执行 git pull，服务器代码就自动更新了

## 2. 配置步骤：

远程连接服务器，登录 root 账号

### 2.1 设置用户

新增用户xiawei，这里可以写你的名字
```
useradd xiawei
```

修改用户密码
```
passwd xiawei
```
输入新密码即可

给添加 sudo 权限 通过修改 /etc/sudoers

必须使用命令
```
visudo
```
按 i 键进入, 找到 root ALL=(ALL) ALL 然后下面添加 xiawei ALL = (ALL) ALL
```
root ALL=(ALL) ALL
xiawei ALL = (ALL) ALL
```

### 2.2 安装 git

查看是否安装 git
```
git --version
```
如果没有看到版本号，则继续安装 git
```
yum install git
```
设置 git 用户名邮箱
```
git config --global user.name "yourname"
git config --global user.email "your_email@example.com"
```

### 2.3 建立git裸仓库

假设网站的在 /www/blog/ 目录下，创建裸仓库
```
cd /www
sudo git init --bare blog.git
```
更改所属用户和用户组，获得权限
```
sudo chown -R xiawei:xiawei blog.git
sudo chown -R xiawei:xiawei blog
```

### 2.4 建立工作目录 git 仓库
```
cd /www/blog
git clone /www/blog.git
```

如果此时 blog 文件夹不是空的，会不能 clone
按先定义仓库，再设置远端仓库地址即可
```
cd /www/blog
git init
git remote add origin /www/blog.git
```
注意这时要删除掉 index.html 等和本地待提交代码重复的文件
```
rm index.html
```

### 2.5 设置 git hooks
```
cd /www/xiaweiss.git/hooks/
vim post-receive
```
按 i 键，将下面这几行代码粘贴进去
```
#!/bin/sh
unset GIT_DIR
cd /www/blog
git fetch --all
git reset --hard origin/master
```
（原来只使用的 git pull origin master 方式，代码冲突时，还需要手动登陆服务器解决 ）

赋予 post-receive 文件可执行权限
```
chmod +x post-receive
```

### 2.6 本地 配置
最后修改 Hexo 配置文件里 deploy项，每次发布代码会提交到这两个仓库
```
deploy:
- type: git
  repo: git@github.com:xiaweiss/xiaweiss.github.io.git
- type: git
  repo: xiawei@xiaweiss.com:/www/blog.git
```
如果是本地的其他项目，可以直接
```
git clone xiawei@xiaweiss.com:/www/blog.git
```
修改代码后，提交即可
