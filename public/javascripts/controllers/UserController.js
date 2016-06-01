app.controller('UserController', ['$scope', 'users', '$location', 'schedule', 'leagues', 'picks', function ($scope, users, $location, schedule, leagues, picks) {
    $scope.userlist = {};
	$scope.userModel = {};	
		
	$scope.getUserDetail = function(userId){
		users.getUserModel(userId).success(function (data){
			$scope.userModel = data;
			$scope.userModel.winTotal = total($scope.userModel);
			leagues.getLeaguesByUsername($scope.userModel.username).success(function(data){
				$scope.userModel.leagues = data;
			})
			picks.getPicksByUsername($scope.userModel.username).success(function(data){
				$scope.userModel.newPickModel = data;
				$scope.userPicksByWeek = picks.groupPicksByWeek(data);
			})
		})
	}
	
	$scope.removeUserFromLeague = function(userName, league){
		//remove username from league
		$scope.userModel.leagues.splice($scope.userModel.leagues.indexOf(league, 1));	
		
		leagues.removeUserFromLeague(userName, league).success(function (data){
			
		})
		
	}
	
	function total(userModel) {
		return (function () {
			var count = 0;
			var totalPicks = 0;
			// userModel.picks.forEach(function (each) {
				// each.picks.forEach(function (pick) {
					// if (pick.winner == pick.details.winner)
						// count++;

					// totalPicks++;
				// })
			// })
			return {
				count : count,
				totalPicks : totalPicks,
				percent : (count / totalPicks)
			};
		})
	}

	$scope.updatePick = function (pickId, pickValues) {
		picks.updatePick(pickId, pickValues).success(function(data){
			console.log(data);
		}).error(function (err){
			console.log(err);
		});
	}
	
	users.getUsers().success(function (data) {
		$scope.userlist = data;
	});
		
}]);
