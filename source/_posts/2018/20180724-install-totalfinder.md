---
categories: 技术
date: 2018-07-24
file-title: {{ title }}
tags: mac
title: Mac 文件管理利器 TotalFinder 安装教程
updated: 2018-07-24
---

![20180724](https://xiawei.cc/images/20180724.png)

> TotalFinder 作为第三方的软件，可以增强 Mac 自带的 finder，并且增强Tab切换、预览界面、颜色标签，尤其可以像浏览器一样操作切换多窗口，特别方便

<!--more-->

请进入官网下载最新版本 https://totalfinder.binaryage.com/

然后打开安装包，看到如下界面

![20180724-pkg](https://xiawei.cc/images/20180724-pkg.png)

继续点击运行 TotalFinder.pkg, 然后依次点击 next 安装，最后点 close

![20180724- process](https://xiawei.cc/images/20180724-process.png)

接下来会看到提示 TotalFinder 没有完整安装，需要系统授权。也就是暂时关闭系统完整性保护就好

![20180724-sip-tip](https://xiawei.cc/images/20180724-sip-tip.png)

点击显示详情 Show instructions，可以看到具体步骤。

![20180724-step](https://xiawei.cc/images/20180724-step.png)

那么就开始这几个简单的步骤吧。
点击重启 Reboot Now , 然后屏幕黑屏后，一直按住键盘 command 键 和 R 键

接下来电脑启动了，看到这个界面，可以松手了

![20180724-recover](https://xiawei.cc/images/20180724-recover.png)

如果是中文系统，则是这样的

![20180724-recover-zh](https://xiawei.cc/images/20180724-recover-zh.jpg)

点击顶部的实用工具 Utilities, 再点终端 Terminal，可以看到弹出一个白色窗口。直接输入
```
csrutil disable
```
按然后回车 enter 键即可

![20180724-terminal](https://xiawei.cc/images/20180724-terminal.jpg)

然后点击左上 MacOS 实用工具，再点击重启电脑即可

电脑启动后，就可以看到 finder 已经装好了

最后为了安全起见，再次重启电脑，重复上面的步骤
不同的是输入命令时，这时候请输入
```
csrutil enable
```

最后是关于激活的问题，当试用期为15天，结束后提示需要激活时，请去官网付费购买。可以选择 alipay 支付宝或 Visa 信用卡方式付款

也许有同学会问怎么破解。我拒绝回答这样的问题，请支持正版

如果不喜欢需要卸载的话，不要直接把软件移除
请点击顶部的文件夹图标，然后点击卸载 Uninstall TotalFinder

![20180724-uninstall](https://xiawei.cc/images/20180724-uninstall.png)
