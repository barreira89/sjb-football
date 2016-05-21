app.controller('UserController', ['$scope', 'users', '$location', 'schedule', 'leagues', function ($scope, users, $location, schedule, leagues) {
    $scope.userlist = {};
	$scope.userModel = {};
	$scope.totalwins = 0;
	$scope.userModel2 = {};
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
			populateGameDetails(data.picks);
			
		}).error(function (err){
			console.log(err);
		});
		leagues.getLeaguesByUsername(user).success(function (data){
			$scope.userModel.leagues = data;
		});
	};
	
	$scope.getUserDetail = function(userId){
		users.getUserModel(userId).success(function (data){
			$scope.userModel2 = data;
			$scope.userModel2.winTotal = total($scope.userModel2);
		})
	}
	
	
	function total(userModel) {
		return (function () {
			var count = 0;
			var totalPicks = 0;
			userModel.picks.forEach(function (each) {
				each.picks.forEach(function (pick) {
					if (pick.winner == pick.details.winner)
						count++;

					totalPicks++;
				})
			})
			return {
				count : count,
				totalPicks : totalPicks,
				percent : (count / totalPicks)
			};
		})
	}

	$scope.updatePick = function (pickId, pickValues) {
		users.updatePick(pickId, pickValues).success(function(data){
			console.log(data);
		}).error(function (err){
			console.log(err);
		});
	}
	
	users.getUsers().success(function (data) {
		$scope.userlist = data;
	});
		
}]);
