const Koa = require('koa');
const morgan = require('koa-morgan');
const render = require("@koa/ejs"); // ejs 模板語言渲染函式庫
const serve = require("koa-static");  // 提供靜態檔案的函式庫
const { bodyParser } = require("@koa/bodyparser"); // 把 post request 轉換成可讀取的資料
const path = require("path");

const app = new Koa();

app.use(serve(path.join(__dirname, '/static'))); // 把提供靜態檔案的服務註冊進 app
app.use(bodyParser()) // 註冊 post request parser

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');

// 建立並綁定 render
render(app, {
  root: path.join(__dirname, "views"),
  layout: false,
  viewExt: "html",
  cache: false,
  debug: false,
});

// setup the logger
app.use(morgan('dev'));

app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());
app.use(loginRouter.routes(), loginRouter.allowedMethods());

app.listen(3000);