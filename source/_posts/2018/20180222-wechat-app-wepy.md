---
categories: 技术
date: 2018-02-22
file-title: {{ title }}
tags: [wepy, 小程序]
title: 微信小程序 wepy 框架
updated: 2018-02-22
---

![](https://xiawei.cc/images/20180222.jpg)

> 微信小程序踩坑记
> 考虑到业务的复杂性需要 redux 状态管理，以及原有 vue 项目的可移植性，选用 wepy 来开发小程序

<!-- more -->


## 1. 相关资料
网上有很多现成的资料，可以直接参考，本文不再赘述
由于官方文档不够详尽，后文列举一些文档中没有的常见功能及排坑

[小程序文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
[wepy github](https://github.com/Tencent/wepy)
[wepy 文档](https://tencent.github.io/wepy/document.html)
[wepy 特性介绍](https://segmentfault.com/a/1190000007580866)
[wepy-redux](https://www.npmjs.com/package/wepy-redux)
[redux 入门](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
[weui](https://github.com/Tencent/weui)
[Promise](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000)
[async/await](https://segmentfault.com/a/1190000007535316)
[小程序部分坑](https://zhuanlan.zhihu.com/p/24860332)
[微信小程序开发之webview组件内网页实现微信原生支付](https://juejin.im/post/5a4f5280f265da3e2b16393c)
[微信小程序与内嵌网页交互实现支付功能](https://www.jianshu.com/p/c9a196d0455e)

todo
[await 错误捕获](https://www.jianshu.com/p/78dfb38ac3d7?winzoom=1)
[小程序 webview 交互](http://www.wxapp-union.com/portal.php?mod=view&aid=3362)


## 2. 快速开始
- 安装 node 最新稳定版
- npm install wepy-cli -g
- wepy init standard myproject 创建标准项目
- cd myproject 进入项目目录
- wepy upgrade 更新依赖
- npm install 安装依赖
- wepy build -w 实时编译
- 运行微信开发者工具，并且设置：   
不勾选 "ES6 转 ES5"    
不勾选 "上传代码自动样式补全"    
不勾选 "代码上传时自动压缩"    
勾选 "不校验安全域名、web-view 域名、TLS 版本以及 HTTPS 证书"

### 2.1 引入 weui
使用 wepy 创建 weui 项目模板
```
wepy init wepyjs/wepy-wechat-demo myproject
```
将 style 文件夹拷贝到自己的项目，然后在 app.wpy 的 style 标签里添加
```css
@import './style/weui.less';
```
如需部分引入，修改 weui.less 注释掉不需要的组件即可

### 2.2 引入第三方组件
```html
<template>
  <toast />
</template>
<script>
import wepy from 'wepy'
import Toast from 'wepy-com-toast'

export default class Index extends wepy.page {
  components = {
    toast: Toast
  }
  methods = {
    go() {
      let promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      })

      promise.then((d) => {
        console.log('toast done')
      })
    }
  }
}
</script>
```
## 3. wepy 语法
### 3.1 组件通讯
组件命名 驼峰式 childCom
#### 3.1.1 父子组件通讯 props 方式

```html
// parent.wpy
<child :title="parentTitle" :syncTitle.sync="parentTitle" :twoWayTitle="parentTitle"></child>

data = {
    parentTitle: 'p-title'
};

// child.wpy

props = {
    // 静态传值
    title: String,

    // 父向子单向动态传值
    syncTitle: {
        type: String,
        default: 'null'
    },

    // 父子 props 双向绑定
    twoWayTitle: {
        type: Number,
        default: 'nothing',
        twoWay: true
    }
};
```
父组件在变更传递给子组件 props 后要执行 `this.$apply()` 方法才能更新

注意要写成成对的 `<child></child>`

#### 3.1.2 父子组件通讯 事件传递方式
父组件可以使用 invoke 来给特定的子组件发事件，这个组件必须在此模块里注册过
```javascript
this.$invoke('com','myevent','myparam')
```
注意目前wepy 1.7.0版本，和官方文档不同的是，event 里的事件不能被 invoke 触发
（但可以被 emit boardcast 触发），所以需要类似 onLoad 的写法，直接写在 class 里。

wepy中的methods仅可用于页面事件绑定，其他自定义方法都要放在外层

### 3.2 页面交互
页面间可以用 url 的 qruey 参数的方式来传参
onLoad 事件里有 options 参数，是包含当前页面路径的 query

```javascript
// source page
wepy.navigateTo({
  url: 'test?a=123&b=456'
})

// target page
onLoad(options) {
   console.log(options.a) // 123
   console.log(options.b) // 456
}
```

注意，注册在 app.wpy 的 tabBar 里的目标页面，只能用 switchTab 来跳转
```javascript
wepy.switchTab({
  url: 'test?a=123&b=456'
})
```

web-view 页面可以通过调用微信 jssdk 的 wx.miniProgram.xxx 系列方法，来控制跳转到小程序页面，同样可以传 query 参数

### 3.3 wepy 请求
可以直接按原生小程序的语法
或者按官方文档的方式 使用Promise的 then 方式回调，还需要配置
[wepy项目中使用async await](https://github.com/Tencent/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8async-await)
```javascript
wepy.request(url).then((d) => console.log(d))
```
二者混合
```javascript
wepy.request({
  url: url,
  data: {},
  method: 'GET' // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  // header: {}, // 设置请求的 header
}).then(d => console.log(d))
```
使用 async/await 方式


#### 3.4 async/await 错误捕获
使用 try...catch 语法
```javascript
boom (s) {
  return Promise.reject(new Error('promise rejected'))
}
async onLaunch() {
  try {
    await this.boom()
  } catch (err) {
    console.log('CATCH', err)
  }
}
```

## 4. css

### 4.1 css 预编译语言
默认为 less，还可以使用 css、sass、scss、stylus
只需要 npm 安装对应包，并且在 style 标签声明，例如
```javascript
npm install wepy-compiler-sass --save-dev
```
```html
<style lang="scss">
</style>
```
注意 wepy 和普通引用不同的是，scss 的 function 以及 $ 变量，必须在使用它的文件 style 中引入
全局样式中声明是无效的，可以写成单独的 scss 文件，通过 import 引入。

另外 style 的样式会影响到子组件，可以类似 vue 使用 scope 关键字来去除影响

用到多种编译语言时，可以出现多个不同的 style 标签。
```html
<sytle lang="scss" scoped>

</style>
<sytle lang="scss">
  @import '../style/common.scss';
</style>
<style lang="less">

</style>
```
最后请注意，wepy css 编译报错后，需要重启微信开发者工具。

## 5. webview
todo 需要验证
### 5.1 在内嵌页里判断当前是否是小程序
```javascript
window.wx.ready(function () {
    isWxMini = window.__wxjs_environment === 'miniprogram'
})
```

### 未完待续

> 图片来源：https://www.pixiv.net/member_illust.php?mode=medium&illust_id=59474391
