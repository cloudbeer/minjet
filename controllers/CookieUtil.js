//Session

var CookieUtil = {
  getId: function(req, res, next){
    req.session.client_set = true;
    res.send({code: 1});
  }
};


module.exports = CookieUtil;
