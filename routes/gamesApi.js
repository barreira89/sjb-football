var Games = require('../models/games');
var mongoose = require('mongoose')
const aggregateQuery = [{
    $group: {
        _id: null,
        weeks: {
            $addToSet: "$weekNumber"
        }
    }
}]

var gamesApi = {
    getWeekList: (callback) => {
        Games.aggregate(
            aggregateQuery,
            function (err, docs) {
                if (err)
                    return callback(err, null);

                return callback(docs);
            });
    },
    updateListOfGames: (listOfGames, callback) => {
        var numberOfGames = listOfGames.length;
        var recordsProcessed = 0;
        var results = [];

        listOfGames.forEach((game, index) => {
            game._id = game._id || new mongoose.mongo.ObjectID();

            Games.findOneAndUpdate({
                    _id: game._id
                }, game, {
                    upsert: true,
                    new: true
                },
                (err, doc) => {
                    err ? results.push(err) : results.push(doc);
                    recordsProcessed++;

                    if (recordsProcessed == numberOfGames) {
                        return callback(null, results)
                    }
                })
        })
    }
}

module.exports = gamesApi;
