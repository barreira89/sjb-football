var express = require('express');
var router = express.Router();
var Accounts = require('../models/account');
var Picks = require('../models/picks');
var accountFieldFilter = {salt:0,hash:0, __v: 0};


/* GET users listing. */
router.get('/', function(req, res, next) {
	Accounts.find({},accountFieldFilter,function(err,docs){
		if(err){
			console.log(err);
		} else {
			res.send(docs);
		}
	})
});

router.get('/:username/picks', function (req, res){
	var userName = req.params.username;
	console.log(userName);
	
	Picks.find({username:userName}, function(err, doc){
		if(err){
			res.json(err);
		} else {
			res.json(doc);
		}
	})
	
})

router.get('/:username', function (req, res) {
	var user = req.params.username;

	var body = {}

	//Find the account
	Accounts.find({
		username : user
	}, accountFieldFilter, function (err, docs) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			body.user = docs;

			//Add the picks for that user;
			Picks.find({
				username : user
			}, function (err, pickDocs) {
				if (err) {
					res.sendStatus(500);
				} else {
					res.send(body);
				}
			})
		}
	})

});


router.delete('/:username', function(req, res){
	var user = req.params.username;
	var query = {username: user};
	
	Accounts.findOneAndRemove(query, function (err){
		if(err){
			console.log(err);
			res.status(400).send('Did not delete');
		} else{
			res.status(200).send('Deleted:' + user);
		}
	});
})

module.exports = router;
	