var express = require('express');
var router = express.Router();

function isLogin(req, res, back){
  if (req.session.user) {
    return true;
  }
  back=back || req.originalUrl;
  res.redirect('/login?back=' + encodeURIComponent(back));
  return false;
}

router.get('/', function(req, res) {
  if (isLogin(req, res)){
    res.render('index', {title: 'Home'});
  }
});


var Account = require('../controllers/Account');
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


var Project = require('../controllers/Project');
router.get("/project/mine", function(req, res){
  if (!isLogin(req, res)) return;  
  Project.mine(req, res);
});

router.get("/project/detail/:id", function(req, res){

});
router.get("/project/edit", function(req, res){
  if (!isLogin(req, res)) return;
  Project.edit_ui(req, res);
});
router.post("/project/save", function(req, res){
  if (!isLogin(req, res)) return;
  Project.save(req, res);
});
router.post("/project/delete", function(req, res){

});


















module.exports = router;
