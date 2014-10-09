var crypto = require('crypto');
var errors = require('./errors');
var db = require('../share/mysql/DB');

var Utils = {
  genPassword: function (password, salt) {
    var md5 = crypto.createHash('md5');
    return md5.update(password + salt).digest("hex");
  },
  randomString: function (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-={}[]:;<>?,./;'
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  },
  genSalt: function () {
    return Utils.randomString(16);
  },
  checkLogin: function (req, res, back) {
    if (!req.session.user) {
      back = back || req.originalUrl;
      var notLoginError = errors.NOT_LOGIN();
      notLoginError.back = back;
      throw notLoginError;
    }
  },
  checkProjectManager: function (project_id, user_id, callback) {
    //TODO: 这里逻辑待强化，创建者，项目经理均有权限才对
    db.exists("project", "id=? and creator=?", [project_id, user_id], function(err, isExists){
      if (err) throw err;
      if (!isExists) throw errors.NOT_AUTHORIZED("您没有此项目的权限");
      callback();
    });
  },
  checkTaskManager: function(task_id, user_id, callback){
    db.loadById("task", task_id, function(err, task){
      if (err) throw err;
      Utils.checkProjectManager(task.project_Id, user_id, callback);
    });
  }

};

module.exports = Utils;

//TODO: error 模型，这里是应该throw，还是放到 callback，待实验。
