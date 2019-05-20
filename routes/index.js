// 加载express模块并获取express.Router对象（命名为router）
var express = require('express');
var router = express.Router();

// 为router指定路由，最后导出router,就可以导入app.js了
/* GET home page. */
// Response.render()方法用某对象的某个变量值一同来渲染一个特定模板，
// 然后将结果作为响应发送
// 该路由使用'index'模板和一个模板变量title来渲染响应
router.get('/', function(req, res, next) {
  res.render('/catalog', { title: 'Express' });
});

module.exports = router;
