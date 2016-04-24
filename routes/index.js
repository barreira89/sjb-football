var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Picks = require('../models/picks');
var Schedule = require('../models/schedule');
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title : 'Football Pickem'
	});
});

router.get('/react', function (req, res, next) {
	res.render('react');
});

router.get('/userlist', function (req, res) {
	var db = req.db;
	var collection = db.get('accounts');

	collection.find({}, function (e, docs) {
		res.send(docs);
	});
});

router.post('/winners', function (req, res) {
	// Set our internal DB variable
	var userPicks = req.body.picks;
	var week = req.body.week;
	var username = req.body.username;

	var picks = new Picks({
			username : username,
			week : week,
			picks : userPicks
		});

	var query = {
		username : username,
		weekNumber : week
	};

	obj = picks.toObject();
	delete obj._id;
	console.log("Object:" + obj);

	Picks.findOneAndUpdate(query, obj, {
		upsert : true
	}, function (err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.send(doc);
		}
	});
});

//Account & User Actions

router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return res.status(500).json({
				err : err
			});
		}
		if (!user) {
			return res.status(401).json({
				err : info
			});
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(500).json({
					err : 'Could not log in user'
				});
			}
			res.status(200).json({
				status : 'Login successful!'
			});
		});
	})(req, res, next);
});

router.get('/logout', function (req, res) {
	req.logout();
	res.status(200).json({
		status : 'Bye!'
	});
});

router.post('/register', function (req, res) {
	Account.register(new Account({
			username : req.body.username,
			email : req.body.email
		}), req.body.password, function (err, account) {
		if (err) {
			return res.status(400).send(err);
		}
		passport.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});
})

router.get('/logos', function (req, res) {
	var db = req.db;
	var collection = db.get('logos');

	collection.find({}, function (e, docs) {
		res.send(docs);
	});
});

router.get('/picks', function (req, res) {
	Picks.aggregate([{
				$group : {
					_id : "$username",
					picks : {
						$push : "$$ROOT"
					}
				}
			}, {
				$project : {
					_id : 1,
					picks : {
						picks : 1,
						week : 1
					}
				}
			}
		], function (err, docs) {
		if (err) {
			res.send(500);
		} else {
			res.json(docs);
		}
	})

})

module.exports = router;