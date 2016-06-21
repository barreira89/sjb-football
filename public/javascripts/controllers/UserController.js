app.controller('UserController', ['$scope', 'users', 'util','$location', 'leagues', 'picks', function ($scope, users, util, $location, leagues, picks) {
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
        $scope.userModel.winTotal = picks.winCalculation($scope.userModel);
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
