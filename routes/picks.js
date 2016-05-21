var express = require('express');
var router = express.Router();
var Picks = require('../models/picks');
var Accounts = require('../models/account');

router.get('/', function (req, res) {
	var query = buildQuery(req);	
	
	Picks.find(query, function (err, docs){
		if (err) return res.sendStatus(404);
		
		return res.json(docs);
	});
})

router.post('/', function (req, res) {
	var mappedPick = bodyToPickMapper(req.body);
	newPick = new Picks(mappedPick);
	
	newPick.save(function (err, pick) {
		if (err) {
			console.log(err);
			if (err.code == 11000) {
				res.status(400).json({
					"message" : "already exists"
				});
			} else {
				res.sendStatus(500);
			}
		} else {
			res.location('api/picks/'+ pick.extId);
			res.status(201).json(pick);
		}
	})
})

router.get('/:pick_id', function (req, res){
	Picks.findOne({extId:req.params.pick_id}, {_id:0}, function (err, pick){
		if (err){
			console.log(err);
			res.sendStatus(500);
		} else {
			if(pick)
				return res.json(pick);
			
			return res.sendStatus(404);
		}
	});
})

router.put('/:pick_id', function (req, res){
	
	Picks.findOne({_id:req.params.pick_id}, function (err, pick){
		if(err){
			console.log(err);
			return res.send(err);
		} else {
			var pickObj = bodyToPickMapper(req.body);
			//if exists
			if(pick){
				console.log('Request Body--------------------');
				console.log(req.body);
				console.log('pick----------------------------');
				console.log(pick);
				console.log('pickObj ------------------------');
				console.log(pickObj);
				
				pick.username = pickObj.username;
				pick.week = pickObj.week;
				pick.userId = pickObj.userId;
				pick.picks = pickObj.picks;
				
				pick.save(function(err, doc){
					if(err){
							console.log("Error Saving Update");
						return res.send(err);
					}
					
					return res.json(doc);
				});
			} else {
				newPick = new Picks(pickObj);
				newPick.extId = req.params.pick_id;
				newPick.save(function (err, newDoc) {
					if(err) return res.send(err);
					
					return res.status(201).json(newPick);
					
				})
			}
		}
	})
})

module.exports = router;

function buildQuery (request){
	var query = {}
	
	if (request.query.username){
		query.username = request.query.username;
	}
	if (request.query.userid){
		query.userId = request.query.userid;
	}
	if(request.query.week){
		query.week = request.query.week
	}
	
	return query;
}


function bodyToPickMapper(requestBody) {
	return {
			username : requestBody.username,
			week : requestBody.week,
			picks: requestBody.picks,
			userId: requestBody.userId
		}
}
