var db = require('../share/mysql/DB');

var Project = {
  save: function(req, res, next){
    var project = req.body;
    var user_id = req.session.user.id;
    if (project.hasOwnProperty("id") && project.id>0) {
      project.updator = user_id;
      project.update_date = new Date();
    } else {
      project.creator = user_id;
    }
    db.save("project", project, function(err, project2){
      if (err) return next(err);
      res.send({code:1, data: project2});
    });
  },
  mine: function(req, res, next){
    var mine_id = req.session.user.id;

    db.list("project", "creator=? order by id desc limit 0, 100", [mine_id], function(err, projects){
      if (err) return next(err);
      res.send({code:1, data: projects});
    });
  },
  detail: function(req, res, next){
    var project_id = req.params.id;
    db.loadById("project", project_id, function(err, project){
      if (err) return next(err);
      res.send({code:1, data: project});
    });
  },
  addMember: function(req, res, next){
    //var project_id = req.body.project_id, account_id=req.body.account_id， role: req.body,;
    var project_member = req.body; // {project_id: project_id, account_id: account_id, role: role};
    db.save("project_member", project_member, function(err, model){
      if (err) return next(err);
      res.send({code:1});
    });
  }
};


module.exports = Project;