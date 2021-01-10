---
categories: 技术
date: 2018-07-26
file-title: {{ title }}
tags: lint
title: JavaScript 代码格式化
updated: 2018-07-27
---

![20180726](https://xiawei.cc/images/20180726.jpg)

> 每个人都可能有自己的代码风格和格式，但如果一个项目中的所有人都遵循同一风格的话，这个项目就能更顺利地进行。每个人未必能同意每一处格式规则，而且其中的不少规则需要一定时间的适应，但整个项目服从统一的编程风格是很重要的，只有这样才能让所有人轻松地阅读和理解代码。

<!-- more -->

## 介绍

关于代码格式化，有3个相关的概念，比较容易混淆

1. 代码格式：人工自定义的、或者遵循某种通用规范
例如 [JavaScript Standard Style][standard]，[Airbnb JavaScript Style][airbnb]，[Google JavaScript Style][google] 等）
2. 代码检查：依据一种  指定的代码格式，用提示出不符合格式的代码（[ESLint][eslint]、[TSLint][tslint]、[stylelint][stylelint] 等）
3. 代码格式化（code format）：依据一种  指定的代码格式，修正  不符合格式的代码（[ESLint][eslint]、[Prettier][prettier] 等）

格式化工具支持 CLI 模式，可以在 `package.json` 中配置命令
（CLI 模式其他参数请参考各官方文档）

```json
"scripts": {
  "standard": "standard --fix",
  "prettier": "prettier --write '*.js'",
  "eslint": "eslint --fix '*.js'"
},
```

设定 JavaScript 代码格式，从简单到严格依次有下面的方式，选一种即可

1. 使用 EditorConfig，添加配置文件`.editorconfig`即可， 可以设置部分的基本格式，然后使用编辑器默认的格式化
2. 使用 Prettier，不做代码检测，直接格式化。也可以添加配置文件 `.prettierrc` 自定义格式
3. 使用标准的 JavaScript Standard Style，直接安装即可 `npm install standard --save-dev`, 不需要任何配置文件。 然后使用 standard 插件格式化（ 可以不安装 ESlint 代码检查 ）
4. 使用 ESLint, 执行命令行 `npx eslint --init` 初始化即可，然后可以自己选择配置规则，之后会自动生成配置文件，并安装相关依赖。并且可以自定义规则。然后使用插件格式化（ ESLint 插件，或者 Pretter + ESLint 同时使用）

`.editorconfig` 文件示例：

```yaml
root = true

[*]                             # [] 内是正则表达式，匹配文件
charset = utf-8                 # 文本格式
end_of_line = lf                # 配置结尾符号
insert_final_newline = true     # 文件末尾空行
indent_style = space            # 缩进使用空格
indent_size = 2                 # 缩进长度
trim_trailing_whitespace = true # 去掉行尾多余的空格
```

关于 CSS 的代码检查，可以使用工具 stylelint
安装`npm install stylelint --save-dev`
安装代码格式 `npm install stylelint-config-standard --save-dev`
Vue 文件还需要安装预处理器 `npm install @mapbox/stylelint-processor-arbitrary-tags --save-dev`

添加配置文件 `.stylelintrc`

```json
{
  "defaultSeverity": "warning",
  "processors": ["@mapbox/stylelint-processor-arbitrary-tags"],
  "extends": "stylelint-config-standard",
  "rules": {}
}
```

其中 rules 里可以写自定义的规则，自定义的规则优先级最高
想要自己生成自定义规则的话，可以访问网站 https://maximgatilin.github.io/stylelint-config/

stylelint 的编辑器插件，可以使用 [stylefmt][14], 也可以使用 Prettier 格式化


下面是各种编辑器插件的配置


## Webstorm 配置

### 启用 EditorConfig

安装插件 EditorConfig，在设置 Editor -> Code Style 中
勾选 Enable EditorConfig support
创建 `.editorconfig` 文件，重启编辑器即可

### 编辑器默认格式化

菜单栏 Code -> Reformat Code
快捷键 Alt + Cmd + L

### Prettier 插件格式化

1.安装插件 Prettier
Webstorm 内置了  Prettier 插件不需要安装，Phpstorm 等在设置中心里 Plugins插件选项里安装即可

2.全局安装或项目安装 prettier 的 npm 依赖包

```
npm install prettier --save-dev
```

3.使用 Prettier 格式化文件
Alt + Shift + Cmd + P

设置保存时自动格式化：
手工配置设置里的 Tools -> File Watchers 即可
可以按照官方教程 https://prettier.io/docs/en/webstorm.html

打开设置，搜索 Prettier，然后复制 Prettier package 里的路径

![20180726-pretter-path](https://xiawei.cc/images/20180726-pretter-path.png)

清空搜索栏，打开设置里 Tools -> File Watchers
点击右侧左下角的 ➕ 加号，选择 `<custom>` 新建自定义模板

![20180726-filewatcher-new](https://xiawei.cc/images/20180726-filewatcher-new.png)

然后可以看到（注意点击三角箭头，展开全部的选项）

![20180726-filewatcher-config](https://xiawei.cc/images/20180726-filewatcher-config.png)

按上图来配置，并且填入下面内容，注意取消勾选 Auto-save 选项
最后点右下角 ok 结束配置
（使用 Vue 时请再创建一个，文件类型请选择 Vue Template）

```
$ProjectFileDir$/node_modules/.bin/prettier
--write $FilePathRelativeToProjectRoot$
$FilePathRelativeToProjectRoot$
$ProjectFileDir$
```

Windows 系统必须包含 cmd 后缀，Programs 请填写

```
$ProjectFileDir$/node_modules/.bin/prettier.cmd
```

重启编辑器，之后只要 Ctrl + S 保存时，就可以自动格式化代码

### ESLint 格式化

1.全局或项目内安装 eslint 的 npm 依赖包

```
npm install eslint --save-dev
```

2.打开编辑器配置，如下图，找到 ESLint 配置项，路径系统会自动检测到，只要勾选 Enable 即可
（如果没有路径，需要重启编辑器，或手动指定 eslint 的 npm 包路径）

![20180726-webstrom-eslint](https://xiawei.cc/images/20180726-webstrom-eslint.png)

3.重启编辑器
4.设置快捷键

![20180726-webstorm-keymap](https://xiawei.cc/images/20180726-webstorm-keymap.png)
建议设为 Ctrl + Alt + F

设置保存时自动格式化：
和 Prettier 配置相同，同样新建一个 File Watcher 即可
 参数请填写为

```
$ProjectFileDir$/node_modules/.bin/eslint
--fix $FilePathRelativeToProjectRoot$
$FilePathRelativeToProjectRoot$
$ProjectFileDir$
```

Windows 系统必须包含 cmd 后缀，Programs 请填写

```
$ProjectFileDir$/node_modules/.bin/prettier.cmd
```

重启编辑器，之后只要 Ctrl + S 保存时，就可以自动格式化代码

（使用 Vue 时请再创建一个，文件类型请选择 Vue Template）

### standard 标准格式化

安装 npm 依赖，注意必须安装到开发依赖里

```
npm install standard --save-dev
```

设置 JS 代码风格为 standard（Webstorm 默认为 Google 风格），出处点[这里][5]
设置的位置见下图，为 Editor -> Code Style -> JavaScript -> Warping and Braces -> Set from...
-> Predefined Style -> JavaScript Standard Style
![20180726-webstorm-codestyle](https://xiawei.cc/images/20180726-webstorm-codestyle.jpg)

然后使用编辑器默认的格式化功能即可, Alt + Cmd + L

开启代码检查(可选，不设置时不会提示格式错误)：
打开上图配置 ESlint 的界面, 勾选 Enable，并且将 ESLint package 选为 standard 的 npm 路径即可
![20180726-webstorm-standard](https://xiawei.cc/images/20180726-webstorm-standard.png)

### Prettier + ESLint 同时使用

按前文配置 Prettier 和 ESLint，并且都设置保存时自动格式化即可
WebStorm 会自动先运行 Pretter，再运行 ESLint 格式化代码


## VSCode 配置

### 启用 EditorConfig

安装插件 [EditorConfig for VS Code][11], 重启编辑器
创建 `.editorconfig` 文件

### 编辑器默认格式化

快捷键 Shift + Alt + F
或者 Cmd + Shift + P 调出命令面板，输入 format，选择 Format Document

### Prettier 插件格式化

安装插件 [Prettier - Code formatter][2]
依旧使用 Shift + Alt + F

设置自动格式化开关：
安装插件 [Formatting Toggle][3]，右下角会出现按钮 Formatting，点击可以一键开关 format 功能
点击时它会自动修改用户设置文件，配置 `"editor.formatOnPaste": true, "editor.formatOnSave": true,`

如果没有设置开关，保存时自动格式化需要设置:
编辑器中设置中添加配置 `"editor.formatOnSave": true,` 即可

### ESlint 格式化

安装插件 [ESLint][10]
双击红色波浪线，会出现黄色小灯泡，点击灯泡，再点击 Fix，就可以完成格式化

![20180726-vscode-eslint](https://xiawei.cc/images/20180726-vscode-eslint.png)

或者 输入 Cmd + Shift+P(win: Ctrl+Shift+P) 调出命令面板，输入指令 fix

![20180726-vscode-eslintfix](https://xiawei.cc/images/20180726-vscode-eslintfix.png)

也可以添加自定义配置, 设置保存时自动格式化：

```
"eslint.autoFixOnSave": true,
```

### standard 标准格式化

安装 npm 依赖，建议安装到开发依赖里

```
npm install standard --save-dev
```

安装插件[JavaScript Standard Style][9]

输入 Cmd + Shift+P(win: Ctrl+Shift+P) 调出命令面板，输入指令 fix
选择 fix all auto-fixable problems 即可
![20180726-vscode-standard](https://xiawei.cc/images/20180726-vscode-standard.png)

建议添加自定义配置：

```
"standard.usePackageJson": true, // 基于项目的 package.json 设置中来配置
"standard.autoFixOnSave": true, // 保存时自动格式化
```

### Prettier + standard 同时使用

同时配置 Prettier 和 standard，并且设置

```
"editor.formatOnSave": true,
"standard.autoFixOnSave": true,
```

保存文件时，会先执行 Prettier 格式化，再执行 standard 格式化

### Prettier + ESLint 同时使用

按前文同时配置 Prettier 和 standard，并且设置

```
"editor.formatOnSave": true,
"eslint.autoFixOnSave": true,
```

或者只配置 Prettier，设置为

```
"editor.formatOnSave": true,
"prettier.eslintIntegration": false, // 使用 Prettier-eslint 功能
```

此时不需要配置 `"eslint.autoFixOnSave": true,`

如果不需要格式检查提示，不用安装 [ESLint][10] 插件



## Atom 配置

编辑器默认未集成格式化插件

### 启用 EditorConfig

安装插件 [editorconfig][12], 重启编辑器
创建 `.editorconfig` 文件

### Prettier 插件格式化

安装插件 [prettier-atom][4], 重启编辑器
使用 Crtl + Alt + F 格式化

设置自动格式化开关：
在插件设置里  Format on Save 选项下，勾选 Show in Status Bar
编辑器底部就会出现保存时自动格式化的开关

### ESLint 格式化

安装插件 [liner-eslint][6], 重启编辑器
 点击有问题的部分，再点击 fix 即可格式化
![20180726-atom-eslint](https://xiawei.cc/images/20180726-atom-eslint.png)

设置保存时自动格式化：
在 linter-eslint 插件配置中，勾选
![20180726-atom-eslint-autofix](https://xiawei.cc/images/20180726-atom-eslint-autofix.png)

### standard 标准格式化

安装 npm 依赖，建议安装到开发依赖里

```
npm install standard --save-dev
```

格式化
安装插件 [standard-formatter][8]
使用快捷键 Ctrl + Alt + F 格式化代码

开启代码检查(可选，不安装时不会提示格式错误)：
安装插件 [linter-js-standard][7]

### Prettier + ESLint 同时使用

按前文同时配置 Prettier + ESLint, 并且都开启保存时自动格式化即可

或者只配置 Prettier，然后在 Prettier 设置里勾选
![20180726-atom-pretter-eslint](https://xiawei.cc/images/20180726-atom-pretter-eslint.png)

这时不需要安装 ESLint 格式化插件 [standard-formatter][8]
如果不需要格式检查提示，也不用安装格式检查插件 [linter-js-standard][7]

## Stylelint 编辑器配置

安装 npm 依赖，建议安装到开发依赖里
```
npm install stylelint --save-dev
```

设置配置文件 `.stylelintrc` 见上文

安装插件（与上述配置类似，参考插件的介绍文档，不一一赘述了）

Atom：插件 [stylefmt][15] 或 [vue-stylefmt][16] 或 [pretter-atom][4](设置中勾选Stylelint Integration)
VScode： 插件[stylefmt][17]
WebStorm： 设置 -> Language and FrameWorks -> Stylesheets -> stylelint -> 勾选 enable 并设置stylelint npm 包路径

> 封面图片来源：https://www.pixiv.net/member_illust.php?mode=medium&illust_id=54808053

[standard]: https://standardjs.com/
[airbnb]: https://github.com/airbnb/javascript
[google]: https://google.github.io/styleguide/jsguide.html
[eslint]: https://eslint.org/
[tslint]: https://palantir.github.io/tslint/
[stylelint]: https://stylelint.io/
[prettier]: https://prettier.io/
[2]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[3]: https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle
[4]: https://atom.io/packages/prettier-atom
[5]: https://blog.jetbrains.com/webstorm/2017/01/webstorm-2017-1-eap-171-2272/
[6]: https://atom.io/packages/linter-eslint
[7]: https://atom.io/packages/linter-js-standard
[8]: https://atom.io/packages/standard-formatter
[9]: https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs
[10]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[11]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[12]: https://atom.io/packages/editorconfig
[14]: https://github.com/morishitter/stylefmt
[15]: https://atom.io/packages/stylefmt
[16]: https://atom.io/packages/vue-stylefmt
[17]: https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt
