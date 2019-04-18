// 处理错误中间件
var createError = require('http-errors');
var express = require('express');
// 用于解析文件和目录的核心node库
var path = require('path');
// 用于解析cookie头来填充req.cookies(提供了访问cookie信息的便捷方法)
var cookieParser = require('cookie-parser');
// node 专用 HTTP 请求记录器中间件
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 创建一个express应用对象（依照惯例命名为app）
var app = express();

// view engine setup(视图引擎设定)
// 设置'view'以指定模板的存储文件夹（此处设为子文件夹/views）
// 然后设置'view engine'以指定模板库（此处为"pug"）
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use()调用将中间件库添加进请求处理链
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 使用express.static中间件将项目根目录下所有静态文件托管至/public目录
app.use(express.static(path.join(__dirname, 'public')));

// 把之前导入的路由处理器添加到请求处理链中，从而为网站的不同部分定义具体的路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 捕获 404 并抛给错误处理器
// 最后一个中间件为错误和 HTTP 404 响应添加处理方法
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler错误处理器
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // 设置locals,只在开发环境提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page渲染出错页面
  res.status(err.status || 500);
  res.render('error');
});

// 添加到exports模块（使它可以通过/bin/www导入
module.exports = app;
