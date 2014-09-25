var db = require('../tools/mysql/DB');
var utils = require('./utils');

var Account = {
  login_ui: function(req, res){
  	console.log("test");
    res.render('account/login', {title: '登录'});
  },
  login_act: function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    res.send({code: 0});

  },
  register_ui: function(req, res){
    res.render('account/register', {title: '帐号注册'});
  },
  register_act: function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var nick = req.body.nick;
    AccountService.register(email, nick, password, function(err, account){
      if (err){
        res.send({code: 0, error: err.message});
      }else{
        res.send({code: 1});
      }
    });
  }
}

var AccountService = {
  login: function(email, password){
    var account = db.loadWhere2("account", "email=?", [email], function(account){
      console.log(account);
    });
  },
  register: function(email, nick, password, callback){
    db.exists("account", "email=?", [email], function(exists){
      if (exists){
        if (callback) callback(new Error('['+email+'] 已经存在.'));
      } else {
        var salt = utils.genSalt();
        var newPassword = utils.genPassword(password, salt);
        var account = {salt:salt, email: email, nick: nick, password: newPassword};
        console.log(account);
        var account = db.save("account", account, function(err, account){
          if (callback) callback(err, account);
        });        
      }
    });
  }
}

module.exports = Account;

/*
AccountService.register("cloudbeer@gmail.com", "Cloudbeer", "zhwell", function(account){
  console.log(account);
});
*/