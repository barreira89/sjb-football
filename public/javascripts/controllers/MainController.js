app.controller('MainController', ['$scope', 'schedule', 'auth', 'users', 'games', 'picks', 'util', function($scope, schedule, auth, users, games, picks, util){
	$scope.weekSchedule = {};
	$scope.games = {};
	$scope.checked = false;
	$scope.currentGames;

	var accountModel = auth.getUser();

	$scope.userModel = {}
	games.getWeekList().success(function (data){
		console.log(data);
		$scope.weekList = data[0].weeks;
	})

	/**
		1. User Selects Week
			getGamesByWeek
			if user, get user picks by week
		2. Display Games (if user is logged in, display with picks)
	*/

	this.getCurrentWeekGames = function (currentWeek) {
		//get list of games for this week, assign to currentGames

		games.getGamesByWeek(currentWeek).success(function (gameList) {

			//Current games = games where week = selected week
			$scope.currentGames = gameList;

			//Get User Model by User Id
			if(accountModel){
				users.getUserModel(accountModel.id).success(function (data) {
					$scope.userModel = data;

					//TODO Update with userId instead of username

					picks.getPicksByUsernameAndWeek(accountModel.username, currentWeek).success(function (data) {
						$scope.userModel.pickModel = data;
						util.attachUserPicksToGames(gameList, $scope.userModel);
					})
					// picks.getPicksByUserIdAndWeek(accountModel.id, currentWeek).success(function (data) {
						// $scope.userModel.pickModel = data;
						// util.attachUserPicksToGames(gameList, $scope.userModel);
					// })
				});
			}
		})
	}

	$scope.userName = accountModel && accountModel.username || 'Guest';

	$scope.updatePicks = function(username, week, pickData){
		var gameList = $scope.currentGames
		var userPicks = util.gatherUserPicks($scope.currentGames);

		picks.updateListOfPicks(username, week, userPicks).success(function (data){
			console.log('success');
			$scope.userModel.pickModel = data;
			util.attachUserPicksToGames(gameList, $scope.userModel);
		}).error(function(err){
			console.log(err);
		});
	}

	schedule.getLogos().success(
		function(data){
			logoLookUp = {}
			data.map(function(logoRecord){
				logoLookUp[logoRecord.team] = logoRecord.logo;
			});
			//$scope.pics = data[0];
			$scope.pics = logoLookUp;
		}
	)

	if ($scope.userName) {
		users.getUser($scope.userName).success(
			function (data) {
			$scope.use = data;
			setParentUser(data);
		})
	}

	setParentUser = function (userData){
			var username = userData.user[0] && userData.user[0].username;
			if(username) $scope.$parent.$root.masterUserName = username;
	}

	this.refreshUser = function(){
		users.getUser($scope.userName).success(
			function(data){
				$scope.use = data;
			}
		)
	}

}]);
