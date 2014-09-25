
var errors = require('../share/errors'); 
var AccountService = require('../services/AccountService');

var Account = {
  login_ui: function(req, res){
    res.render('account/login', {title: '登录'});
  },
  login_act: function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    AccountService.login(email, password, function(err, account){ 
      if (err.name="NotFound"){
        res.send({code: 0, error: "登录失败1"}); 
        return;
      }           
      if (err.name=="PasswordWrong"){
        res.send({code: 0, error: "登录失败2"}); 
        return;
      }
      if (err) {
        res.send({code: 0, error: err.message});
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


