var db = require('../share/mysql/DB');
var utils = require('../share/utils');
var errors = require('../share/errors');

var Account = {
  login: function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    db.load("account", "email=?", [email], function (err, account) {
      if (err) return next(err);
      var dbPassword = account.password;
      if (dbPassword != utils.genPassword(password, account.salt)) {
        return next(errors.WRONG_PASSWORD);
      }
      req.session.user = account;
      res.send({code: 1});
    });
  },
  logout: function(req, res){
    delete req.session.user;
    res.send({code: 1});
  },
  register: function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    var nick = req.body.nick;

    db.exists("account", "email=?", [email], function (err, exists) {
      if (err) return next(err);
      if (exists) {
        var dupError = errors.DUPLICATED; dupError.message='Email [' + email + '] 已经存在.';
        return next(dupError);
      }
      db.exists("account", "nick=?", [nick], function (err, exists) {
        if (err) return next(err);
        if (exists) {
          var dupError2 = errors.DUPLICATED; dupError2.message='昵称 [' + nick + '] 已经存在.';
          return next(dupError2);
        }
        var salt = utils.genSalt();
        var newPassword = utils.genPassword(password, salt);
        var accountData = {salt: salt, email: email, nick: nick, password: newPassword};
        db.save("account", accountData, function (err, account) {
          if (err) return next(err);
          res.send({code: 1});
        });
      });
    });
  },
  listByNick: function(req, res, next){
    var nick = req.params.nick;
    db.list("account", "nick like ?", ["%" + nick + "%"], function (err, accounts) {
      if (err) return next(err);
      res.send({code: 1, data: accounts});
    }, 20, 1);
  },
  findByNick: function(req, res, next){
    var nick = req.params.nick;
    db.load("account", "nick=?", [nick], function (err, account) {
      if (err) return next(err);
      res.send({code: 1, data: account});
    });
  }
};

module.exports = Account;