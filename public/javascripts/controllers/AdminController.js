app.controller('AdminController', ['$scope', 'users', 'auth', '$location', 'schedule', '$uibModal', function ($scope, users, auth, $location, schedule, $uibModal) {
	schedule.getSchedule()
		.success(function(data) {
			$scope.schedule = data;
		})
			
	$scope.getScheduleByWeek = function (week){
		console.log(week);
		schedule.getScheduleByWeek(week)
			.success(function(data){
			$scope.games = data;
		})
	}
	
	$scope.test = function(gameId){
		return schedule.getGameById(gameId);
	}
	
	open = function (){
		var modalInstance = $uibModal.open({
			templateUrl: 'public/views/modal.html',
			controller: 'modalInstanceCtrl',
			scope: $scope			
		});	
	}
		
	$scope.submit = function(games,week){
		userGames = games[0];
		console.log("Admin:" + auth.isAdmin());
		schedule.updateSchedule(userGames,week).success(function(data){
			$scope.submitted = "Submitted Update For Week " + week + " | " + numberOfGamesPicked(userGames) + " Games";
			open();
		}).error(function(err){
			console.log(err);
		})
	}
	
	
	numberOfGamesPicked = function (userPicks) {
		var count = 0;
		userPicks.games.forEach(function (game) {
			if (game.winner) {
				count += 1;
			}
		})
		return count;
	}
		
	$scope.updateGame = function(gid, gameData){
		var game = getGameById(gid);
		game.winner = gameData.gameWinner;
		game.homescore = gameData.homescore || 0;
		game.visitscore = gameData.visitscore || 0;
		
	}
	
	function getGameById(gid){
		var games = $scope.games[0].games;
		for (game in games){
			if (games[game].gid == gid){
				return games[game];				
			}
		}
	}

}])
.controller('testController', function ($scope) {
	//$scope.currentGame = {};

	$scope.$watch('game', function (newValue, oldValue) {
		if ($scope.game.homescore > $scope.game.visitscore) {
			$scope.game.winner = 'home';
		}
		if ($scope.game.visitscore > $scope.game.homescore) {
			$scope.game.winner = 'visitor';
		}
		//$scope.updateGame($scope.game.gid, $scope.game);
	}, true)

})
.controller('modalInstanceCtrl', function ($scope, $uibModalInstance) {
	$scope.ok = function () {
		$uibModalInstance.close();
	};
});