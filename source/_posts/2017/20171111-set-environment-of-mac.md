---
categories: 技术
date: 2017-11-11
file-title: {{ title }}
tags: [mac, 环境配置]
title: Mac 基本开发环境配置
updated: 2019-01-28
---
> 因为自己喜欢苹果产品的体验，还有可以提高工作效率
> 作为一只单身汪，下决心买了 Mac Air
> 用了几天里的零碎时间，配好了环境，分享过程给大家

<!--more-->

## 1. 快捷键符号
⌃ Control
⌥ alt/option
⌘ command
⇧ shift
⇪ caps lock

## 2. 中文输入法设置
设置Spotlight 的快捷键与更换输入法的快捷键，不要占用`Control`键`^`
在`System Preferences > Keyboard > Shortcuts`里设置

把 Spotlight 设置为 `⌥Space`，把更换输入法设置为 `⌘Space`；而 Spotlight 中，Show Finder Search Window 不使用快捷键；Input Sources 中，Select next source in Input menu 不使用快捷键

## 3. 命令行（Terminal/iTerm的基本设置）
请逐次拷贝粘贴以下命令行，而后再按回车键执行
(1)
```
cd ~
```
(2)
```
curl -O https://raw.githubusercontent.com/donnemartin/dev-setup/master/.bash_profile
```
(3)
```
curl -O https://raw.githubusercontent.com/donnemartin/dev-setup/master/.bash_prompt
```
(4)
```
curl -O https://raw.githubusercontent.com/donnemartin/dev-setup/master/.aliases
```
全部完成之后，重启 Terminal（就是关掉退出之后，再重新打开）。刚才的命令完成了很多事情，只不过现在你搞不懂，你能看到的就是命令行提示变得花花绿绿了，各种颜色有不同的意义。(实际上，相当于把大牛写好的配置文件存到了本地，来自[donnemartin/dev-setup](https://github.com/donnemartin/dev-setup))

接下来，要为 Terminal 换个皮肤
[Solarized](https://github.com/tomislav/osx-terminal.app-colors-solarized)
[Spacegray](https://github.com/wtanna/Spacegray-OSX-Terminal-Theme)
点 Clone and Download 下载到 `Spacegray.terminal` 文件，打开 terminal ，在工具栏打开偏好设置（快捷键`⌘,`）,打开Profiles，点下面小齿轮，点导入，选择文件 `Spacegray.terminal`，最后设置为默认

 references > Profiles > Spacegray > Text > Font 可以设置字体大小

> 还有，Mac OSX 其实还有很多快捷键可以设置，其中一个比较重要的是 New Terminal at Folder，在System Preferences > Keyboard > Shortcuts > Services > Files and Folders 里可以找到。我把它设置成了 ⌃⌥⌘T，以后在 Finder 里，用鼠标选中某个文件夹（或称“目录”），然后按 ⌃⌥⌘T，就可以呼出 Terminal 并且将工作目录转至这个文件夹内…… 很方便  

PS: 这个设置快捷键的方法，并没有起作用，日后研究。

有三个 Mac OSX 系统自带的东西，工程师们会觉得不够用，进而造出更好的东西来替代，它们分别是：
* Terminal → [iTerm](https://www.iterm2.com/)  [iterm2有什么酷功能？ - 知乎](https://www.zhihu.com/question/27447370)
* Finder → [TotalFinder is a better Finder](https://totalfinder.binaryage.com/) / [Path Finder](https://cocoatech.com/)
* Spotlight → [QuickSilver](https://qsapp.com/) / [Alfred](https://www.alfredapp.com/)

下载 iTerm 之后，要为它更换皮肤，设置字体，设置字体大小......
iTerm 的颜色主题 [iTerm Spacegray](https://github.com/christianbundy/spacegrey-iterm)

字体推荐 Menlo

## 4. 命令行的使用
常用命令
```
ls #罗列当前目录下的内容
cd #更换工作目录
pwd #现实当前完整工作目录
touch #创建一个文件
mv #移动/更名文件或目录
rm #删除文件活目录
nano #使用 nano 编辑纯文本文件
open #打开一个文件，就好像你在 Finder 里双击那个文件图标一样
clear #清空屏幕
sudo #用管理员身份去执行一个命令
```

学习快捷键的好去处:
> <https://github.com/0nn0/terminal-mac-cheatsheet>  

## 5. 安装必要开发环境

### 5.1 Xcode Command Line Tool
首先 在Terminal里敲命令时，系统会出来个提示框 要求安装 command line tools，点击安装即可
不需要安装 Xcode。

过去安装这个东西费劲死了，在需要翻山越岭的情况下下载两个多 G 的东西，唉…… Mac OSX EI Capitan 之后，终于可以在命令行工具（Terminal）下这样安装了：
```
xcode-select --install
```

### 5.2 同意 xcode 许可
```
sudo xcodebuild -license
```
输入 开机密码
反复按 `Space`翻页
然后输入 `agree` 按回车键 ⏎

### 5.3 安装 Homebrew
命令行工具中拷贝粘贴以下代码，而后按回车键 ⏎
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
随后再次在命令行工具中拷贝粘贴以下代码，而后按回车键 ⏎
```
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bash_profile
```

### 5.4 安装 Git
```
brew install git
```
配置 git 按 tab 补全功能
```
curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash
vim ~/.bash_profile
```
按 i 键（注意不要使用中文出入法），将这行代码粘贴进去
```
test -f ~/.git-completion.bash && . $_
```
按 `esc` 键，再按 `：`，然后输入 `wq` 按回车键 ⏎

### 5.5 安装 rvm 与 Ruby 2.3.1

注意，以下是三行命令，要分别输入，每行都要按接回车键（⏎）执行。以后为了书写方便，经常会把一系列命令放到一个代码块中……

```
\curl -sSL https://get.rvm.io | bash -s stable
rvm install 2.3.1
rvm use 2.3.1
```

如果以上命令安装失败，可以按[官网](https://rvm.io/)方式安装：
先创建文件夹 include（为了以免安装gpg时[报错](https://stackoverflow.com/questions/14527521/brew-doctor-says-warning-usr-local-include-isnt-writable)）
```
sudo mkdir -p /usr/local/include
sudo chown -R $USER:admin /usr/local/include
```
安装 gpg
```
brew install gnupg gnupg2
```
安装 rvm
```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable
```

最后根据安装后的提示
```
vim ~/.bash_profile
```
按 i 键（注意不要使用中文出入法），将`source ~/.profile`粘贴为单独的一行
按 `esc` 键，再按 `：`，然后输入 `wq` 按回车键 ⏎


rvm 是 Ruby 的版本管理工具，其作用是在系统中安装若干个不同版本的 Ruby，且不让它们之间发生冲突。你可以安装很多个版本的 Ruby，比如，刚刚安装了 2.3.1，随后你还可以安装 1.9.2：
```
rvm install 1.9.2
```
需要使用 1.9.2 版本的 Ruby 的时候，就可以用这个命令：
```
rvm use 1.9.2
```
也可以随时用这个命令切换回 2.3.1

你也随时可以用这个命令查看自己都安装过哪些版本：

想要卸载哪个版本的 Ruby，你就用这样的命令：
```
rvm uninstall 1.9.2
```
下面要接着安装的 nvm，跟 rvm 一个原理，只不过 nvm 是 nodejs 的版本管理器

### 5.6 安装 nvm 和 node 长期支持版本
```
brew install nvm
```
这时会有提示，按提示执行
```
mkdir ~/.nvm
vim ~/.bash_profile
```
按 i 键，将这两行代码粘贴进去
```
export NVM_DIR="$HOME/.nvm"
  . "/usr/local/opt/nvm/nvm.sh"
```
按 `esc` 键，再按 `：`，然后输入 `wq` 按回车键 ⏎
关闭 Terminal / iTerm，重新打开

nodejs 有两个版本，一个叫 LTS（Long Term Support，提供长期支持的稳定版），一个叫 Current（提供最新功能的当下版，通常也不够稳定，尚需改进）。新手建议使用 LTS。
使用下面命令来安装最新的LTS版
```
nvm install --lts
```
也可以安装指定的版本号，写此文时LTS最新版是8.9.0，也可以这样安装
```
nvm install 8.9.0
```
然后启动
```
nvm use 8.9.0
```

升级 nvm 版本

使用 brew 安装的，使用 `brew upgrade nvm` 命令

其他情况使用命令 [issue](https://github.com/creationix/nvm/issues/127)
```bash
cd ~/.nvm && git pull && git checkout `git describe --abbrev=0 --tags`
```

### 5.7 设置自己的快捷命令
Terminal/iTerm 里经常用到但较长的命令，可以通过别名alias的方式来缩写

比如 `git checkout master`, 设置后可以缩写为`gco master`
接下来是具体设置方法：
```
cd ~
vim .aliases
```
按 `i`键进入编辑模式，粘贴下列代码
```
alias hs="hexo g && hexo s"
alias hd="hexo g && hexo d"

alias nr="npm run"
```
按 `esc` 键，再按 `：`，然后输入 `wq` 按回车键 ⏎
关闭 Terminal/iTerm，重新打开就可以使用这些简写了。

当然，你也可以根据自己的喜好来设置。不过不建议设置太多短命令，以免造成记忆负担。

而 git 快捷命令要在 git 全局配置文件里设置(否则会导致自动补全失效)，可以编辑 `~/.gitconfig` 文件，也可以使用命令来配置，例如
```
git config --global alias.ll "log -1 HEAD"
```

### 5.8 修改主机名

终端 Terminal/iTerm 里，显示的“主机名”就是 HostName，也就是主机真正的名称
查看
```
echo $HOSTNAME
```
修改
```
sudo scutil --set HostName 新的主机名
```

### 5.9 设置同步盘（软链接、硬链接）

为了数据安全，以及便于存储传输，常常会用到第三方的同步盘，比如腾讯微云

而问题是同步盘只能同步一个文件夹，而我们的数据是散落在多个文件夹里的

还有一个场景是，使用 hexo 时，修改了子仓库某个文件（比如 next 主题里的配置文件），但不想把子仓库一起打包进自己仓库里

这时，可以使用 软连接或硬链接来处理

所谓的软连接，类似于 windows 中的快捷方式，不同的是，这个文件是有数据的，它的数据始终与它指向的原文件一致。
假设同步盘目录是 `~/Cloud`
要把`~/Project`目录下的 `xiaweiss` 文件夹加入同步盘
```
cd ~/Project
ln -s xiawess/ /Users/$USER/Cloud/xiaweiss
```
语法是 `ln -s 原目录/原文件 目标目录/目标文件`

-s 表示符号链接（软链接），注意目标建议绝对路径，因为目标文件移动后，可能会找不到原文件而失效。

软连接有点像分身，如果本体被干掉，分身也就不起作用了。

硬链接 没有-s 参数，语法为 `ln 原文件 目标文件`，可以写相对路径。

硬链接像一个本体分裂成了好多个，每一个都是本体，修改一个，相当于把每个都修改了。只有把所有的都删除了，才会真正被消灭。

二者区别主要是：硬链接不可以链接目录，软连接可以；硬链接文件可以拷贝出去使用，挪了位置也可以用，软连接不可以。

使用软连接、硬链接，看起来文件增多了，但并不会增加磁盘存储量。

### 5.10 显示任何来源选项
macOS Sierra系统隐私里默认不显示“任何来源”选项，这是一种增强型保护机制。
显示“任何来源”选项，在控制台中执行：
`sudo spctl --master-disable`
不显示“任何来源”选项，在控制台中执行：
`sudo spctl --master-enable`

## 6. 选装
### 6.1 redis

#### 安装
```
brew install redis
```

安装好后，会看到如下提示语：

To have launchd start redis now and restart at login:
  brew services start redis
Or, if you don't want/need a background service you can just run:
  redis-server /usr/local/etc/redis.conf

#### 启动

也即是说官方提供两种启动方式：

**1. 常驻服务** 重启电脑后 redis 依然在运行


```
brew services list //查看服务列表
brew services start redis //启动 redis 服务
brew services restart redis //重启 redis
brew services stop redis //停止 redis
```

常驻服务还有一种启动方式是使用 `launchctl`

```
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents //注册到启动项里
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist //启动 redis 服务
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist //停止 redis
```

**2. 不需要后台服务，从配置文件启动** 重启或关闭 Terminal 服务会停止

```
redis-server /usr/local/etc/redis.conf
```

    启动后可以看到界面，退出的话，同时按下 control键 c键 即可


#### 卸载 redis

```
brew uninstall redis
rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

#### 查看 redis

查看 redis 信息
```
brew info redis
```

测试 redis 是否在运行，如果看到 `PONG` 说明正常运行中
```
redis-cli ping
```





## fin
如此这般，最基础的开发环境算是完成了，随着使用的深入，还会逐渐补充完善。

关于更详细的开发环境设置，请参阅这两个 Github 项目：

* [nicolashery/mac-dev-setup](https://github.com/nicolashery/mac-dev-setup)
* [donnemartin/dev-setup](https://github.com/donnemartin/dev-setup)


ChangeLog

20190128 添加 5.6 升级 nvm 版本方法

参考资料：
[李笑来《基本开发环境设置》](http://lixiaolai.com/2016/06/16/makecs-basic-dev-env-settup/)
[Mac修改主机名和计算机名 - 小昇的博客 | Xs Blog](http://xiaosheng.me/2015/08/23/article5/)
[在Mac下Git使用对于Tab键自动补全功能设置](http://www.jianshu.com/p/32356677bdb5)
[Terminal-git auto-complete](https://apple.stackexchange.com/questions/55875/git-auto-complete-for-branches-at-the-command-line)
[理解 Linux 的硬链接与软链接](https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/index.html)
[Install and config Redis on Mac OS X via Homebrew](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298)
