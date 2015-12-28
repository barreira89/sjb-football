var app = angular.module('Football', ['ui.bootstrap', 'ngRoute']);
app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'MainController', 
      templateUrl: 'public/views/pickem.html' 
    })
	.when('/login', {
		controller: 'LoginController',
		templateUrl: 'public/views/login.html'
	})
	.when('/register', {
		controller: 'LoginController',
		templateUrl: 'public/views/register.html'
	})
	.when('/users', {
		controller: 'UserController',
		templateUrl: 'public/views/userlist.html'
	})
	.otherwise({ 
      redirectTo: '/' 
    }); 
});

