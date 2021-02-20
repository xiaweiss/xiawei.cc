---
categories: 技术
date: 2021-01-25
file-title: {{ title }}
tags: [javascript]
title: 视频字幕
updated: 2021-01-25
---

> RT

<!-- more -->

# 1、引入方式

## 1.1  track 标签加载

```xml
<video id="video">
  <source src="example.mp4" type="video/mp4">
  <track src="example.vtt" default lable="中文">
</video>
```
demo：[https://xiawei.cc/demo/player.subtitle/mp4.html](https://xiawei.cc/demo/player.subtitle/mp4.html)

## 1.2 手动写入 track 标签加载

```javascript
// aliplayer 需要等 ready 事件；
// 原生 video 标签不需要 ready，直接执行就好
player.on('ready', function (e) {
  var videoElement = player.tag
  var trackElement = document.createElement('track')
  trackElement.label = 'Chinese'
  trackElement.kind = 'subtitles'
  trackElement.srclang = 'cn'
  trackElement.src = 'cc.vtt'
  trackElement.default = true
  videoElement.appendChild(trackElement)
})
```
demo：[https://xiawei.cc/demo/player.subtitle/aliplayer-track.html](https://xiawei.cc/demo/player.subtitle/aliplayer-track.html)
（可能需要手动打开字幕）

## 1.3 m3u8 主文件方式（字幕文件打入m3u8）

需要生成一个主列表 m3u8 文件，包含了字幕m3u8 和视频 m3u8

```plain
#EXTM3U
#EXT-X-VERSION:4
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="English",DEFAULT=YES,FORCED=NO,URI="subtitles.m3u8",LANGUAGE="en"
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=754857,VIDEO="500kbs",AUDIO="aac",CODECS="avc1.42e01e,mp4a.40.2"
playlist.m3u8
```
字幕 m3u8
```plain
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:300
#EXT-X-MEDIA-SEQUENCE:1
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:10.000,
cc.vtt
#EXTINF:10.000,
cc.vtt
#EXT-X-ENDLIST
```
播放列表 m3u8
```plain
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-ALLOW-CACHE:YES
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:10.000000,
https://media001.geekbang.org/2c36cccfb51c4c81890730b82a3659dc/2cc79eaba8e14adbab8c1aa7dd855180-31a9d5a9fec73a1c749d12b51a1ea5e2-ld-00001.ts
#EXTINF:10.000000,
https://media001.geekbang.org/2c36cccfb51c4c81890730b82a3659dc/2cc79eaba8e14adbab8c1aa7dd855180-31a9d5a9fec73a1c749d12b51a1ea5e2-ld-00002.ts
#EXT-X-ENDLIST
```
demo：[https://xiawei.cc/demo/player.subtitle/aliplayer.html](https://xiawei.cc/demo/player.subtitle/aliplayer.html)

# 2、样式控制

样式使用 ::cue 来控制

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/::cue](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::cue)

注意：原生字幕不支持设置 background

css 样式只支持下面这些

color

opacity

visibility

text-decoration

text-shadow

background

outline

font

line-height

white-space

text-combine-upright

ruby-position


另一种方式可以在字幕文件内写样式，例如

```plain
1 - Title Crawl
00:00:05.000 --> 00:00:10.000 line:0 position:20% size:60% align:start
Some time ago in a place rather distant....
```

# 3、控制字幕（切换、显示、隐藏、手动写入）

执行下面 JS 字幕对象

```javascript
videoElement.textTracks[0]
```

得到对象

```javascript
{
activeCues: TextTrackCueList {0: VTTCue, length: 1}
cues: TextTrackCueList {0: VTTCue, 1: VTTCue, 2: VTTCue, length: 3}
id: ""
kind: "subtitles"
label: "Chinese"
language: "cn"
mode: "showing"
oncuechange: null
selected: true
__proto__: TextTrack
}
```

然后设置 mode 属性就可以显示、隐藏字幕

```javascript
videoElement.textTracks[0].mode === 'hidden'
videoElement.textTracks[0].mode === 'showing'
```

使用m3u8方式，阿里云播放器字幕是使用 JS 手动加载的，初始状态为 disabled，需要等字幕数据请求完成后，再手动设置 showing

```javascript
player.on('ready', function (e) {
  setTimeout(function () {
    var videoElement = player.tag
    videoElement.textTracks[0].mode = 'showing'
  }, 1000) // 假设 1s 内可以加载完字幕
})
```

使用 addTextTrack 可以手动写入特定字幕

```javascript
const track = videoElement.addTextTrack("captions", "简体中文Subtitles", "zh_CN");
track.mode = "showing";
const cue1 = new VTTCue(0, 2.500, '字幕会在0至2.5秒间显示');
track.addCue(cue1);
const cue2 = new VTTCue(2.6, 4, 'Subtitles will display between 2.6 and 4 seconds');
track.addCue(cue2);
```

# 4、完全自定义字幕样式

方式一：不支持定义 background

获取到当前激活的字幕 对象 VTTCue，使用方法 getCueAsHTML 可以得到字幕节点

然后可以对节点进行处理，放在自定义的元素容器中（字幕里可以有 HTML 标签）

```javascript
videoElement.textTracks[0].activeCues[0].getCueAsHTML()
```
方式二：最终采用的方案

步骤：

1. 拿到 vtt 格式字幕地址，挂载 track 标签
2. 激活原生字幕
3. 利用播放事件取到此时的字幕内容
4. 利用隐藏原生字幕
5. 自己写 div 样式，把此时的字幕内容更新进去

遇到的坑：

1. 如果关闭了原生字幕（disabled状态），则相关的字幕播放事件不触发，拿不到字幕内容。
2. aliplayer 只支持字幕文件打入 m3u8 方式，播放器初始化完成后会设置字幕状态，并且给相关状态设定了监听器 getter，setter，导致无法把系统字幕设置为隐藏状态（hidden）
3. aliplayer 初始化完成后，会把字幕设为 disabled。导致字幕被关了
4. 字幕文件请求回来后，才能激活字幕，但目前没有可以监听的方法

解决方式：

1、2：开启原生字幕（showing状态），使用 css 偏移量来隐藏原生字幕

3：利用aliplayer canplaythrough 事件多次触发，来检测字幕的状态

原生 video 延迟 800ms

track.oncuechange 事件作为兜底（它会产生不显示字幕里第一条的 bug）

实现的相关代码：

html 部分

```xml
<!-- 字幕, 这里为了实现外描边的效果，放了两层文字 -->
    <div :class="[$style.subtitle, $style.subtitleStroke, {[$style.subtitleStrokeFullScreen]: isFullScreen}]" v-show="subtitle">{{subtitle}}</div>
    <div :class="[$style.subtitle, {[$style.subtitleStrokeFullScreen]: isFullScreen}]" v-show="subtitle">{{subtitle}}</div>
```
css 部分

```xml
<style lang="css">
  /* 原生字幕的 background 无法控制，这里利用偏移量来隐藏掉它 */
  video[playsinline]::-webkit-media-text-track-container {
    transform: translateY(40%)!important;
  }
</style>
<style lang="stylus" module>
// 字幕
.subtitle
  box-sizing border-box
  position absolute
  left 0
  bottom 15px
  width 100%
  font-weight 400
  color #fff
  text-align center
// 字幕描边（底层）
.subtitleStroke
  -webkit-text-stroke 3px #000
// 1. normal: PC 通常样式
.subtitle
  bottom 7px
  padding 0 32px
  font-size 18px
  line-height 26px
  letter-spacing: 2px;
// 2. mobile: 移动端样式
@media (max-width: 768px)
  .subtitle
    bottom 18px
    padding 0 30px
    font-size 14px
    line-height 21px
    letter-spacing: 0.5px;
@media (max-width: 768px)
  .subtitleStroke
    -webkit-text-stroke 2px #333
// 3. fullscreen：PC 全屏样式
.subtitleStrokeFullScreen
  bottom 50px
  padding 0 30px
  font-size 26px
  line-height 36px
  letter-spacing: 1.5px;
</style>
```
```javascript
// 播放器初始化后
playerInited (player) {
  // ...other
  this.player = player
  this.bindSubtitles()
},
/**
 * 绑定字幕
 */ 
bindSubtitles () {
  const videoElement = this.player.video
  const { subtitles } = this.config
  // 加入 track 标签（只要有 video 标签时，可以在任意时刻加入）
  if (Array.isArray(subtitles)) {
    // 字幕和视频不同域名，这里加 attrbute 来解除跨域限制
    videoElement.setAttribute('crossorigin', '')
    // 遍历所有字幕，创建 <track> 标签插入 <video> 子集
    subtitles.forEach(subtitle => {
      const { label, srclang, src } = subtitle
      const trackElement = document.createElement('track')
      trackElement.label = label // 字幕的标签，例如 '中文'
      trackElement.kind = 'subtitles' // track 标签类型：字幕
      trackElement.srclang = srclang // 字幕语言，例如 'cn'
      trackElement.src = src  // 字幕文件地址
      videoElement.appendChild(trackElement)
    })
    // 插入后选择、激活字幕
    this.selectSubtitle()
    // aliplayer canplaythrough 事件后再次选择、激活字幕（处理 aliplayer 内部设为 disabled 后的情况）
    if (this.config.isEncrypt) {
      this.player.on('canplaythrough', () => {
        // canplaythrough 会执行多次，内部做了防重
        this.selectSubtitle()
      })
    }
  }
},
/**
 * 选择、激活字幕（多字幕时，可以用于切换显示，只显示某一个字幕）
 * @param {Number} 第几个字幕文件，默认为头一个
 */
selectSubtitle (index = 0) {
  const videoElement = this.player.video
  // 如果没有字幕，结束，激活的字幕 index 重置
  if (!(videoElement.textTracks && videoElement.textTracks)) {
    this.subtitleActiveIndex = 0
    return
  }
  // 如果当前字幕已经被激活了，结束流程，防重
  if (videoElement.textTracks[index].mode === 'showing') return
  this.subtitleActiveIndex = index
  const track = videoElement.textTracks[index]
  // 字幕文件请求回来加载后，显示字幕
  setTimeout(() => {
    this.bindCues(track)
  }, 800)
  // 字幕文件请求回来加载后，显示第 2 条字幕时，会触发 oncuechange（兼容，防止延时无法加载出字幕）
  track.oncuechange = () => {
    track.oncuechange = null // 移除事件
    this.bindCues(track)
  }
  // 字幕默认为 disabled 不会触发事件，需要设置为 showing、或 hidden
  // aliplayer 的 hidden 无法设置，所以这里设 showing，video 原生字幕用 css 隐藏
  for (let i = 0; i < videoElement.textTracks.length; i++) {
    videoElement.textTracks[i].mode = i === index ? 'showing' : 'disabled'
  }
},
/**
 * 显示字幕（添加监听，将每条字幕激活时显示出来）
 */
bindCues (track) {
  const cues = track.cues
  for (const i in cues) {
    const cue = cues[i]
    if (typeof cue === 'object') {
      // 字幕进入
      cue.onenter = (e) => {
        this.subtitle = cue.text
      }
      // 字幕离开
      cue.onexit = (e) => {
        this.subtitle = ''
      }
    }
  }
},
```

# 参考资料：

* 阿里云文档

[https://developer.aliyun.com/article/684886](https://developer.aliyun.com/article/684886)

* WebVTT 规范

[https://w3c.github.io/webvtt/?spm=a2c6h.12873639.0.0.749e357d5GL7FT#introduction-caption](https://w3c.github.io/webvtt/?spm=a2c6h.12873639.0.0.749e357d5GL7FT#introduction-caption)

* WebVTT API

[https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)

* m3u8 如何添加 vtt 字幕

[https://stackoverflow.com/questions/39631349/hls-live-streaming-subtitle](https://stackoverflow.com/questions/39631349/hls-live-streaming-subtitle)

[https://hlsbook.net/how-to-add-subtitles-to-a-live-hls-stream/](https://hlsbook.net/how-to-add-subtitles-to-a-live-hls-stream/)

* VTTCue 对象

[https://developer.mozilla.org/en-US/docs/Web/API/VTTCue](https://developer.mozilla.org/en-US/docs/Web/API/VTTCue)


