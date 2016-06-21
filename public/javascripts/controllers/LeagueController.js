app.controller('LeagueController', ['$scope', 'leagues', 'users', 'picks', function ($scope, leagues, users, picks) {
    leagues.getLeagues().success(function(data){
		$scope.leagueList = data;
	});

	$scope.selectCurrentLeague = function (leagueId){
		leagues.getLeagueById(leagueId).success(function (data){
			$scope.currentLeague = data;

      leagues.getLeagueSummary(leagueId).success(function (leagueSummary){
        $scope.leagueSummary = leagueSummary;

      })
		});

		users.getUsers().success(function (data){
			$scope.userList = data;
		});
	}

	$scope.addUserToLeague = function(user){
		var lea = $scope.currentLeague.users;
		if(lea){
			if(lea.indexOf(user) < 0){
				lea.push(user);
			}
		}
	}

	$scope.removeUserFromLeague = function (user) {
		var lea = $scope.currentLeague.users;
		if (lea) {
			if (lea.indexOf(user) > -1) {
				lea.splice(lea.indexOf(user), 1);
			}
		}
	}

	$scope.submitLeague = function () {
		if ($scope.currentLeague) {
			leagues.updateLeague($scope.currentLeague._id, $scope.currentLeague).success(function () {
				console.log('updated!');
			});
		}
	}



}]);
