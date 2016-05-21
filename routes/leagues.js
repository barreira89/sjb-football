var express = require('express');
var router = express.Router();
var Leagues = require('../models/leagues');
var Accounts = require('../models/account');

router.get('/', function (req, res) {
	var query = {}
	if(req.query.username){
		query = {users:req.query.username}
	}
	
	Leagues
	.find(query)
	.populate('userIds')
	.exec(function (err, docs) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(docs);
		}
	});
})

router.post('/', function (req, res) {
	var mappedLeague = bodyToLeagueMapper(req.body);
	newLeauge = new Leagues(mappedLeague);
	
	newLeauge.save(function (err, doc) {
		if (err) {
			console.log(err);
			if (err.code == 11000) {
				res.status(400).json({
					"message" : "league already exists"
				});
			} else {
				res.sendStatus(500);
			}
		} else {
			res.send(doc);
		}
	})
})

router.get('/:league_id', function (req, res){
	Leagues.findById({_id:req.params.league_id}, function (err, doc){
		if (err){
			console.log(err);
			res.sendStatus(500);
		} else {
			res.json(doc);
		}
	});
})

router.put('/:league_id', function (req, res){
	Leagues.findById({_id:req.params.league_id}, function (err, league){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else {
			league.users = bodyToLeagueMapper(req.body).users;
			league.name = bodyToLeagueMapper(req.body).name;
			
			league.save(function(err, doc){
				if(err)
					res.sendStatus(500);
				
				res.json('updated');
			});
		}
	})
})

module.exports = router;

function bodyToLeagueMapper(requestBody) {
	return {
			name : requestBody.name,
			users : requestBody.users
		}
}
