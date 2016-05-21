app.controller('MainController', ['$scope', 'schedule', 'auth', 'users', 'games', 'picks', function($scope, schedule, auth, users, games, picks){	
	$scope.weekSchedule = {};
	$scope.games = {};
	$scope.checked = false;
	$scope.currentGames = {};
	
	$scope.userModel = {}
	users.getUserModel('56845b9e078625601cf27dfa').success(function(data){
		$scope.userModel = data;
	})
	
	picks.getPicksByUsername('thy').success(function (data){
		//$scope.picks = data;
	})
	picks.getPicksByUsernameAndWeek('thy',2).success(function (data){
		$scope.picks = data;
	})
	
	//create pick model
	//For each game, find pick 
	
	$scope.attachUserPick = function (game, pickModel){	
		pickModel.forEach(function(pick){
			pick.picks.forEach(function(pick){
				if(pick.game == game._id){
					console.log(pick);
					game.pickModel = pick;
				}	
			})
		})
	}
	//attach current picks to game by Id
	
	
	
	games.getGames().success(function (gameList){
		$scope.gameList1 = gameList;
	})
	
	this.getCurrentWeekGames = function (currentWeek){
		games.getGamesByWeek(currentWeek).success(function(gameList){
			$scope.currentGames = gameList;
		})	
	}
	
	//Model for Main Controller class
	$scope.model = {
			games : {},
			weekSchedule : {},
			checked: false,
			userName: auth.getUser(),
			userPicks: {}
		 }
	
	$scope.userName = auth.getUser();
	
	schedule.getLogos().success(
		function(data){
			$scope.pics = data[0];
		}
	)
	
	if ($scope.userName) {
		users.getUser($scope.userName).success(
			function (data) {
			$scope.use = data;
			setParentUser(data);
		})

	}
	
	schedule.getSchedule().success(
		function(data){
			$scope.schedule = data;
		}
	);
	
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
	
	this.getByWeek = function(week){
		$scope.games = {};
		$scope.weekSchedule.weekNumber = week;
		
		if ($scope.use){
			userPicks(week);
		}
		
		for(x in $scope.schedule){
			var curWeek = $scope.schedule[x].weekNumber;
			if (curWeek == week.weekNumber){
				$scope.model.weekSchedule = $scope.schedule[x];
			}
		}
	}
	
	function userPicks(week){
		$scope.model.userPicks = users.getUserPicksByWeek($scope.use, week);	
	}
}]);
