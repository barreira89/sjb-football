app.factory('util', ['$http', function($http) {
 var utils = {};

 utils.attachUserPicksToGames = function (gameList, userModel) {
 	var userPicks = userModel.pickModel

 		if (gameList && userPicks) {
 			// console.log('loop');
 			var userPickLookUp = {}

 			userPicks.map(function (pick) {
 				userPickLookUp[pick.game] = pick;
 			})

 			gameList.forEach(function (game) {
 				var defaultGame = {
 					user : userModel._id,
 					game : game._id,
 					username : userModel.username,
 					week : game.weekNumber
 				}
 				game.userPicks = userPickLookUp[game._id] || defaultGame;
 			})
 		}
 }

 utils.gatherUserPicks = function (gameList) {
 	var userPicks = [];

 	gameList.forEach(function (game) {
 		userPicks.push(game.userPicks);
 	})

 	return userPicks;

 }

 return utils;
}]);
