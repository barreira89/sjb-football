var express = require('express');
var router = express.Router();
var Accounts = require('../models/account');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('accounts');
	res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
	
    collection.find({},function(e,docs){
        res.send(docs);
    });
});

router.get('/:username', function (req, res){
	var db = req.db;
	var collection = db.get('accounts');
	var coll2 = db.get('picks');
	var user = req.params.username;
	
	var body = {}
	
	collection.find({username: user}, function(e, docs){
		body.user = docs;
		//res.send(body);
		coll2.find({username: user}, function(e, doc2){
			//body.picks = [];
			//body.picks.push(doc2);
			body.picks = doc2;
			res.send(body);
		})
	});
	
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
	