var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	if (req.session.user){
		res.render('index', { title: 'Express' });
	}else{
		res.render('account/login', {title: 'Login'});
	}
});


router.get("/register", function (req, res) {
	res.render('account/register', {title: '帐号注册'});
});



module.exports = router;
