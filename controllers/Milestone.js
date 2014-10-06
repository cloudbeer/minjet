var db = require('../share/mysql/DB');
var errors = require('../share/errors');
var utils = require('../share/utils');

var Milestone = {
  save: function (req, res, next) {
    var mileStone = req.body;
    var project_id = req.body.project_id;
    var user_id = req.session.user.id;

    if (!project_id || project_id <= 0) {
      return next(errors.PARAMETER_REQUIRED("project_id required."));
    }
    utils.checkProjectManager(project_id, user_id, function () {
      if (mileStone.hasOwnProperty("id") && mileStone.id > 0) {
        mileStone.updator = user_id;
        mileStone.update_date = new Date();
      } else {
        mileStone.creator = user_id;
      }
      db.save("milestone", mileStone, function (err, mileStone2) {
        if (err) return next(err);
        res.send({code: 1, data: mileStone2});
      });
    });
  },
  mine: function(req, res, next){
    var mine_id = req.session.user.id;
    var xsql = "creator=?";
    var xparams = [mine_id];

    if (req.params.hasOwnProperty("proejct_id")){
      xsql += " and project_id=?";
      xparams.push(req.params.project_id);
    }

    db.list("milestone",  xsql + " order by id desc limit 0, 100", xparams, function(err, milestones){
      if (err) return next(err);
      res.send({code:1, data: milestones});
    });
  },
  tasks: function(req, res, next){
    var milestone_id = req.params.id;
    var pageSize = 100;
    var page = 1;
    db.list('task', 'milestone_id=? order by id desc', [milestone_id], function(err, tasks){
      if (err) return next(err);
      res.send({code:1, data: tasks});
    }, pageSize, page);
  }


};

module.exports = Milestone;