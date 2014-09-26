//Project Service
var db = require('../share/mysql/DB');
var utils = require('../share/utils');
var errors = require('../share/errors'); 

var ProjectService = {
  save: function(project, user_id, callback){
  	if (project.id===undefined){
  		project.creator = user_id;
  	}else{
  		project.updator = user_id;
  		project.update_date = new Date();
  	}
    db.save("project", project, function(err, project2){
      if (err){
        if (callback) callback(err);
        return;
      }
      callback(err, project2);
    });
  },
  load: function(id, callback){
  	db.loadById("project", id, function(err, project){
  		callback(err, project);
  	});
  },
  listByUser: function(user_id, callback){
  	db.list("project", "creator=? order by id desc limit 0, 100", [user_id], function(err, projects){
  		callback(err, projects);
  	});
  }
};

module.exports = ProjectService;