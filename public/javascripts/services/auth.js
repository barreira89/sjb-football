app.factory('auth', ['$q', '$timeout', '$http', function($q, $timeout, $http) { 
  var authservices = {};
  var un = null;
  
  var user = null;
  
  authservices.isLoggedIn = function(){
	  if (user){
		  return true;
	  } else {
		  return false;
	  }
  }
  
  authservices.getUser = function (){
	  return un;
  }
  
  authservices.getUserStatus = function (){
	  return user;  
  }
  
  authservices.login = function (username, password) {
  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/login', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
        un = username;
		deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}
  
  authservices.register = function (username, password, email){
  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/register', {username: username, password: password, email: email})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject(data);
    });

  // return promise object
  return deferred.promise;

  }
 
  authservices.logout = function () {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}
 
 return authservices;
}]);