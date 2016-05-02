app.controller('LeagueController', ['$scope', 'leagues', 'users', function ($scope, leagues, users) {
    leagues.getLeagues().success(function(data){
		$scope.leagueList = data;
	});
	
	$scope.selectCurrentLeague = function (leagueId){
		leagues.getLeagueById(leagueId).success(function (data){
			$scope.currentLeague = data;
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
	
}]);
