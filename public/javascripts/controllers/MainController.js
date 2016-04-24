app.controller('MainController', ['$scope', 'schedule', 'auth', 'users', function($scope, schedule, auth, users){	
	$scope.weekSchedule = {};
	$scope.games = {};
	$scope.checked = false;
	
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
	
	users.getUser($scope.userName).success(
		function(data){
			$scope.use = data;
			setParentUser(data);
		}
	)
	
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
		$scope.model.userPicks = users.getUserPicksByWeek($scope.use, week);
		
		for(x in $scope.schedule){
			var curWeek = $scope.schedule[x].weekNumber;
			if (curWeek == week.weekNumber){
				$scope.model.weekSchedule = $scope.schedule[x];
			}
		}
	}
}]);
