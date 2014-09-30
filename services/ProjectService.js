//Project Service
var db = require('../share/mysql/DB');
var utils = require('../share/utils');
var errors = require('../share/errors'); 

var ProjectService = {
  load: function(id, callback){
  	db.loadById("project", id, function(err, project){
  		callback(err, project);
  	});
  },
  listByUser: function(user_id, callback){
  	db.list("project", "creator=? order by id desc limit 0, 100", [user_id], function(err, projects){
  		callback(err, projects);
  	});
  },
  del: function(project_id, callback){
    db.exists("project_member", "project_id=?", [project_id], function(err, isExists){
      if (err) {
        callback(err);
        return;
      }
      if (isExists) {
        callback({name:"CanNotDelete", message: "project_member 有关联"});
        return;
      }

      db.exists("milestone", "project_id=?", [project_id], function(err, isExists){
        if (err) {
          callback(err);
          return;
        }
        if (isExists) {
          callback({name:"CanNotDelete", message: "milestone 有关联"});
          return;
        }

        db.exists("task", "project_id=?", [project_id], function(err, isExists){
          if (err) {
            callback(err);
            return;
          }
          if (isExists) {
            callback({name:"CanNotDelete", message: "task 有关联"});
            return;
          }
          db.exists("history", "project_id=?", [project_id], function(err, isExists){
            if (err) {
              callback(err);
              return;
            }
            if (isExists) {
              callback({name:"CanNotDelete", message: "history 有关联"});
              return;
            }
            db.exists("issue", "project_id=?", [project_id], function(err, isExists){
              if (err) {
                callback(err);
                return;
              }
              if (isExists) {
                callback({name:"CanNotDelete", message: "issue 有关联"});
                return;
              }
              db.exists("project_invite", "project_id=?", [project_id], function(err, isExists){
                if (err) {
                  callback(err);
                  return;
                }
                if (isExists) {
                  callback({name:"CanNotDelete", message: "project_invite 有关联"});
                  return;
                }
                db.del("project", "id=?", [project_id], function(err, affectedRows){
                  callback(err, affectedRows);
                });
              });
            });
          });
        });
      });
    });
  },
  delForce: function(project_id, callback){
    var sql = "delete from milestone where project=:id;";
    sql+="delete from project_member where project_id=:id;";
    sql+="delete from milestone where project_id=:id;";
    sql+="delete from task where project_id=:id;";
    sql+="delete from history where project_id=:id;";
    sql+="delete from project where id=:id;";
    db.query(sql, {id: project_id}, function(err, affectRows){
      if (err){
        if (callback) callback(err);
        return;
      }
      callback(err, affectRows);
    })
  },
  addMember: function(project_id, account_id, role, callback){
    var project_member = {project_id: project_id, account_id: account_id, role: role};
    db.save("project_member", project_member, function(err, model){
      if (err){
        if (callback) callback(err);
        return;
      }
      callback(err, model);
    });
  }
};

module.exports = ProjectService;