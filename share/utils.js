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
      var notLoginError = errors.NOT_LOGIN;
      notLoginError.back = back;
      throw(notLoginError);
    }
  },
  checkProjectOwner: function (project_id, user_id, callback) {
    db.exists("project", "id=? and creator=?", [project_id, user_id], function(err, isExists){
      if (err) throw err;
      if (!isExists) throw errors.NOT_AUTHORIZED("您没有此项目的权限");
      callback();
    });
  }

};

module.exports = Utils;