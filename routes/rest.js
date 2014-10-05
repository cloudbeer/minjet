var express = require('express');
var router = express.Router();

var Account = require('../controllers/Account');
router.post("/account/register", Account.register);
router.post("/account/login", Account.login);
router.get("/account/logout", Account.logout);
router.get("/api/account/find-nick/:nick", Account.findByNick);
router.get("/api/account/list-nick/:nick", Account.listByNick);

var Project = require('../controllers/Project');
router.get("/api/project/mine", Project.mine);
router.get("/api/project/detail/:id", Project.detail);
router.post("/api/project/save", Project.save);
router.post("/api/project/delete", Project.delForce); //这个删除是强制删除
router.post("/api/project/add-member", Project.addMember);

var Milestone = require('../controllers/Milestone');
router.post('/api/milestone/save', Milestone.save);

var Task = require('../controllers/Task');
router.post('/api/task/save', Task.save);
router.post('/api/task/assign', Task.assign);

module.exports = router;
