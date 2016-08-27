app.factory('users', ['$http', '$q', function($http, $q) {
    var userservices = {};

    userservices.getUsers = function() {
        return $http({
            method: 'GET',
            url: '/users'
        })
    }

    userservices.getUser = function(username) {
        return $http({
            method: 'GET',
            url: '/api/users?username=' + username
        })
    }

    userservices.updateUser = function(userId, userData){
      return $http({
        method: 'PUT',
        url: '/api/users/' + userId,
        data: userData
      })
    }

    userservices.getUserPicks = function(username, season) {
        var seasonQuery = '';
        if(season){
          seasonQuery = '&season=' + season;
        }

        return $http({
            method: 'GET',
            url: '/api/picks/' + '?username=' + username + seasonQuery
        })
    }

    userservices.getUserPicksByWeek = function(userdata, week) {
        var userPicks = userdata.picks;
        var weekPicks = {};
        userPicks.forEach(function(pick) {
            if (pick.week == week.weekNumber) {
                weekPicks = pick.picks
            }
        })
        return weekPicks;
    }

    userservices.getUserModel = function(userId) {
        return $http({
            method: 'GET',
            url: 'api/users/' + userId + '/picks'
        })
    }

    return userservices;
}]);
