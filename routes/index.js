var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Picks = require('../models/picks');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Football Pickem'
    });
});

//Account & User Actions
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!',
                user: user
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.post('/register', function(req, res) {
    Account.register(new Account({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function(err, account) {
        if (err) {
            return res.status(400).send(err);
        }
        passport.authenticate('local')(req, res, function() {
            res.status(200).json({
                status: "user was successfully created",
                user: account
            });
        });
    });
})
module.exports = router;
