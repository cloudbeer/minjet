//Project Controller
var ProjectService = require('../services/ProjectService');
var db = require('../share/mysql/DB');
var utils = require('../share/utils');
var errors = require('../share/errors');


var Project = {
  save: function(req, res){
    utils.checkLogin(req, res);

    var project = req.body;
    var user_id = req.session.user.id;
    if (project.hasOwnProperty("id") && project.id>0) {
      project.updator = user_id;
      project.update_date = new Date();
    } else {
      project.creator = user_id;
    }
    db.save("project", project, function(err, project2){
      if (err){
        return next();
      }
      res.send({code:1, data: project2});
    });
  },
  mine: function(req, res){
    var mine_id = req.session.user.id;

    db.list("project", "creator=? order by id desc limit 0, 100", [mine_id], function(err, projects){
      if (err) return next(err);
      res.send({code:1, data: projects});
    });
  },
  detail: function(req, res){
    utils.checkLogin(req, res);
    var projectId = req.params.id;
    ProjectService.load(projectId, function(err, project){
        if (err){
            res.send({code: 0, error: err.message});
            return;
        }
        res.send({code:1, data: project});

    });
  },
  addMember: function(req, res){
    utils.checkLogin(req, res);
    var projectId = req.body.project_id, account_id=req.body.account_id;
    ProjectService.addMember(projectId, account_id, function(err, project){
      if (err){
        res.send({code: 0, error: err.message});
        return;
      }
      res.send({code:1});
    });
  }
};


module.exports = Project;