var express = require('express');
var router = express.Router();
var utils = require('../share/utils')



var Account = require('../controllers/Account');
router.post("/account/register", function (req, res) {
  Account.register(req, res);
});

router.post("/account/login", function (req, res) {
  Account.login(req, res);
});

router.get("/api/account/find_nick/:nick", function(req, res){
  Account.findByNick(req, res);
});
router.get("/api/account/list_nick/:nick", function(req, res){
  Account.listByNick(req, res);
});

var Project = require('../controllers/Project');
router.get("/api/project/mine", function(req, res){
    Project.mine(req, res);
});

router.get("/api/project/detail/:id", function(req, res){
  Project.detail(req, res);
});


router.post("/api/project/save", function(req, res){
  Project.save(req, res);
});
router.post("/api/project/delete", function(req, res){
  Project.delete(req, res);
});








module.exports = router;
