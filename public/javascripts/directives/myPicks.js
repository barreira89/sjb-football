app.directive('myPicks', ['users', function(users){
	return {
		restrict: 'E',
		scope: {
			userpicks: '='
		},
		link: function(scope, elm, attr) {
		},
		templateUrl: 'public/javascripts/directives/myPicks.html'
}}]);
