app.directive('userStats', function(){
	return {
		restrict: 'E',
		scope: {
			usermodel: '='
		},
		templateUrl: 'public/javascripts/directives/userStats.html'
}});