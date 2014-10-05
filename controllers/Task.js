var db = require('../share/mysql/DB');
var errors = require('../share/errors');
var utils = require('../share/utils');


var Task = {
  save: function (req, res, next) {
    var task = req.body;
    var project_id = req.body.project_id;
    var user_id = req.session.user.id;

    if (!project_id || project_id <= 0) {
      throw errors.PARAMETER_REQUIRED("project_id required.");
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
  }

};