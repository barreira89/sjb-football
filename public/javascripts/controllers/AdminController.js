app.controller('AdminController', ['$scope', 'users', '$location', 'schedule', function ($scope, users, $location, schedule) {
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
	
	$scope.submit = function(pl,wk){
		pay = pl[0]
		schedule.updateSchedule(pay,wk).success(function(data){
			console.log("updated week: " + wk);
		}).error(function(err){
			console.log(err);
		})
	}
	
	$scope.$watchCollection('weeks', function(oldValue, newValue){
		console.log("visitor score watch");
	},true)
	

}])
.controller('testController', function($scope){
	console.log("Test Controller");
	$scope.$watch('team.score', function(oldValue, newValue){
		console.log("testController watch");		
	})
});
