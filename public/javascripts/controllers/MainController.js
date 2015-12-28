app.controller('MainController', ['$scope', 'schedule', 'auth', function($scope, schedule, auth){	
	$scope.result = {};
	$scope.games = {};
	$scope.checked = false;
	
	$scope.un = auth.getUser();
	
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
	
	$scope.winners ={
		"1": {
				"0": "Patriots",
				"1": "Packers"}
			,
		"2": {
				"0": "Broncos",
				"1": "Panthers"}
		}
	
	$scope.getByWeek = function(week){
		$scope.games = {};
		$scope.results.week = week;
		for(x in $scope.schedule){
			var curr = $scope.schedule[x].Week;
			if (curr==week.Week){
				$scope.result = $scope.schedule[x];
			}
		}
	}
}]);
