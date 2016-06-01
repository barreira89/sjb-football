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
pickServices.groupPicksByWeek = function (picks){
	var output = [];
	
	var mapped = {}
	picks.forEach(function (obj) {
		if (!mapped[obj.week]) 	mapped[obj.week] = [];
		
		mapped[obj.week].push(obj);
	})
	
	for (x in mapped){
		output.push({week: x, picks: mapped[x]})
	}
	
	return output;
}

pickServices.getPicksByUsernameAndWeek = function (username, week){
	return $http({
			method: 'GET',
			url: '/api/picks' + '?username=' + username +'&'+'week=' + parseInt(week)
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

 return pickServices;
}]);