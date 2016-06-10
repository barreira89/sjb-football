var express = require('express');
var router = express.Router();
var Logos = require('../models/logos');

router.get('/', function (req, res) {
	Logos.find(function (err, docs){
		if (err) return res.sendStatus(404);
		
		return res.json(docs);
	});
})

module.exports = router;