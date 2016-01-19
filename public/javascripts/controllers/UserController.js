app.controller('UserController', ['$scope', 'users', '$location', 'schedule', function ($scope, users, $location, schedule) {
    $scope.userlist = {};
	
    schedule.getLogos().success(function (data) {
	  $scope.pics = data[0];	
    });
	
	
	$scope.getDetail = function(user) {
		users.getUser(user).success(function (data) {
			$scope.user = data;
			$scope.un = data.user[0].username;
			$scope.picks = data.picks;
		}).error(function (err){
			console.log(err);
		});
	};
	
	users.getUsers().success(function (data) {
		$scope.userlist = data;
	});
	
	schedule.getSchedule().success(function (data){
		$scope.schedule = data;
		$scope.glist = schedule.gamesByWeek($scope.schedule);
	})
}]);
