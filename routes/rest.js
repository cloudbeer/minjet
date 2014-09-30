var express = require('express');
var router = express.Router();

var Account = require('../controllers/Account');
router.post("/account/register", Account.register);
router.post("/account/login", Account.login);
router.get("/account/logout", Account.logout);
router.get("/api/account/find_nick/:nick", Account.findByNick);
router.get("/api/account/list_nick/:nick", Account.listByNick);

var Project = require('../controllers/Project');
router.get("/api/project/mine", Project.mine);
router.get("/api/project/detail/:id", Project.detail);
router.post("/api/project/save", Project.save);
router.post("/api/project/delete", Project.delForce); //这个删除是强制删除








module.exports = router;
