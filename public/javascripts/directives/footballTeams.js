app.directive('footballTeams', ['schedule', 'users', function(schedule, users){
	return {
		restrict: 'E',
		scope:false,
		templateUrl: 'public/javascripts/directives/footballTeam.html',
		link: function(scope, element, attrs){
			
			scope.reset = function (){
				console.log(scope.games);
				scope.model.userPicks = {};				
			}
			
			scope.submit = function (){
				if(scope.model.userName){
					var picksRequest = {
						picks: scope.model.userPicks,
						username: scope.model.userName,
						week: scope.model.weekSchedule.weekNumber,
					};
					schedule.postWinners(picksRequest);
					scope.submitted = "Submitted " + numOfPicks(picksRequest.picks) + " picks for week " + picksRequest.week;
				}
				refreshUser();
			}
			
			refreshUser = function(){
				users.getUser(scope.model.userName).success(
					function(data){
						scope.use = data;
				});
			}
			
			numOfPicks = function(data){
				if(data){
					return Object.keys(data).length;
				}else{
					return 0;
				}
			}
		}

}}]);