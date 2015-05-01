app.controller('ProfileCtrl', function ($scope, $http, $rootScope, $routeParams) {

    
    //current user 
    var currentUser = $rootScope.currentUser;


    //represent username
    username = $routeParams.username;

    //get user method
    $http.get('/api/users/' + username).success(function (response) {
        $scope.user = response;
      
    });


    //remove the stuff that you like
    $scope.Removestuff = function (index) {
        $http.delete('/api/stuffs/' + username + '/' + index).success(function (response) {
        
            $scope.user = response;
          
        });
    }


    //remove the follower
    $scope.RemoveFollower = function (index) {
        $http.delete('/api/follower/' + currentUser.username + '/' + index).success(function (response) {
            $scope.user = response;
        });
    }



    //remove the following person
    $scope.RemoveFollowing = function (index) {
        $http.delete('/api/following/' + currentUser.username + '/' + index).success(function (response) {
            $scope.user = response;
        });
    }

   
    //follow this person
    $scope.follow = function () {
        var person = $scope.person;
        $http.post('/api/follow/' + currentUser.username + '/' + person)
            .success(function (response) {
                $scope.user = response;
               // console.log(username);
               // console.log(person);
            })
            .error(function (err) {
            alert("This user doesn't exist. (Don't follow yourself!)");
        });
    }


    //follow this user by click button
    $scope.followUser = function () {
        var person = $scope.user.username;
        $http.post('/api/follow/' + currentUser.username + '/' + person)
            .success(function (response) {
                $scope.user = response;
                 console.log(username);
                 console.log(person);
            })
            .error(function (err) {
                alert("This user doesn't exist. (Don't follow yourself!)");
            });
    }



    //check the following person
    $scope.checkFollow = function (follow) {
        $http.get('/api/users/' + follow).success(function (response) {
            $scope.user = response;
          
        });
    }




});