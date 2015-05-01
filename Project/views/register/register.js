app.controller("RegisterCtrl", function ($scope, $http, $location, $rootScope) {

    console.log("Hello from RegisterCtrl");


    //register method
    $scope.register = function (user) {
        console.log(user);
        if (user.password != user.password2 || !user.password || !user.password2) {
         alert("Your passwords don't match");
           
            return;
      
        }
        else {
            $http.post("/register", user)
            .success(function (response) {
                if (response == "user already exists") {
                    alert("user already exists!!");
                }
                if (response != null && response != "user already exists") {
                    $rootScope.currentUser = response;
                    console.log($rootScope.currentUser);
                    $location.url("/profile");
                  
                }
            });
        }
    }













});

