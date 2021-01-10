---
categories: 技术
date: 2018-03-15
file-title: {{ title }}
tags: react
title: React 简介
updated: 2018-03-20
---

![](https://xiawei.cc/images/20171205.jpg)

<!--more-->

## 相关文档
官方文档 [reactjs.org](https://reactjs.org/)
相关资源 [awesome-react](https://github.com/enaqx/awesome-react)
cli 构建 [create-react-app][1]
样式组件 [styled-components][9]
路由 [react-router][16]
路由匹配测试工具 [route-tester][17]

## 项目构建
使用 [create-react-app][1]，相关的资料 [awesome-create-react-app][2]

它是由 facebook 官方出品的项目生成工具，适合单页应用，预先配好了常用的配置，并且在 readme 里，常用的功能的使用都有介绍

如果需要自定义配置 webpack，必须弃用它，使用 `npm run eject` 命令可以转换为 webpack 构建（这个操作不可逆）

安装好 node 后，在命令行中输入
```
npm install -g create-react-app
create-react-app my-app
```

就可以创建好项目 my-app，项目结构为

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

进入项目目录后，使用命令 `npm run start` 来启动开发环境，浏览器打开 `http://localhost:3000` 就可以看到效果了

可以在 App.js 中或者 index.js 修改代码

## 元素

react 通常使用 JSX 语法，JSX 是一种 javascript 的语法扩展。

一个元素：
```javascript
const element = <h1>Hello, world!</h1>;
// 必须是有根节点包裹的元素
const element2 = <div><h1>Hello,</h1><h1>world!</h1></div>; // 正确
const element3 = <h1>Hello,</h1><h1>world!</h1>;// 错误
```

元素里，大括号里可以写表达式（一句 js 代码，两句不可以）
```javascript
const user = 'xiawei';
const element = <h1>{user} {console.log(111)}</h1>;
```

## 组件

组件的声明方式有以下两种，首字母必须大写，驼峰式命名

使用 state 时，必须使用对象式声明的写法

如果不想使用 ES6 对象语法，可以使用 `create-react-class` 创建，用法请参考 [react-without-es6][10]

组件的标签是否使用成对的都可以，注意 `/` 不可以省略。标签名和组件名一致

```javascript
// 函数式声明
function ComponentA(props) {
  return <h2>Component A</h2>;
}

// 对象式声明
class ComponentB extends React.Component {
  render() {
    return <h2>Component B</h2>;
  }
}
ReactDOM.render(
  <div>
    <ComponentA />
    <ComponentB></ComponentB>
  </div>,
  document.getElementById('root')
)
```

放在不同文件里时，可以使用 import 和 export 导入导出

```javascript
// components/C.js
import React from 'react';
// 使用 jsx 的语法时必须引入 react。否则语法检查工具 eslint 会报错
// 实际编译时不会重复引入 react

function ComponentC() {
  return <h2>Component C</h2>;
}

export default ComponentC;
```

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ComponentC from './components/C';

ReactDOM.render(
  <ComponentC />,
  document.getElementById('root')
)
```

## props 传递
```javascript
class Me extends React.Component {
  render()
  {
    return <div>
      <h2>{this.props.name}_{this.props.age}</h2>
    </div>;
  }
}
ReactDOM.render(
  <Me name="xiawei" age="26" />,
  document.getElementById('root')
);
```

还可以通过对象方式
```javascript
const me_info = {
  name: 'xiawei',
  age: 26
}

class Me2 extends React.Component {
  render() {
    return <h3>{this.props.me.name}_{this.props.me.age}</h3>;
  }
}
ReactDOM.render(
  <Me2 me={me_info}/>,
  document.getElementById('root')
)
```

还可以使用 ES6 解构对象语法，传递props
```javascript
class Me3 extends React.Component {
  render() {
    return <h3>{this.props.name}_{this.props.age}</h3>;
  }
}
ReactDOM.render(
  <Me3 {...me_info} />,
  document.getElementById('root')
)
```

注意 props 只可以传递值，不可以直接修改 props
下面这个 input 组件，输入框里的 value 值目前不可以被修改
```javascript
class Input extends React.Component {
  render() {
    return <input value={this.props.text} />;
  }
}
ReactDOM.render(
  <Input text="123" />,
  document.getElementById('root')
)
```

## 事件

React 元素中使用的事件是经过处理的，语法为小写字母开头的驼峰式写法，例如点击事件 onClick
阻止默认事件时，必须使用 `e.preventDefault()`，使用 `return false` 是不起作用的
原生写法
```html
<button onclick="handleClick()">
  Activate Lasers
</button>
```
react 写法
```html
<button onClick={handleClick}>
  Activate Lasers
</button>
```
组件中写法
```javascript
class Button extends React.Component {
  handleClick(event) {
    console.log(event.target.innerHTML);// click me
    console.log(this);// undefined
  }

  render() {
    return <button onClick={this.handleClick}>click me</button>
  }
}
ReactDOM.render(
  <Button />,
  document.getElementById('root')
)
```
注意上面的写法，在 handleClick 函数内部中 this 的值为 undefined，但我们期望它可以指向组件 Button，
有以下几种处理方式
1. 使用 bind 方法
  ```html
  <button onClick={this.handleClick.bind(this)}>click me</button>
  ```

  或者在 class 的构造器中声明也可以
  ```javascript
  class Button extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  }
  ```

2. 使用箭头函数
  ```html
  <button onClick={()=>this.handleClick()}>click me</button>
  <!-- 上面这个语法会 return ，对性能有影响。所以建议写上大括号 -->
  <button onClick={()=>{this.handleClick()}}>click me</button>
  ```

3. 使用处于实验阶段的语法 [public class fields syntax][11]
  ```javascript
  class Button extends React.Component {
    handleClick = (event) => {
      console.log(event.target.innerHTML);
      console.log(this);
    }
    render() {
      return <button onClick={this.handleClick}>click me</button>;
    }
  }
  ```

## state

props 值不可以被改变，但 state 可以，它通过 setState 方法来改写 state 并且更新组件

使用时，必须用 class 方式声明组件，而且需要声明构造器 constructor
在构造器里，可以设置 state 的初始值、给事件方法绑定 this
```javascript
class Input2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  // 当 input 值改变时，这个方法会调用 setState 来更新 state，然后触发 render 更新组件
  handleChange(event) {
    this.setState({text: event.target.value})
  }

  // 也可以手动更改 state，然后调用 forceUpdate 方法来触发 render 更新组件
  // handleChange(event) {
  //   this.state.text = event.target.value;
  //   this.forceUpdate();
  // }

  render() {
    return(
      <div>
        <p>{this.state.text}</p>
        <input
          value={this.state.text}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
ReactDOM.render(
  <Input2 />,
  document.getElementById('root')
)
```

需要注意的是，setState 可以认为是异步的操作，react 可能会收集好几个 setState 一并处理只触发一次 render
setState 的第二个参数是回调函数，render 之后会触发，异步之后的业务放在它里面

第一个参数也可以接收函数，return 出更改后的对象即可，适用于对更改前 state 值有依赖的情况

```javascript
handleChange(event) {
  this.setState((prevState, props) => {
    return {text: event.target.value}
  })
}
```

## 生命周期
和 vue 类似，react 组件的[生命周期][12]方法执行的顺序是

挂载时：
1. constructor()
2. componentWillMount() 一般用于页面渲染前的 ajax 数据请求
3. render()
4. componentDidMount()

更新时
1. componentWillReceiveProps(nextProps)
> ① 当传入的props值变化时，触发。常用于子组件接收到 props 值时，根据该值去 ajax 查询同步数据

2. shouldComponentUpdate(nextProps, nextState)
> ② 控制组件是否渲染，return false（默认）时，阻止 render 执行

3. componentWillUpdate()
4. render()
5. componentDidUpdate()

```javascript
componentWillReceiveProps(nextProps)
{
	alert("原有的"+this.props.agreeNum+"，新的"+nextProps.agreeNum)
}
shouldComponentUpdate(nextProps,nextState)
{
	if(this.props.agreeNum!=nextProps.agreeNum) return true;
}
```

卸载时
1. componentWillUnmount()

## 条件渲染
react 的条件渲染，使用 js 来控制。当不要输出组件时，可以 return null。
可以在组件内使用 if else 也可以直接使用三目运算符
```javascript
const isLogin = true;
class Conditional extends React.Component {
  render() {
     if(isLogin) {
       return <div>logged in</div>;
     }
     else {
       return <div>logged out</div>;
     }
  }
}
ReactDOM.render(
  <div>
    <Conditional />
    {isLogin ? (<div>logged IN</div>) : (<div>logged OUT</div>)}
  </div>,
  document.getElementById('root')
)
```

## 列表渲染
react 有个特性，它会把数组，依次渲染到页面。于是利用 map 方法，就可以循环渲染列表或者多个组件了

注意每个循环的组件必须有 key 属性来作为索引，key 的值在本组件中是唯一的

还有 key 在渲染后不会显示在 dom 中，所以通过 props 是取不到的。

```javascript
const list = [1,2,3,4,5];
const listDom = [<li>A</li>,<li>B</li>]
ReactDOM.render(
  <ul>
    {listDom}
    {list.map((value, index)=>{
      return (
        <li key={index}>{value}</li>
      )
    })}
  </ul>,
  document.getElementById('root')
)
```

## 组件代码分割
使用库 [react-loadable][13] 可以很方便地异步加载代码分割后的组件，并且可以设置 loading 的状态
```
npm install --save react-loadable
```
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
const LoadableOtherComponent = Loadable({
  loader: () => import('./OtherComponent'),
  loading: () => <div>Loading...</div>
});
ReactDOM.render(
  <LoadableOtherComponent />,
  document.getElementById('root')
)
```

如果不使用库，可以使用 异步函数 配合 import() 语法加载组件，参考此文设置 [acync-component][14]


样式和其他方法，可以直接使用 import() 来导入，会自动分割

## props.children
props.children 表示所有的子组件、子元素

[`{props.children}`][15] 类似 vue 语法中的 slot，会把组件标签中的内容，渲染到子组件内部
```javascript
class Me4 extends React.Component
{
    render()
    {
        console.log(this.props.children.length);// 3
        return <div>
            {this.props.children}
        </div>;
    }
}
function Age(props) {
  return <div>{props.myage}</div>;
}
ReactDOM.render(
  <Me4>
    people
    <div>xiawei</div>
    <Age myage="26"/>
  </Me4>,
  document.getElementById("root")
);
```

## CSS
第一类是是依旧使用 css，但使用 js 来管理样式依赖，例如 [css-modules][4]，需要简单的自定义配置 webpack 即可。
参考资料[《CSS Modules 详解及 React 中实践》][5]、[CSS Modules 用法教程][6]、[CSS Modules - get started][7]

第二类是使用 js 或 json 来写 css，即 [CSS in js][8]，例如 [styled-components][9]


使用 create-react-app 构建的项目，无法配置 webpack，所以只适合使用第二类

react 项目，推荐使用 [styled-components][9]

当然，也可以使用 react 默认的方式，使用 import 来导入外部样式

```javascript
import './index.css';
```

### styled-components 初步使用
[styled-components][9] 是把基础的元素设置单独样式，来给与每个组件独立的样式，相当于一个 wrap

安装
```
npm install --save styled-components
```
使用时
```javascript
import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  color: red
`;

ReactDOM.render(
  <H1>Hello, world!</H1>,
  document.getElementById('root')
);
```

注意，使用 styled-components 声明的样式相比 import 进来的样式权重较高，
下面的代码最终生效的是 `blue`

```css
/* abc.css */
.abc {color: red}
```
```javascript
const Div = styled.div`
  .abc {color: bule}
`;
import './abc.css';
```

## 路由 Router
react 路由一般使用 [react-router][16]
路由匹配的测试器 [Route Tester][17]

### start
安装（写此文时，使用最新版 4.2.2）
```
npm install --save react-router-dom
```

最简单的路由
```javascript
// 引入
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// 组件
function Home() {
  return <h2>Home</h2>;
}
function About() {
  return <h2>About</h2>;
}

export default class extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">Home </Link>
          <Link to="/about">About </Link>
          <hr />
          <Route path="/" exact component={Home}></Route>
          <Route path="/about" component={About}></Route>
        </div>
      </Router>
    );
  }
};
```
Link 和 Route 必须写在 Router 里，Router 里必须有一个根元素来包裹 Link、Route 等
Link 相当于 a 标签，负责跳转
Route 来匹配路由，然后把组件放置在此处

### 路由模式
BrowserRouter 是 history 模式
如果需要 hash 模式，只要把单词 BrowserRouter 换为 HashRouter 即可

### 跳转 Link
路由的跳转 使用 Link，可以传字符串、对象
```html
<Link to="/courses?sort=name">Courses</Link>
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}>Courses</Link>
```
其中 state 可以用来传参，在 Route 的 props 里可以通过 props.location.state 取到

类似的还有 NavLink，用法，它可以使用 activeStyle、activeClassName，当前导航项激活时，给予样式
```javascript
import NavLink from 'react-router-dom';
```
```html
<NavLink to="/about"
  activeClassName="selected"
  activeStyle={{ color: 'green', fontWeight: 'bold' }}
>About</NavLink>
```

使用 js 跳转：
在 Route 的渲染的组件里，通过 props 里可以获取到 history、location、match
可以通过 history 的 push、go 等方法来跳转
```javascript
this.props.history.push('/otherRoute')
```

### 路由匹配
路由的匹配 使用 Route，路由匹配规则是从上到下执行，一旦发现某一个 Route 匹配了，下面的 Route 就不执行了

路由匹配测试工具 [route-tester][17]

通配符规则
1. :paramName
  :paramName 匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
2. ()
  ()表示URL的这个部分是可选的
3. `*`
  `*` 匹配任意字符，直到模式里面的下一个字符为止。

Route 里的几个 props 配置，值为 true 或 false

exact 完全匹配
strict 严格匹配斜杠（含末尾的）
sensitive 大小写敏感（区分大小写）

```html
<Route path="/">
// 匹配 /
// 匹配 /about

<Route exact path="/">
// 写了 exact，相当于 exact="true"，表示完全匹配
// 只匹配 /
// 不匹配 /about

<Route strict path="/abc/">
// 匹配 /abc/
// 不匹配 /abc

<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/*/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```

### 路由的多种加载方式：
component 组件
render 匹配到时渲染，可以用于动态的路由，在 render 里可以进行判断
children 一定会渲染，可以通过函数中的参数 match 的值 true、false 来控制，适合做动画
```html
<Route component={MyComponent} />

<Route render={(props) => {
  return <h2>Render</h2>;
}} />

<Route path="/children" children={(props) => {
  return <h2>Children is {props.match ? 'matched' : 'unmatched'}</h2>;
}}></Route>

<!-- 或者简写为 -->
<Route path="/children" children={({match}) => (
  <h2>Children is {match ? 'matched' : 'unmatched'}</h2>
)}></Route>
```

## Redux
### start

Reducers 定义数据的变化过程，是个计算的纯函数
State 存储数据，它的 store.getState() 来获取数据 state
Action 定义请求类型
store.dispath() 来提交 action


大致流程
reducers -> 产生新的 store

我们的组件 -> action -> store.dispatch 提交 -> 触发 store.subscribe 监听器 ->
 -> store.getState 得到更新后的数据 -> setState 更新组件

### 简单例子
一个新闻点击量增加的例子：
```javascript
import React from 'react';
import { createStore } from 'redux';

// 初始值
const info = {
  title: '测试新闻标题',
  clickNum: 0
}

// 创建 reducers
// Reduce 里存放处理的过程，state = info 是给参数设置默认值
const infoReduce = (state = info, action) => {
  // 必须有 type，值可以是自定义的
  if(action.type === 'INFO_ADDCLICK') {
    let oldNum = state.clickNum;
    let newNum = oldNum + 1;
    // 处理后，不改写原来的数据对象 state，而是生成一个新的对象
    return Object.assign({}, state, {clickNum: newNum})
  }
  return state;
}

// 依据 Reducers 来创建 store
const store = createStore(infoReduce);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 通过 store.getState() 来获取数据，得到初始值
      infoData: store.getState()
    }
  }

  addClick() {
    // 定义 action，必须有 type，值可以是自定义的
    const action = {
      type: "INFO_ADDCLICK"
    }
    // 使用 dispath 提交 action
    store.dispatch(action);
    // 获取数据更新组件
    this.setState({
      infoData: store.getState()
    });
  }

  render() {
    return (
      <div>
        <h2>新闻标题：{this.state.infoData.title}</h2>
        <span>点击量：{this.state.infoData.clickNum}</span>
        <div>
          <button onClick={this.addClick.bind(this)}>修改点击量</button>
        </div>
      </div>
    );
  }
}
```

获取数据更新组件的 setState 也可以使用 redux 的监听来写，当 dispatch 后会触发回调

```javascript
componentWillMount() {
  store.subscribe(()=>{
    this.setState({
      infoData: store.getState()
    });
  });
}
```

由于 dispatch 时只接收一个 action 对象，异步调用时需要做些处理

redux 可以使用相关的中间件，来对 action 进行处理，增强它的功能和易用性

## redux-thunk 中间件

[thunk函数][20] 的形式见下面
```javascript
let x = 1 + 2; // 1 + 2会立即执行

// foo 就是 thunk 函数
let foo = function (参数) {
  return function(参数) {
    return function(参数) {
      return 1 + 2;// 1 + 2被延迟执行了
    }
  }
}
```

redux 里 dispatch 的参数只能是对象

而 [redux-thunk 中间件][19]，使传入 dispatch 的参数可以是 thunk 函数，通过 thunk 函数来对 dispatch 进行异步的操作

```
npm install --save redux-thunk
```

```javascript
import React from 'react';
import { createStore, applyMiddleware } from 'redux';// 需要引入 applyMiddleware
import thunk from 'redux-thunk';

// 初始值
const info = {
  title: '测试新闻标题',
  clickNum: 0
}

// 模拟异步请求
let ajaxData = 0;
const ajax = () => new Promise((resolve) => {
  setTimeout(() => {
    ajaxData+=1;
    return resolve(ajaxData);
  },1000)
})

// Reduce 里存放处理的过程，state = info 是给参数设置默认值
const infoReduce = (state = info, action) => {
  // 必须有 type，值可以是自定义的
  if(action.type === 'INFO_ADDCLICK') {
    // 处理后，不改写原来的数据对象 state，而是生成一个新的对象
    return Object.assign({}, state, {clickNum: action.clickNum})
  }
  return state;
}

// 依据 Reduce 来创建 store
// 这里如果设置了 preloadedState 参数，applyMiddleware 在第三个参数传入，否则在第二个参数传入
const store = createStore(infoReduce, /*preloadedState,*/ applyMiddleware(thunk));

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 通过 store.getState() 来获取数据
      infoData: store.getState()
    }
  }

  componentWillMount() {
    store.subscribe(() => {
      // 获取数据后更新组件
      this.setState({
        infoData: store.getState()
      })
    })
  }

  addClick() {
    store.dispatch(function(dispatch, getState) {
      // 异步请求
      ajax().then((data) => {
        dispatch({type: "INFO_ADDCLICK", clickNum: data})
      });
    });
  }

  render() {
    return (
      <div>
        <h2>新闻标题：{this.state.infoData.title}</h2>
        <span>点赞数：{this.state.infoData.clickNum}</span>
        <div>
          <button onClick={this.addClick.bind(this)}>点赞</button>
        </div>
      </div>
    );
  }
}
```

其中，异步的请求部分，还可以进一步封装

```javascript
class API {
  // 这里使用了 static 静态方法，静态方法可以直接调用，实例化后 new API().getAgree() 调用不到静态方法
  static getAgree() {
    return function(dispatch, getState) {
      // 异步请求
      ajax().then((data) => {
        dispatch({type: "INFO_ADDCLICK", clickNum: data})
      });
    }
  }
}
// 此时 addClick 里
store.dispatch(API.getAgree());
```

## redux-saga 中间件

### es6 生成器 Generator

```javascript
function* Me() {
  yield "xiawei";
  yield 26
}
let me = Me()
me.next() // {value: "xiawei", done: false}
me.next() // {value: 26, done: false}
me.next() // {value: undefined, done: true}
```

### 使用 takeEvery 、takeLatest
[redux-saga][21] 是利用 es6 的生成器语法，来对异步函数进行拦截处理

store.dispatch 会触发 saga 的函数，然后 saga 使用 call 方法异步请求后，再 put 触发真正的 dispatch

```
npm install --save redux-saga
```

call 调用的函数返回一个 Promise，则阻塞 saga 直至成功被处理
Put 好比是正常的 dispatch，会进入 reduce 进行处理

```javascript
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSaga from 'redux-saga';// 需要引入 redux-saga
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'; // saga 里需要引入相关方法

// 初始值
const info = {
  title: '测试新闻标题',
  clickNum: 0
}

// 模拟异步请求
let ajaxData = 0;
const ajax = () => new Promise((resolve) => {
  setTimeout(() => {
    ajaxData+=1;
    return resolve(ajaxData);
  },1000)
})

// Reduce 里存放处理的过程，state = info 是给参数设置默认值
const infoReduce = (state = info, action) => {
  // 必须有 type，值可以是自定义的
  if(action.type === 'INFO_ADDCLICK') {
    // 处理后，不改写原来的数据对象 state，而是生成一个新的对象
    return Object.assign({}, state, {clickNum: action.agree})
  }
  return state;
}

// 创建 saga
const saga = createSaga();
// 依据 Reduce 来创建 store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(infoReduce, /*preloadedState,*/ composeEnhancers(
  applyMiddleware(saga)
));
// 启动 saga
saga.run(mySaga)

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 通过 store.getState() 来获取数据
      infoData: store.getState()
    }
  }

  componentWillMount() {
    store.subscribe(()=>{
      this.setState({
        infoData: store.getState()
      })
    })
  }

  addClick() {
    let newsid = 101;
    store.dispatch({type: 'SET_AGREE', newsid: newsid});
  }

  addTest() {
    store.dispatch({type: 'TEST'});
  }

  render() {
    return (
      <div>
        <h2>新闻标题：{this.state.infoData.title}</h2>
        <span>点赞量：{this.state.infoData.clickNum}</span>
        <div>
          <button onClick={this.addClick.bind(this)}>点赞</button>
          <button onClick={this.addTest.bind(this)}>测试</button>
        </div>
      </div>
    );
  }
}

// API
class InfoApi {
  static setAgreeAjax(newsid) {
    return ajax(newsid).then((agree) => agree);
  }
}

// saga，一般会放在单独的文件里
function* ajaxFunc(action) {
  const data = yield call(InfoApi.setAgreeAjax, action.newsid);
  yield put({type:'INFO_ADDCLICK', agree: data})
}
function* testFunc() {
  console.log('test');
}

// 一般最终导出它，在初始化时 saga.run(mySaga)
function* mySaga() {
  // yield takeEvery('SET_AGREE', ajaxFunc);// takeEvery，每次点击都会起作用
  yield takeLatest('SET_AGREE', ajaxFunc); // takeLatest，如果之前的请求还处于 pending，则会取消它，只有最后一次的生效
  yield takeEvery('TEST',testFunc);// 点击测试按钮时，只有 testFunc 会被触发，其他并不会
}
```
注意 takeLatest 并不会取消发出的 ajax 请求，只是会取消还未发出的 dispatch，只提交最后一次的 dispatch

mySaga 里，初始化 saga.use(mySaga) 时，会将函数执行一次，然后触发某个 action 时，拦截并执行其他函数

### 使用 take 控制流程
除了使用 takeEvery 来是触发真正的 dispatch 外，还可以使用 take 来控制流程

导入相关方法
```javascript
import { call, cancel, cancelled, fork, put, take, takeEvery, takeLatest, select } from 'redux-saga/effects'
```

mySaga 里，初始化 saga.use(mySaga) 时，会将函数执行一次，但与 takeEvery 不同的是

执行到 take 时，程序会暂停，直到接收到这个 action 才会继续运行下面的语句

所以如果 mySaga 里的逻辑需要多次使用，必须用 while 语句来包裹

```javascript
function* mySaga() {
  while(true) {
    const action = yield take('USER_LOGIN');// 登录，执行完 take 后会返回它的 action
    yield put({type: 'ACTIVE_CHANGE', btnDisabled: true});// 触发真正的 dispatch，禁用登录按钮

    // call 语句阻塞调用，执行完才接着执行后面的其他语句，直到登录完成，才可以执行注销
    // yield call(userLogin);

    // fork 是非阻塞调用（异步），会接着执行后面的语句，在下一个 take 停住，登录未完成时，也可以执行注销
    const task = yield fork(userLogin);// 执行完成后返回 task

    yield take('LOGIN_OUT');// 注销
    if(task) {
      yield cancel(task); // cancel 可以取消还在执行的 task，登录未完成时，点注销，会取消登录的 saga 的 dispatch
    }

    yield put({type: 'LOGIN_OUT_DONE'});// 注销完成，触发真正的 dispatch

    yield put({type: 'ACTIVE_CHANGE', btnDisabled: false});// 触发真正的 dispatch，启用登录按钮
  }
}
```

刚刚使用了 cancel 取消了登录非阻塞调用的 dispatch。cancel 必须是和 fork 配合使用的

取消时，如果需要触发取消的相关业务逻辑，可以这样实现：

取消的是 USER_LOGIN 事件 userLogin 的执行，所以按照官方文档在它里面使用 [try/catch/finally][23]

yield cancelled() 可以判断取消事件

```javascript
function* userLogin() {
  try {
     // 登录的业务逻辑
  }
  catch(err) {
     // 出错后，执行的业务逻辑
  }
  finally {
    if(yield cancelled()) {
      // 取消后，执行的业务逻辑
      yield put({type: 'UPDATE_USERLEVEL', level: '获取等级取消'});
    }
  }
}
```

还有 select 方法会返回当前 store 里的 state 对象，类似 store.getState() 的作用
```javascript
const state = yield select();
```

## redux-dev-tool

redux 调试工具，有多种使用方式，具体见官方文档[Redux DevTools][22]

这里推荐使用 浏览器扩展插件 [Redux DevTools Extension][18]

redux 的基本使用
```javascript
const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   // 加入这个 window 参数即可，注意有第二个参数 preloadedState 时，放在第三个参数位置上
 );
```

使用中间件时
```javascript
// 注意还需要引入 compose
import { createStore, applyMiddleware, compose } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware)
))
```

eslint 禁用下划线时，可以在 window 的前面行和后面行加上代码
```javascript
/* eslint-disable no-underscore-dangle */
const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
/* eslint-enable */
```

## 待续...

<!-- 参考资料 -->
[1]: https://github.com/facebook/create-react-app
[2]: https://github.com/tuchk4/awesome-create-react-app
[4]: https://github.com/css-modules/css-modules
[5]: https://github.com/camsong/blog/issues/5
[6]: http://www.ruanyifeng.com/blog/2016/06/css_modules.html
[7]: https://github.com/css-modules/css-modules/blob/master/docs/get-started.md
[8]: https://github.com/MicheleBertoli/css-in-js
[9]: https://github.com/styled-components/styled-components
[10]: https://reactjs.org/docs/react-without-es6.html
[11]: https://babeljs.io/docs/plugins/transform-class-properties/
[12]: https://reactjs.org/docs/react-component.html
[13]: https://github.com/jamiebuilds/react-loadable
[14]: https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
[15]: https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891
[16]: https://reacttraining.com/react-router/web/guides/quick-start
[17]: https://pshrmn.github.io/route-tester/#/
[18]: https://github.com/zalmoxisus/redux-devtools-extension
[19]: https://github.com/gaearon/redux-thunk
[20]: http://www.ruanyifeng.com/blog/2015/05/thunk.html
[21]: https://redux-saga.js.org/
[22]: https://github.com/gaearon/redux-devtools
[23]: http://www.runoob.com/jsref/jsref-try-catch.html
