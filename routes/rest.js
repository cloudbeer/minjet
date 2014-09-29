var express = require('express');
var router = express.Router();
var utils = require('../share/utils')



var Account = require('../controllers/Account');
router.post("/api/register", function (req, res) {
  Account.register_act(req, res);
});

router.post("/api/login", function (req, res) {
  Account.login_act(req, res);
});


var Project = require('../controllers/Project');
router.get("/api/project/mine", function(req, res){
  if (utils.isLogin(req, res, true)) {
    Project.mine(req, res);
  }
});

router.get("/api/project/detail/:id", function(req, res){

});

router.post("/api/project/save", function(req, res){
  if (utils.isLogin(req, res, true)){
    Project.save(req, res);
  }
});
router.post("/api/project/delete", function(req, res){
  if (utils.isLogin(req, res, true)){
    //Project.delete(req, res);
  }

});








module.exports = router;
