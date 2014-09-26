var express = require('express');
var router = express.Router();
var utils = require('../share/utils')

//首页
router.get('/', function(req, res) {
  if (utils.isLogin(req, res)){
    res.render('index', {title: 'Home'});
  }
});
//注册
router.get("/register", function (req, res) {
  res.render('account/register', {title: '帐号注册'});
});
//登录
router.get("/login", function (req, res) {
  res.render('account/login', {title: '登录', back: req.query.back});
});
//项目详情
router.get("/project/detail/:id", function(req, res){

});
//编辑项目
router.get("/project/edit", function(req, res){
  if (!utils.isLogin(req, res)) return;
  var id = req.params.id;
  var title="创建项目";
  if (id) {
    title="编辑项目";
  }
  res.render('project/edit', {title: title});
});








module.exports = router;
