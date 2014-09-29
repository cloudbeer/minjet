var crypto = require('crypto');

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
  isLogin: function (req, res, isAjax, back) {
    if (req.session.user) {
      return true;
    }
    back = back || req.originalUrl;
    if (isAjax) {
      res.send({code: 0, error: '没有登录', back: back});
    }else{
      res.redirect('/login?back=' + encodeURIComponent(back));
    }
    return false;
  }

};


module.exports = Utils;