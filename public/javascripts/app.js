var app = angular.module('Football', ['ui.bootstrap', 'ngRoute']);
app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'MainController', 
      templateUrl: 'public/views/pickem.html',
	  controllerAs: 'mctrl'
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
	.when('/users/details', {
		controller: 'UserController',
		templateUrl: 'public/views/userdetail.html'
	})
	.when('/admin', {
		controller: 'AdminController',
		templateUrl: 'public/views/admin.html'
	})
	.when('/leagues', {
		controller: 'LeagueController',
		templateUrl: 'public/views/leagues.html'
	})
	.otherwise({ 
      redirectTo: '/' 
    }); 
});

