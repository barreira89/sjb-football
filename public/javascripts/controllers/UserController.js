app.controller('UserController', ['$scope', 'users', '$location', function($scope, users, $location){
	$scope.userlist = {};
	
	users.getUsers().success(function (data){
		$scope.userlist = data;
	});
	
}]);
