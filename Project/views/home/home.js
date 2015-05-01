app.controller("MyStuffsApiController", function ($scope, $http) {
   


    //searching function using api
    $scope.searchTitle = function () {
        $http.jsonp("http://api.walmartlabs.com/v1/search?query=" + $scope.titleSearch + "&format=json&apiKey=ad2t54yazebf3w5awjzubtbt&callback=JSON_CALLBACK")
            .success(function (response) {
                $scope.stuffs = response;
            });
    }



});