app.directive('userProfile', ['users', function(users){
	return {
		restrict: 'E',
		scope: {
			profile: '='
		},
		link: function(scope, elm, attr) {
			scope.updateUser = users.updateUser;
		},
		templateUrl: 'public/javascripts/directives/userProfile.html'
}}]);
