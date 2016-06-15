app.controller('UserController', ['$scope', 'users', '$location', 'leagues', 'picks', function ($scope, users, $location,leagues, picks) {
  $scope.userlist = {};
	$scope.userModel = {};

	$scope.getUserDetail = function(userId){
		users.getUserModel(userId).success(function (data){
			$scope.userModel = data;
			leagues.getLeaguesByUsername($scope.userModel.username).success(function(data){
				$scope.userModel.leagues = data;
			})
			picks.getPicksByUsername($scope.userModel.username).success(function(data){
        //May not need to be added to scope;
        $scope.userModel.newPickModel = data;
        $scope.userModel.winTotal = total($scope.userModel);
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

  //Move to Utils?
  function total(userModel) {
	    return (function() {
	        var winCount = 0;
	        var totalPicks = 0;

	        userModel.newPickModel.forEach(function(pick) {
	            if (pick.winner == pick.game.winner)
	                count++;


	            totalPicks++;
	        })
	        return {
	            count: winCount,
	            totalPicks: totalPicks,
	            percent: (count / totalPicks)
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
