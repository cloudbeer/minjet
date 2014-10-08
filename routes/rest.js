var express = require('express');
var router = express.Router();

var CookieUtil = require('../controllers/CookieUtil');
router.get('/get-session-id', CookieUtil.getId);

var Account = require('../controllers/Account');
router.post("/account/register", Account.register);
router.post("/account/login", Account.login);
router.get("/account/logout", Account.logout);
router.get("/api/account/find-nick/:nick", Account.findByNick);
router.get("/api/account/list-nick/:nick", Account.listByNick);

var Project = require('../controllers/Project');
router.get("/api/project/mine", Project.mine);
router.get("/api/project/detail/:id", Project.detail);
router.get('/api/project/:id/milestones', Project.milestones);
router.get('/api/project/:id/backlogs', Project.backlogs);
router.post("/api/project/save", Project.save);
router.post("/api/project/delete", Project.delForce); //这个删除是强制删除,会同时删除所有关联项
router.post("/api/project/add-member", Project.addMember);

var Milestone = require('../controllers/Milestone');
router.post('/api/milestone/save', Milestone.save);
router.get('/api/milestone/mine', Milestone.mine);
router.get('/api/milestone/mine/p/:project_id', Milestone.mine); //指定项目下的
router.get('/api/milestone/:id/tasks', Milestone.tasks);

var Task = require('../controllers/Task');
router.get('/api/task/mine', Task.mine);
router.post('/api/task/save', Task.save);
router.post('/api/task/assign', Task.assign);
router.get('/api/task/mine/p/：project_id', Task.mine); //指定项目下的
router.get('/api/task/mine/m/:milestone_id', Task.mine); //指定里程碑下的
router.post('/api/task/assign-milestone', Task.assignMilestone);


module.exports = router;
