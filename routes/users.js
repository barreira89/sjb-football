var express = require('express');
var router = express.Router();
var Accounts = require('../models/account');
var Picks = require('../models/picks');
var Schedules = require('../models/schedule');
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
	///console.log(userName);
	Picks.find({username:userName}, function(err, picks){
		if(err){
			res.json(err);
		} else {
			Schedules.find(function (err,schedule){
				if(err)
					return res.send(err);
				
				var lookUp = gameDetailLookUp(schedule);
				var picksWithDetails = withGameDetails(picks, lookUp);
				return res.json(picksWithDetails);
				
			})
			//res.json(picks);
		}
	})
	
})

router.get('/:username', function (req, res) {
	var user = req.params.username;

	var body = {}

	//Find the account
	Accounts.find({username : user}, accountFieldFilter, function (err, docs) {
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
					body.picks = pickDocs;
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

function withGameDetails(picks, lookUp){
	//console.log(lookUp);
	picks.forEach(function(pickObj){
		pickObj.picks.forEach(function(game){
			game.details = lookUp[parseInt(game.gameId)];
		})
	})
	return picks;
}

function gameDetailLookUp(schedule){
	var lookUp = {}
	schedule.forEach(function (weekSchedule){
		weekSchedule.games.forEach(function  (game){
			lookUp[game.gid] = game;
		})
	})
	return lookUp;
}


module.exports = router;
	