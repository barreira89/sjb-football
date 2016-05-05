app.controller('UserController', ['$scope', 'users', '$location', 'schedule', 'leagues', function ($scope, users, $location, schedule, leagues) {
    $scope.userlist = {};
	$scope.userModel = {};
	$scope.totalwins = 0;
	gameList = {};
	schedule.getGameList(function (gameListValue){
			gameList = gameListValue;
	});
	
	users.getUserPicks().success(function (data){
		$scope.allPicks = data;
	})
	
    schedule.getLogos().success(function (data) {
	  $scope.pics = data[0];	
    });
	
	$scope.getDetail = function(user) {
		users.getUser(user).success(function (data) {
			$scope.userModel.username = data.user[0].username;
			$scope.userModel.userPicks = data.picks;
			$scope.userModel.roles = data.user[0].roles;
			$scope.userModel.winsByWeek = users.getUserWins($scope.userModel.userPicks, gameList);
			
		}).error(function (err){
			console.log(err);
		});
		leagues.getLeaguesByUsername(user).success(function (data){
			$scope.userModel.leagues = data;
		});
	};
	
	//gameDetail returns game Object by gameId;
	
	$scope.gameDetail = function (gameId){
		if(gameList){
			return gameList[gameId];
		} else {
			return {};
		}
	}
	
	users.getUsers().success(function (data) {
		$scope.userlist = data;
		
	});
	
	schedule.getSchedule().success(function (data){
		$scope.schedule = data;
	})
	$scope.isWinner = function(game, winner){
		var actualWinner = gameList[game].winner;
		
		if(!actualWinner) return "No Winner Set";
		
		if (winner == actualWinner){
			return "Win";
		} else {
			return "Lose";
		}
	}
	
}]);
