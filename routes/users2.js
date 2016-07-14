var express = require('express');
var router = express.Router();
var Accounts = require('../models/account');
var Picks = require('../models/picks');
//var Schedules = require('../models/schedule');
var passport = require('passport');
var accountFieldFilter = {salt:0,hash:0, __v: 0};


/* GET users listing. */
router.get('/', function(req, res, next) {
	Accounts.find({},accountFieldFilter,function(err,docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		} else {
			return res.send(docs);
		}
	})
});

router.post('/', function(req, res, next) {
	var accountObj = accountMapper(req);

	Accounts.register(new Accounts(accountObj), req.body.password, function (err, account) {
		if (err) {
			return res.status(400).send(err);
		}
		passport.authenticate('local')(req, res, function () {
			res.location('/api/users/'+account._id);
			return res.status(200).json({
				status: "user was successfully created"
			});
		});
	});
});


router.get('/:user_id/picks', function (req, res){
	//var userName = req.params.username;
	Accounts.findById({_id:req.params.user_id}, function (err, account){
		if (err){
			return res.send(err);
		} else {
			Picks.find({username:account.username}, function(err, picks){
				if(err){
					res.json(err);
				} else {
					// 	Schedules.find(function (err,schedule){
					// 		if(err)
					// 			return res.send(err);
					//
					// 		//var lookUp = gameDetailLookUp(schedule);
					// 		//var picksWithDetails = withGameDetails(picks, lookUp);
					// 		account.picks = picks;
					//
					// })
					return res.json(account);
				}
			})
		}
	})
})

router.get('/:userid', function (req, res) {
	var userid = req.params.userid;

	//Find the account
	Accounts.findById({_id : userid}, accountFieldFilter, function (err, docs) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.json(docs);
		}
	})
});

router.put('/:userid', function (req, res) {
	var userid = req.params.userid;
	var requestAccount = {
		username: req.body.username,
		leagues: req.body.leagues,
		roles: req.body.roles
	}

	//Find the account
	Accounts.findById({_id : userid}, function (err, acct) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			acct.username = requestAccount.username;
			acct.leagues = requestAccount.leagues;
			acct.roles = requestAccount.roles;
			acct.save(function (err, updated){
				if (err) return res.sendStatus(500)

			res.json(updated);

			})
		}
	})
});


router.delete('/:userid', function(req, res){
	var userid = req.params.userid;
	var query = {_id: userid};

	Accounts.findOneAndRemove(query, function (err){
		if(err){
			console.log(err);
			res.status(400).send('Did not delete');
		} else{
			res.status(200).send('Deleted User:' + userid);
		}
	});
})

function unionArrays(values, ary) {

	values.forEach(function (value) {
		if (ary.indexOf(value) == -1) {
			ary.push(value)
		}
	})
}

function accountMapper(request) {
	return {
		username : request.body.username,
		email : request.body.email,
		leagues : request.body.leagues,
		picks : request.body.picks,
		roles : request.body.roles
	}
}

function withGameDetails(picks, lookUp){
	//console.log(lookUp);
	// picks.forEach(function(pickObj){
		// pickObj.picks.forEach(function(game){
			// game.details = lookUp[parseInt(game.gameId)];
		// })
	// })
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
