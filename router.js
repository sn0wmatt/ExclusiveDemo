var exp = require('express');
var router = exp.Router();

router.route('/')
	.get(function(req, res) {
		res.render('index');
	});

module.exports=router;