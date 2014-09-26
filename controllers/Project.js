//Project Controller
var ProjectService = require('../services/ProjectService');


var Project = {
  edit_ui: function(req, res){
    var id = req.params.id;
    var title="创建项目";
    if (id) {
      title="编辑项目";
    }

    res.render('project/edit', {title: title});
  },
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
  }
};


module.exports = Project;