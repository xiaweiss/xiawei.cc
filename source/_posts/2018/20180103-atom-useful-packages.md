---
categories: 技术
date: 2018-01-03
file-title: {{ title }}
tags: [atom, 环境配置]
title: Atom Packages（插件）推荐
updated: 2018-08-01
---

![](https://xiawei.cc/images/20180103.jpg)

> 自从看了李笑来的[那篇博文][1]后，尝试使用 atom 编辑器后，喜欢上了清爽的界面和可定制化的功能
> webstorm 很强大，但启动速度比较慢，对 markdown 的支持界面不是很友好
> sublime 也很方便，但大部分是深色主题，新手不自己安装插件几乎无法使用
> atom 不装插件也 ok 的，但为了有更好的体验，推荐一些自己在用的好用插件

<!-- more -->
注：目前涉及到的主要是前端相关的

各插件的官方页面，统一使用 https://atom.io/packages/插件名 即可检索到
如果想安装全部的，可以使用 sync-settings 一键克隆我的配置`^_^`

### Atom 设置备份同步（重要）

首先这个插件是最重要的，可以保存 atom 包含插件在内的所有配置

[sync-settings](sync-settings)

数据时保存在 github 里的 gist 里的，首次使用时需要按[文档][2]的介绍配置插件里的 personal access token 和 gist id

1. [创建 personal access token][3]，权限必须勾选 `gist`
2. 创建一个新的 [gist][4]，文件名 Filename 填写 package.json，描述和文件内容随意填点什么
3. 从右上角 copy 链接，其中的这段数字就是 `gist id`

```javascript
<script src="https://gist.github.com/xiaweiss/051f5e8f98d6836a5465fcb195fcae8b.js"></script>
```

使用时，按 `cmd + shift + p` 来打开 atom 的命令窗口
```
sync-settings:backup  备份
sync-settings:restore 恢复
sync-settings:view-backup 查看所有的备份，会打开 gist
sync-settings:check-backup 本地设置和 gist 最新备份是否相同
sync-settings:fork 输入 gist id 来 fork 他人的配置
```
我的是 gist id： `051f5e8f98d6836a5465fcb195fcae8b`

### 编辑器优化

| package                          | description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| [atom-clock][]                   | 显示时间                                                                              |
| [autosave-onchange][]            | 自动保存                                                                              |
| [file-icons][]                   | 按不同文件类型显示图标                                                                |
| [highlight-selected][]           | 双击高亮显示所有这个单词出现的地方                                                    |
| [js-hyperclick][]                | 点击跳转到定义的位置                                                                  |
| [move-cursor-improved][]         | 光标移动的修正：有东亚字符（日语、汉字时），按上下箭头时使光标可以垂直移动            |
| [pigments][]                     | 显示色值的颜色                                                                        |
| [platformio-ide-terminal][]      | 编辑器内的命令行工具，但只能使用系统默认的 terminal                                   |
| [regex-railroad-diagram][]       | 使用图形显示正则表达式                                                                |
| [sort-lines][]                   | 排序/删除重复行。选中要排序的区域，按 F5 即可                                         |
| [structure-view][]               | 默使用 ctrl + O（字母） 文件结构                                                      |
| [todo-show][]                    | 可以在项目里找到特定的注释，TODO、NOTE、REVIEW 等等，使用快捷键 ctrl+shift+t 打开列表 |
| [tree-view-copy-relative-path][] | 文件目录里复制的相对路径                                                              |
| [tree-view-panes][]              | 文件目录里显示打开的文件                                                              |
| [tree-view-search-bar][]         | 文件目录搜索栏                                                                        |
| [tree-view-sort][]               | 排序文件目录，可以选择各种方式来排序左侧文件树                                        |
| [wordcount][]                    | 字数统计                                                                              |

[atom-clock]: https://atom.io/packages/atom-clock
[autosave-onchange]: https://atom.io/packages/autosave-onchange
[file-icons]: https://atom.io/packages/file-icons
[highlight-selected]: https://atom.io/packages/highlight-selected
[js-hyperclick]: https://atom.io/packages/js-hyperclick
[move-cursor-improved]: https://atom.io/packages/move-cursor-improved
[pigments]: https://atom.io/packages/pigments
[platformio-ide-terminal]: https://atom.io/packages/platformio-ide-terminal
[refactor]: https://atom.io/packages/refactor
[regex-railroad-diagram]: https://atom.io/packages/regex-railroad-diagram
[sort-lines]: https://atom.io/packages/sort-lines
[structure-view]: https://github.com/alibaba/structure-view
[sync-settings]: https://atom.io/packages/sync-settings
[todo-show]: https://atom.io/packages/todo-show
[tree-view-copy-relative-path]: https://atom.io/packages/tree-view-copy-relative-path
[tree-view-panes]: https://atom.io/packages/tree-view-panes
[tree-view-search-bar]: https://atom.io/packages/tree-view-search-bar
[tree-view-sort]: https://atom.io/packages/tree-view-sort
[wordcount]: https://atom.io/packages/wordcount

### minimap 缩略图滚动条

| package                        | description                                                     |
| ------------------------------ | --------------------------------------------------------------- |
| [minimap][]                    | 类似 sublime 右侧代码缩略图的功能，好处是加宽了滚动条，适合拖拽 |
| [minimap-highlight-selected][] | 高亮选中词                                                      |
| [minimap-pigments][]           | 显示色值的颜色                                                  |

[minimap]: https://atom.io/packages/minimap
[minimap-highlight-selected]: https://atom.io/packages/minimap-highlight-selected
[minimap-pigments]: https://atom.io/packages/minimap-pigments


### git 版本控制
| package              | description                                     |
| -------------------- | ----------------------------------------------- |
| [git-log][]          | 查看整个项目的分支树                            |
| [git-time-machine][] | 查看对比当前文件的历史版本，使用 alt+t 打开面板 |
| [split-diff][]       | 显示修改的地方，并且可以对比，甚至选择其中一方  |

[split-diff][] 使用 ctrl+alt+t 开启对比
ctrl-alt-n 跳转到下一处（next）
ctrl-alt-p 跳转到上一处（prev）
ctrl-alt-. 把左边的应用到右边去（> 取左边）
ctrl-alt-, 把右边的应用到左边来（< 取右边）

[split-diff]: https://atom.io/packages/split-diff
[git-log]: https://atom.io/packages/git-log
[git-time-machine]: https://atom.io/packages/git-time-machine

### 代码格式化
配置请见 [JavaScript 代码格式化](http://xiaweiss.com/art/20180726-javascript-code-format/)

| package                | description             |
| ---------------------- | ----------------------- |
| [editorconfig][]       | 统一编辑器格式          |
| [linter-eslint][]      | eslint 代码检查、格式化 |
| [linter-js-standard][] | standard 代码检查       |
| [prettier-atom][]      | prettier 格式化         |
| [standard-formatter][] | standard 格式化         |

[editorconfig]: https://atom.io/packages/editorconfig
[linter-eslint]: https://atom.io/packages/linter-eslint
[linter-js-standard]: https://atom.io/packages/linter-js-standard
[prettier-atom]: https://atom.io/packages/prettier-atom
[standard-formatter]: https://atom.io/packages/standard-formatter

### html、css、less 语法支持

| package            | description                                                  |
| ------------------ | ------------------------------------------------------------ |
| [autoclose-html][] | 输入 `>` 时补全标签                                          |
| [less-compiler][]  | 只需要在 less 文件开头加一行注释，保存时就会自动编译为新文件 |
| [px-rem-tooltip][] | 查看转换前的单位                                             |
| [px2rem-plus][]    | px转rem                                                      |

[autoclose-html]: https://atom.io/packages/autoclose-html
[less-compiler]: https://atom.io/packages/less-compiler
[px-rem-tooltip]: https://atom.io/packages/px-rem-tooltip
[px2rem-plus]: https://atom.io/packages/px2rem-plus


### markdown 支持

| package                       | description                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| [markdown-table-editor][]     | 使用 Tab 键自动格式化表格格式，使用户可以在源文件里清晰看到表格 |
| [markdown-preview-enhanced][] | 最好的 markdown 插件，使用前请关闭 markdown-preview             |
[markdown-preview-enhanced]: https://atom.io/packages/markdown-preview-enhanced
[markdown-table-editor]: https://atom.io/packages/markdown-table-editor



### Vue

| package               | description |
| --------------------- | ----------- |
| [language-vue][]      | 语法支持    |
| [vue2-autocomplete][] | 自动补全    |
| [vuejs2-snippets][]   | 自动补全    |

[language-vue]: https://atom.io/packages/language-vue
[vue2-autocomplete]: https://atom.io/packages/vue2-autocomplete
[vuejs2-snippets]: https://atom.io/packages/vuejs2-snippets

### React

| package            | description                            |
| ------------------ | -------------------------------------- |
| [language-babel][] | 支持 JSX、ES201x、Flow、GraphQL 语法等 |
| [react-snippets][] | 自动补全                               |

[language-babel]: https://atom.io/packages/language-babel
[react-snippets]: https://atom.io/packages/react-snippets

注意不要使用插件 [react][] ，因为它和 [language-babel][] 冲突，而后者支持的范围更广

[react]: https://atom.io/packages/react-snippets

### React Native
| package                     | description                            |
| --------------------------- | -------------------------------------- |
| [atom-react-native-style][] | 样式辅助                               |
| [language-babel][]          | 支持 JSX、ES201x、Flow、GraphQL 语法等 |
| [react-native-components][] | 组件辅助                               |

不推荐 facebook 官方的 [nuclide][]，因为它会改变整个 atom 编辑器的界面，并且和语法检查的 lint 工具冲突
不利于其他项目和语言的代码编写

[atom-react-native-style]: https://atom.io/packages/atom-react-native-style
[react-native-components]: https://atom.io/packages/react-native-components
[nuclide]: https://atom.io/packages/nuclide

### 微信小程序
| package     | description        |
| ----------- | ------------------ |
| [atom-wx][] | 语法高亮           |
| [wxapp][]   | 微信小程序自动补全 |

[atom-wx]: https://atom.io/packages/atom-wx
[wxapp]: https://atom.io/packages/wxapp

> 图片来源：https://www.pixiv.net/member_illust.php?mode=medium&illust_id=63967458

[1]: http://lixiaolai.com/2016/06/17/makecs-atom-advanced
[2]: https://atom.io/packages/sync-settings
[3]: https://github.com/settings/tokens/new
[4]: https://gist.github.com/
