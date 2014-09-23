var account = {
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
    res.send({code: 0});
  }

}
module.exports = account;