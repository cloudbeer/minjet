var express = require('express');
var router = express.Router();
var account = require('../logic/account');

router.get('/', function(req, res) {
  if (req.session.user){
    res.render('index', { title: '首页' });
  }else{
    res.redirect('/login');
  }
});


router.get("/register", function (req, res) {
  account.register_ui(req, res);
});
router.post("/register", function (req, res) {
  account.register_act(req, res);
});


router.get("/login", function (req, res) {
  account.login_ui(req, res);
});
router.post("/login", function (req, res) {
  account.login_act(req, res);
});



















module.exports = router;
