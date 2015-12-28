var express = require('express');
var Account = require('../models/account');
var Picks = require('../models/picks');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Football Pickem'});
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('accounts');
	
    collection.find({},function(e,docs){
        res.send(docs);
    });
});

router.post('/winners', function(req, res) {
    // Set our internal DB variable
    var upicks = req.body.picks;
	var week = req.body.week;
	var un = req.body.username;
	
	var picks = new Picks({
		username: un,
		week: week,
		picks: upicks
	});
	
	var query = {username: un, week: week};
	
	obj = picks.toObject();
	delete obj._id;
	console.log("Object:" + obj);
	
	Picks.findOneAndUpdate(query, obj, {upsert:true}, function (err, doc){
		if(err){
			console.log(err);
		} else {
			res.send(doc);
		}
	});
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res){
	req.logout();
	res.status(200).json({status: 'Bye!'});
});
	
router.post('/register', function(req, res){
	Account.register(new Account({username: req.body.username, email: req.body.email}), req.body.password, function (err, account){
		if (err){
			return res.status(400).send(err);
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/');
		});
	});
})

router.get('/schedules', function(req, res){
	var db = req.db;
	var collection = db.get('schedule');
	
	collection.find({}, function(e, docs){
		res.send(docs);
	});
	
});

router.get('/logos', function (req, res){
	var db = req.db;
	var collection = db.get('pics');
	
	collection.find({}, function(e, docs){
		res.send(docs);
	});
});

module.exports = router;
