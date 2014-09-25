var express = require('express');
var router = express.Router();
var Account = require('../controllers/Account');

router.get('/', function(req, res) {
  if (req.session.user){
    res.render('index', { title: '首页' });
  }else{
    res.redirect('/login');
  }
});


router.get("/register", function (req, res) {
  Account.register_ui(req, res);
});
router.post("/register", function (req, res) {
  Account.register_act(req, res);
});


router.get("/login", function (req, res) {
  Account.login_ui(req, res);
});
router.post("/login", function (req, res) {
  Account.login_act(req, res);
});



















module.exports = router;
