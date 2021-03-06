var db = require('../share/mysql/DB');
var errors = require('../share/errors');
var utils = require('../share/utils');


var Task = {
  save: function (req, res, next) {
    var task = req.body;
    var project_id = req.body.project_id;
    var user_id = req.session.user.id;

    if (!project_id || project_id <= 0) {
      return next( errors.PARAMETER_REQUIRED("project_id required."));
    }
    utils.checkProjectManager(project_id, user_id, function () {
      if (mileStone.hasOwnProperty("id") && mileStone.id > 0) {
        mileStone.updator = user_id;
        mileStone.update_date = new Date();
      } else {
        mileStone.creator = user_id;
      }
      db.save("task", task, function (err, task2) {
        if (err) return next(err);
        res.send({code: 1, data: task2});
      });
    });
  },
  assign: function(req, res, next){
    var task_id = req.body.task_id;
    var user_id = req.body.user_id;
    var mine_id = req.session.user.id;

    if (!task_id || task_id <= 0) {
      return next(errors.PARAMETER_REQUIRED("task_id required."));
    }
    if (!user_id || user_id <= 0) {
      return next( errors.PARAMETER_REQUIRED("user_id required."));
    }
    utils.checkTaskManager(task_id, mine_id, function(){
      db.save("task", {id:task_id, owner: user_id}, function(err, task2){
        if (err)  return next(err);
        res.send({code: 1, data: task2});
      })
    });
  },
  mine: function(req, res, next){
    var mine_id = req.session.user.id;
    var xsql = "owner=?";
    var xparams = [mine_id];

    if (req.params.hasOwnProperty("proejct_id")){
      xsql += " and project_id=?";
      xparams.push(req.params.project_id);
    }
    if (req.params.hasOwnProperty("milestone_id")){
      xsql += " and milestone_id=?";
      xparams.push(req.params.project_id);
    }

    db.list("task", xsql + " order by id desc limit 0, 100", xparams, function(err, tasks){
      if (err) return next(err);
      res.send({code:1, data: tasks});
    });
  },
  assignMilestone: function(req,res,next){
    var task_id = req.body.task_id;
    var milestone_id = req.body.milestone_id;
    if (!task_id || !milestone_id || task_id<=0||milestone_id<=0){
      return next( errors.PARAMETER_REQUIRED("task_id and milestone_id required."));
    }

    var task = {id: task_id, milestone_id: milestone_id};
    db.save("task", task, function(err, task2){
      if (err) return next(err);
      res.send({code:1});
    });

  }
};


module.exports = Task;