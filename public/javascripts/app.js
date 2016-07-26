var app = angular.module('Football', ['ui.bootstrap', 'ngRoute', 'ui.router']);
app.constant('USER_ROLES',{
  all: '*',
  admin: 'admin',
  user: 'user'
});
/*app.config(['$routeProvider', 'USER_ROLES',  function ($routeProvider, USER_ROLES) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'public/views/pickem.html',
	    controllerAs: 'mctrl',
      data: {authorizedRoles: [USER_ROLES.all]}
    })
	.when('/login', {
		controller: 'LoginController',
		templateUrl: 'public/views/login.html',
    data: {authorizedRoles: [USER_ROLES.all]}
	})
	.when('/register', {
		controller: 'LoginController',
		templateUrl: 'public/views/register.html',
    data: {authorizedRoles: [USER_ROLES.all]}
	})
	.when('/users', {
		controller: 'UserController',
		templateUrl: 'public/views/userlist.html',
    data: {authorizedRoles: [USER_ROLES.all]}
	})
	.when('/users/details', {
		controller: 'UserController',
		templateUrl: 'public/views/userdetail.html',
    data: {authorizedRoles: [USER_ROLES.all]}
	})
	.when('/admin', {
		controller: 'AdminController',
		templateUrl: 'public/views/admin.html',
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
	})
	.when('/leagues', {
		controller: 'LeagueController',
		templateUrl: 'public/views/leagues.html',
    data: {authorizedRoles: [USER_ROLES.all]}
	})
  .when('/profile', {
		controller: 'ProfileController',
		templateUrl: 'public/views/profile.html',
    data: {authorizedRoles: [USER_ROLES.all]}
	})
}]);*/
app.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES){
  $stateProvider
    .state('pickem', {
        url: '/',
        controller: 'MainController',
        templateUrl: 'public/views/pickem.html',
  	    controllerAs: 'mctrl',
        data: {authorizedRoles: [USER_ROLES.all]}
      })
  	.state('login', {
  	            url: '/login',
  	            views: {
  	                '': {
  	                    templateUrl: 'public/views/login.html',
  	                    controller: 'LoginController',
                        data: {authorizedRoles: [USER_ROLES.all]}
  	                },
                    'register@login':{
                        templateUrl: 'public/views/register.html',
                        controller: 'LoginController',
                        data: {authorizedRoles: [USER_ROLES.all]}
                    }
  	            }
  	})
  	.state('login.register', {
      url: '/register',
  		controller: 'LoginController',
  		templateUrl: 'public/views/register.html',
      data: {authorizedRoles: [USER_ROLES.all]}
  	})
  	.state('users', {
  		url:'/users',
      controller: 'UserController',
  		templateUrl: 'public/views/userlist.html',
      data: {authorizedRoles: [USER_ROLES.all]}
  	})
  	.state('admin', {
      url: '/admin',
  		controller: 'AdminController',
  		templateUrl: 'public/views/admin.html',
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
  	})
  	.state('leagues', {
      url: '/leagues',
  		controller: 'LeagueController',
  		templateUrl: 'public/views/leagues.html',
      data: {authorizedRoles: [USER_ROLES.all]}
  	})
    .state('profile', {
      url: '/profile',
      views: {
        '': {controller: 'ProfileController',
      		templateUrl: 'public/views/profile.html',
          data: {authorizedRoles: [USER_ROLES.all]}}}
  	})
    $urlRouterProvider.otherwise('/');
}])
app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});
app.run(function ($rootScope, AUTH_EVENTS, USER_ROLES, auth){
  $rootScope.$on('$stateChangeStart', function (event, next){
    var authorizedRoles = next.data && next.data.authorizedRoles || USER_ROLES.all  ;
      if(!auth.isAuthorized(authorizedRoles)){
        event.preventDefault();
      };
  })
})
