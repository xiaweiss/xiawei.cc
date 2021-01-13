# 视频字幕

示例demo
video + hls https://xiaweiss.com/demo/player.subtitle/hls.html
video + mp4  https://xiaweiss.com/demo/player.subtitle/mp4.html
aliplayer https://xiaweiss.com/demo/player.subtitle/aliplayer.html

# 1、引入方式
## 1.1  原生 video 标签

```html
<video id="video">
    <source src="example.mp4" type="video/mp4">
    <track src="example.vtt" default lable="中文">
</video>
```

# 2、阿里播放器

需要生成一个主列表 m3u8 文件，包含了字幕m3u8 和视频 m3u8

```m3u8
#EXTM3U
#EXT-X-VERSION:4
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="English",DEFAULT=YES,FORCED=NO,URI="subtitles.m3u8",LANGUAGE="en"
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=754857,VIDEO="500kbs",AUDIO="aac",CODECS="avc1.42e01e,mp4a.40.2"
playlist.m3u8
字幕 m3u8
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
播放列表 m3u8
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

# 2、样式控制

样式使用 ::cue 来控制

https://developer.mozilla.org/zh-CN/docs/Web/CSS/::cue

样式只支持下面这些

```
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
```

# 3、控制字幕（切换、显示、隐藏）

执行下面 JS 字幕对象

```javascript
videoElement.textTracks[0]
```

得到对象

```javascript
{
activeCues: TextTrackCueList {0: VTTCue, length: 1}
cues: TextTrackCueList {0: VTTCue, 1: VTTCue, 2: VTTCue, length: 3}
id: ""
kind: "subtitles"
label: "Chinese"
language: "cn"
mode: "showing"
oncuechange: null
selected: true
__proto__: TextTrack
}
```

然后设置 mode 属性就可以显示、隐藏字幕

```javascript
videoElement.textTracks[0].mode === 'hidden'
videoElement.textTracks[0].mode === 'showing'
```

# 4、完全自定义字幕样式

获取到当前激活的字幕 对象 VTTCue，使用方法 getCueAsHTML 可以得到字幕节点
然后可以对节点进行处理，放在自定义的元素容器中

```javascript
videoElement.textTracks[0].activeCues[0].getCueAsHTML()
```

参考资料：

阿里云文档

https://developer.aliyun.com/article/684886

WebVTT 规范

https://w3c.github.io/webvtt/?spm=a2c6h.12873639.0.0.749e357d5GL7FT#introduction-caption

m3u8 如何添加 vtt 字幕

https://stackoverflow.com/questions/39631349/hls-live-streaming-subtitle

https://hlsbook.net/how-to-add-subtitles-to-a-live-hls-stream/

VTTCue 对象

https://developer.mozilla.org/en-US/docs/Web/API/VTTCue
