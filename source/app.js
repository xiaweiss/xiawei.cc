const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')

const Koa = require('koa')
const koaCors = require('@koa/cors');
const koaStatic = require('koa-static')
const enforceHttps = require('koa-sslify').default

const prod = true

const app = new Koa()
app.use(koaCors())

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '.'

app.use(koaStatic(
  path.join(__dirname, staticPath),
  // { maxage: 1 * 24 * 60 * 60 * 1000 } // 1 day
))

if (prod) {
  // Force HTTPS on page
  app.use(enforceHttps())
  // SSL options
  const options = {
    key: fs.readFileSync('/home/xiawei/xiawei.cc.key'),
    cert: fs.readFileSync('/home/xiawei/xiawei.cc.pem')
  }
  // Start the server
  http.createServer(app.callback()).listen(80)
  https.createServer(options, app.callback()).listen(443)
} else {
  http.createServer(app.callback()).listen(9000)
}

// 允许 node 监听小于 1024 的端口
// sudo setcap cap_net_bind_service=+ep /home/xiawei/.nvm/versions/node/v12.16.1/bin/node

// 启动 pm2 (Cluster mode)
// pm2 start app.js -i max --watch

// 重启 pm2
// pm2 reload app

// 停止 pm2
// pm2 stop app --watch

// 查看 pm2 进程
// pm2 ls

// 设置 pm2 开机启动
// sudo su -c "env PATH=$PATH:/home/xiawei/.nvm/versions/node/v12.16.1/bin pm2 startup -u xiawei --hp /home/xiawei"

// 取消 pm2 开机启动
// pm2 unstartup systemd

