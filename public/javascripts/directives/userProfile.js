app.directive('userProfile', function(){
	return {
		restrict: 'E',
		scope: {
			profile: '='
		},
		templateUrl: 'public/javascripts/directives/userProfile.html'
}});
