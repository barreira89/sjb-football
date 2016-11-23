var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Account = require('./account');

var Leagues = new Schema({
    name: {
        type: String,
        unique: true,
        index: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    users: [String],
    userIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
});

module.exports = mongoose.model('Leagues', Leagues);
