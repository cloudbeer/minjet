var AccountService = require('../services/AccountService');

var Account = {
  login: function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    AccountService.login(email, password, function(err, account){ 
      if (err) {
        res.send({code: 0, error: err.message});
        return;
      }     
      req.session.user = account;
      res.send({code: 1});
      
    });
  },
  register: function(req, res){
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
  },
  listByNick: function(req, res){
    var key = req.params.nick;
    AccountService.listByNick(key, function(err, accounts){
      if (err){
        res.send({code: 0, error: err.message});
      }else{
        res.send({code: 1, data: accounts});
      }
    })
  },
  findByNick: function(req, res){
    var key = req.params.nick;
    AccountService.findByNick(key, function(err, account){
      if (err){
        res.send({code: 0, error: err.message});
      }else{
        res.send({code: 1, data: account});
      }
    })
  }
};

module.exports = Account;

/*
AccountService.register("cloudbeer@gmail.com", "Cloudbeer", "zhwell", function(account){
  console.log(account);
});
*/


