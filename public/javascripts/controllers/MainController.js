app.controller('MainController', ['$scope', 'schedule', 'auth', 'users', function($scope, schedule, auth, users){	
	$scope.result = {};
	$scope.games = {};
	$scope.checked = false;
	
	$scope.un = auth.getUser();
		
	users.getUser($scope.un).success(
		function(data){
			$scope.use = data;
		}
	)
	
	schedule.getSchedule().success(
		function(data){
			$scope.schedule = data;
		}
	);
		
	schedule.getLogos().success(
		function(data){
			$scope.pics = data[0];
		}
	);
	
	$scope.refreshUser = function(){
		users.getUser($scope.un).success(
			function(data){
				$scope.use = data;
			}
		)
	}
	
	$scope.getByWeek = function(week){
		$scope.games = {};
		$scope.results.week = week;
		console.log($scope.use);
		$scope.pickos = users.getUserPicksByWeek($scope.use, week);
		console.log($scope.pickos);
		for(x in $scope.schedule){
			var curr = $scope.schedule[x].Week;
			if (curr==week.Week){
				$scope.result = $scope.schedule[x];
			}
		}
	}
}]);
