var db = require('../share/mysql/DB');
var utils = require('../share/utils');
var errors = require('../share/errors');

var AccountService = {
  login: function (email, password, callback) {
    db.load("account", "email=?", [email], function (err, account) {
      if (err) {
        if (callback) callback(err);
        return;
      }
      var dbPassword = account.password;
      if (dbPassword != utils.genPassword(password, account.salt)) {
        if (callback) callback(new errors.PasswordWrong());
        return;
      }
      callback(err, account);
    });
  },
  register: function (email, nick, password, callback) {
    db.exists("account", "email=?", [email], function (err, exists) {
      if (err) {
        if (callback) callback(err);
        return;
      }
      if (exists) {
        if (callback) callback(new errors.Duplicated('[' + email + '] 已经存在.'));
        return;
      }
      db.exists("account", "nick=?", [nick], function (err, exists) {
        if (err) {
          if (callback) callback(err);
          return;
        }
        if (exists) {
          if (callback) callback(new errors.Duplicated('[' + nick + '] 已经存在.'));
          return;
        }
        var salt = utils.genSalt();
        var newPassword = utils.genPassword(password, salt);
        var accountData = {salt: salt, email: email, nick: nick, password: newPassword};
        db.save("account", accountData, function (err, account) {
          if (callback) callback(err, account);
        });
      });
    });
  },
  findByNick: function (nick, callback) {
    db.load("account", "nick=?", [nick], function (err, account) {
      if (err) {
        if (callback) callback(err);
        return;
      }
      callback(err, account);
    });
  },
  listByNick:function (nick, callback) {
    db.list("account", "nick like ?", ["%" + nick + "%"], function (err, accounts) {
      if (err) {
        if (callback) callback(err);
        return;
      }
      callback(err, accounts);
    }, 20, 1);
  }
};

module.exports = AccountService;