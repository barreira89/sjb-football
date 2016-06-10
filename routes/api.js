var express = require('express');
var router = express.Router();
var Accounts = require('../models/account');
var Picks = require('../models/picks');
var accountFieldFilter = {salt:0,hash:0, __v: 0};
var users = require('./users2');
var picksRoutes = require('./picks');
var gameRoutes = require('./games');
var logoRoutes = require('./logos');


router.use('/users', users);
router.use('/picks', picksRoutes);
router.use('/games', gameRoutes);
router.use('/logos', logoRoutes);

module.exports = router;
	