//Project Controller
var ProjectService = require('../services/ProjectService');


var Project = {
  save: function(req,res){
    ProjectService.save(req.body, req.session.user.id, function(err, project){
      if (err){
        res.send({code: 0, error: err.message});
        return;
      }
      res.send({code:1});
    });
  },
  mine: function(req, res){
    var mine_id = req.session.user.id;
    ProjectService.listByUser(mine_id, function(err, projects){
      if (err){
        res.send({code: 0, error: err.message});
        return;
      }
      res.send({code:1, data: projects});      
    });
  },
  detail: function(req, res){
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