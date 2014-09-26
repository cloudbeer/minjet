var express = require('express');
var router = express.Router();
var utils = require('../share/utils')



var Account = require('../controllers/Account');
router.post("/register", function (req, res) {
  Account.register_act(req, res);
});

router.post("/login", function (req, res) {
  Account.login_act(req, res);
});


var Project = require('../controllers/Project');
router.get("/project/mine", function(req, res){
  if (utils.isLogin(req, res, true)) {
    Project.mine(req, res);
  }
});

router.get("/project/detail/:id", function(req, res){

});

router.post("/project/save", function(req, res){
  if (utils.isLogin(req, res, true)){
    Project.save(req, res);
  }
});
router.post("/project/delete", function(req, res){
  if (utils.isLogin(req, res, true)){
    //Project.delete(req, res);
  }

});








module.exports = router;
