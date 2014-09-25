var utils = require('../share/utils');
var errors = require('../share/errors');
var AccountService = require('../services/AccountService');

var Account = {
  login_ui: function(req, res){
  	console.log("test");
    res.render('account/login', {title: '登录'});
  },
  login_act: function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    AccountService.login(email, password, function(err, account){
      if (err instanceof errors.NotFound){
        res.send({code: 0, error: "登录失败"}); 
        return;
      }
      if (err) {
        res.send({code: 0, error: err.message});
        return;
      }     
      var dbPassword = account.password;
      if (dbPassword!=utils.genPassword(password, account.salt)){
        res.send({code: 0, error: "登录失败"});
        return;
      }
      req.session.user = account;
      res.send({code: 1});
      
    });
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

module.exports = Account;

/*
AccountService.register("cloudbeer@gmail.com", "Cloudbeer", "zhwell", function(account){
  console.log(account);
});
*/


