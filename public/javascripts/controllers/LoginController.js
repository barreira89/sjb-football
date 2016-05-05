app.controller('LoginController', ['$scope', 'auth', '$location', function($scope, auth, $location){
	$scope.credentials = {
		username: '',
		password: ''
	};
	$scope.error=false;
		
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
		auth.register(credentials.username, credentials.password, credentials.email)
			.then(function (user){
				$location.path('#/');
			})
			.catch(function (err){
				$scope.error = true;
				$scope.errormsg = err.message;
		});	
	};
	
}]);
