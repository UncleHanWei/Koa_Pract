const Koa = require('koa');
const morgan = require('koa-morgan');
const render = require("@koa/ejs"); // ejs 模板語言渲染函式庫
const serve = require("koa-static");  // 提供靜態檔案的函式庫
const { bodyParser } = require("@koa/bodyparser"); // 把 post request 轉換成可讀取的資料
const path = require("path");
const mysql = require('mysql');
const session = require('koa-session');

require('dotenv').config();

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

const pool = mysql.createPool({
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PWD,
  database        : process.env.DB_DB
});

app.use((ctx, next) => {
  ctx.db = pool;
  return next();
});


app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());
app.use(loginRouter.routes(), loginRouter.allowedMethods());

app.listen(3000);