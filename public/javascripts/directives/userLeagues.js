app.directive('userLeagues', function(){
	return {
		restrict: 'E',
		scope: {
			leagues: '=',
			username: '='
		},
		templateUrl: 'public/javascripts/directives/userLeagues.html'
}});
