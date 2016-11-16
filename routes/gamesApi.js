var Games = require('../models/games');
const aggregateQuery = [{
        $group: {
          _id: null,
          weeks: {
              $addToSet: "$weekNumber"
          }
      }
  }]
  
var gamesApi = {
    getWeekList: function(callback){
      Games.aggregate(
        aggregateQuery,
          function(err, docs) {
              if (err)
                  return callback(err, null);

              return callback(docs);
          });
    }
}

module.exports = gamesApi;
