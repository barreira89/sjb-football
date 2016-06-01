app.directive('gamePanel', ['schedule', 'picks', function(schedule, picks){
	var controller = ['$scope', function ($scope){
		
		function init(){
			//console.log($scope.game.pickModel);
			
			// if (!$scope.game.pickModel) {
				// $scope.game.pickModel = {
					// game : $scope.game._id,
					// userId : $scope.userModel._id,
					// weekNumber : $scope.game.weekNumber
				// }
			// }
			
			if($scope.userModel.pickModel){
				$scope.userModel.pickModel.push($scope.game.pickModel)
			} else {
				$scope.userModel.pickModel = [];
				$scope.userModel.pickModel.push($scope.game.pickModel);
			}
		}
		
		$scope.updatePick = function (pickId, pickData){
			picks.updateOrCreatePick(pickId, pickData).success(function (data){
				console.log(data);
			}).error(function (err){console.log(err);})
		}
		
		
		//findPickById
		
		init()
		
	}]
	
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'public/javascripts/directives/gamePanel.html',
		controller: controller,
		link: function(scope, element, attrs){
			// scope.pickModel = {
				// game: scope.game._id,
				// userId: scope.userModel._id,
				// weekNumber: scope.game.weekNumber
			// }
		}
}}]);