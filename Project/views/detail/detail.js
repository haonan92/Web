app.controller('DetailCtrl',
function ($scope, $http, $routeParams, $rootScope) {
    //console.log("Hello from DetailCtrl");


    // find the detail of the book using the id of that book
    $http.jsonp("http://api.walmartlabs.com/v1/search?query=" + $routeParams.itemId + "&format=json&apiKey=ad2t54yazebf3w5awjzubtbt&callback=JSON_CALLBACK")
            .success(function (response) {
                $scope.stuffs = response;
            });


    //varible for current user
    var currentUser = $rootScope.currentUser;

    //username
    username = $routeParams.username;

    //get user method
    $http.get('/api/users/' + username).success(function (response) {
        $scope.user = response;

    });


    // add this stuff to favorite 
    $scope.addToFavorites = function (stuff) {
  

        alert("you have successfully add this item to your Profile");
        $scope.isLike = true;
        $http.put('/addFavorite/' + $rootScope.currentUser.username, stuff)
        .success(function (response) {      
        });
    };
    if ($rootScope.currentUser != null) {
        // do I like this book
        $http.get("/api/isLike/" + $rootScope.currentUser.username + "/" + $routeParams.id)
        .success(function (response) {
            if (response.length != 0) {
                $scope.isLike = true;
            }
        });
    }
 



    //represent remove stuff, and unlike this stuff
    $scope.Removestuff = function (index) {
        $http.delete('/api/stuffs/' + $rootScope.currentUser.username + '/' + index)
            .success(function (response) {
                alert("you have successfully unlike this stuff");
                $scope.isLike = false;
                $scope.user = response;

        });
    }







/////////////////////////////////////////////////////////////////////////////////////////

    // add a comment to the current vehicle
    $scope.submitstuffComment = function (username, itemId, comment) {
     
       // console.log($scope.stuffComments);

        $http.post("/submitstuffComment/" + username + '/' + itemId + '/' + comment)
    	.success(function (response) {

    	    $scope.getStuffComments($routeParams.itemId);
    	});
    }


    // get comments on the current stuff
    $scope.getStuffComments = function (itemId) {
        $http.get("/getStuffComments/" + itemId)
    	.success(function (response) {
    	    $scope.stuffComments = response;
    	});
    }

    $scope.getStuffComments($routeParams.itemId);




    //remove comment by current user
    $scope.remove = function (id) {
        
        $http.delete('/api/' + id)
        .success(function (response) {
            $scope.stuffComments = response;
            alert("You have removed this comment");
        });   
    }
});