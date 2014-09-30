var crypto = require('crypto');
var errors = require('./errors');

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
  }

};

module.exports = Utils;