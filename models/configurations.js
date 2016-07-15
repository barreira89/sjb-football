var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Configurations = new Schema({
   currentSeason: Number,
   configName: String
});

module.exports = mongoose.model('Configurations', Configurations);
