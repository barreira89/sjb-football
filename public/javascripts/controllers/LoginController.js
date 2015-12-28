app.controller('LoginController', ['$scope', 'auth', '$location', function($scope, auth, $location){
	$scope.credentials = {
		username: '',
		password: ''
	};
	$scope.error=false;
	
	console.log(auth.getUserStatus());
	
	$scope.login = function(credentials){
		auth.login(credentials.username, credentials.password)
			.then(function (){
				$location.path('#/');	
			})
			.catch(function (){
				$scope.error = true;
				$scope.errormsg = "Invalid username/password";
		});
	};
	
	$scope.register = function(credentials){
		auth.register(credentials.username, credentials.password, credentials.email).then(function (user){
			$location.path('#/');
		}, function (err){
			console.log("Error")
			$scope.errormsg = err;
		});	
	};
	
}]);
