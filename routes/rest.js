var express = require('express');
var router = express.Router();
var utils = require('../share/utils')



var Account = require('../controllers/Account');
router.post("/account/register", function (req, res, next) {
  Account.register(req, res, next);
});

router.post("/account/login", function (req, res, next) {
  Account.login(req, res, next);
});
router.get("/account/logout", function (req, res, next) {
  Account.logout(req, res, next);
});


router.get("/api/account/find_nick/:nick", function(req, res, next){
  Account.findByNick(req, res, next);
});
router.get("/api/account/list_nick/:nick", function(req, res, next){
  Account.listByNick(req, res, next);
});

var Project = require('../controllers/Project');
router.get("/api/project/mine", function(req, res, next){
    Project.mine(req, res, next);
});

router.get("/api/project/detail/:id", function(req, res, next){
  Project.detail(req, res, next);
});


router.post("/api/project/save", function(req, res, next){
  Project.save(req, res, next);
});
router.get("/api/project/delete", function(req, res, next){
  Project.delete(req, res, next);
});








module.exports = router;
