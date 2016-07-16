var app = angular.module('Football', ['ui.bootstrap', 'ngRoute']);
app.constant('USER_ROLES',{
  all: '*',
  admin: 'admin',
  user: 'user'
});
app.config(['$routeProvider', 'USER_ROLES',  function ($routeProvider, USER_ROLES) {
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
	.otherwise({
      redirectTo: '/',
      data: {authorizedRoles: [USER_ROLES.all]}
    });
}]);
app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});
app.run(function ($rootScope, AUTH_EVENTS, auth){
  $rootScope.$on('$routeChangeStart', function (event, next){
    var authorizedRoles = next.data.authorizedRoles;
      if(!auth.isAuthorized(authorizedRoles)){
        event.preventDefault();
      };
  })
})
