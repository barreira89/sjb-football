app.factory('picks', ['$http', function($http) {
 var pickServices = {};

pickServices.getPicks = function (){
	 return $http({
		 method: 'GET',
		 url: '/api/picks'
	 })
 }

pickServices.getPickById = function (pickId){
	return $http({
		method: 'GET',
		url: '/api/picks/' + pickId
	})
}

pickServices.getPicksByUsername = function (username) {
	return $http({
			method: 'GET',
			url: '/api/picks/with' + '?username=' + username
	})
}

pickServices.getPicksByUsernameAndWeek = function (username, week){
	return $http({
			method: 'GET',
			url: '/api/picks' + '?username=' + username +'&'+'week=' + parseInt(week)
	})
}

pickServices.getPicksByUserIdAndWeek = function (userid, week){
	return $http({
			method: 'GET',
			url: '/api/picks' + '?userid=' + userid +'&'+'week=' + parseInt(week)
	})
}


pickServices.updateListOfPicks = function (username, week, pickData){
	return $http({
		method: 'PUT',
		url: '/api/picks' + '?username=' + username +'&'+'week=' + parseInt(week),
		data: pickData
	})
}
pickServices.updatePick = function(pickId, pickData){
	return $http({
		method: 'PUT',
		url: '/api/picks/' + pickId,
		data: pickData
	})


}

pickServices.updateOrCreatePick = function (pickId, pickData){
	var method;
	var requestId = pickId || '';

	if(pickId){
		method = 'PUT';
		console.log(method);
	} else {
		method = 'POST';
		console.log(method);
	}

	return $http({
			method: method,
			url: '/api/picks/' + requestId,
			data: pickData
	})
}

pickServices.winCalculation = function total(userModel) {
     return (function() {
         var winCount = 0,
            totalPicks = 0;

         userModel.newPickModel.forEach(function(pick) {
              var winnerOfTheGame = pick.game && pick.game.winner || 'winnerNotSet';

              if (pick.winner == winnerOfTheGame)
                 winCount++;

             if(winnerOfTheGame !== 'winnerNotSet')
                  totalPicks++;
         })
         return {
             count: winCount,
             totalPicks: totalPicks,
             percent: (winCount / totalPicks)
         };
     })
 }
 pickServices.groupPicksByWeek = function(picks) {
     var output = [];
     var mapped = {};

     picks.forEach(function(obj) {
         mapped[obj.week] = mapped[obj.week] || [];
         obj.userResult = calculateWinner(obj);
         mapped[obj.week].push(obj);
     })

     for (key in mapped) {
         output.push({
             week: key,
             picks: mapped[key]
         });
     }

     return output;
 }

 return pickServices;

 function calculateWinner(pick) {
    return (function() {
        var gameWinner = pick.game && pick.game.winner || 'winnerNotSet';
        var result;

        if (pick.winner == gameWinner) {
            result = 'Win'
        } else {
            result = 'Loss'
        }

        return {
            gameResult: result
        }
    })
  }
}]);
