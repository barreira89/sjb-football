var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
	console.log("db" + req.db);
    var collection = db.get('accounts');
	
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

module.exports = router;
	