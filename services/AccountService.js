var db = require('../share/mysql/DB');
var utils = require('../share/utils');
var errors = require('../share/errors'); 

var AccountService = {
  login: function(email, password, callback){
    db.load("account", "email=?", [email], function(err, account){
      if (err){
        if (callback) callback(err);
        return;
      }
      var dbPassword = account.password;
      if (dbPassword!=utils.genPassword(password, account.salt)){
        if (callback) callback(new errors.PasswordWrong());
        return;
      }
      callback(err, account);
    });
  },
  register: function(email, nick, password, callback){
    db.exists("account", "email=?", [email], function(err, exists){
      if (err){
        if (callback) callback(err);
        return;
      }
      if (exists){
        if (callback) callback(new errors.Duplicated('[' + email + '] 已经存在.'));
        return;
      } 
      var salt = utils.genSalt();
      var newPassword = utils.genPassword(password, salt);
      var account = {salt:salt, email: email, nick: nick, password: newPassword};
      var account = db.save("account", account, function(err, account){
        if (callback) callback(err, account);
      });
    });
  }
}

module.exports = AccountService;