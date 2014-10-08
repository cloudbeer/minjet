//Session


var CookieUtil = {
  getId: function(req, res){
    //req.sessoion.client_set = true;
   
    res.send({code: 1});
    console.log('....', req.session.name);
    return;
  }
};


module.exports = CookieUtil;
