var app = angular.module("Passport", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/home', {
          templateUrl: 'views/home/HomePage.html',
          controller:'MyStuffsApiController'
      })


        .when('/profile/:username', {
          templateUrl: 'views/profile/profile.html',
          controller: 'ProfileCtrl',
          resolve: {
              loggedin: checkLoggedin
          }
      })
 

        .when('/login', {
          templateUrl: 'views/login/LoginPage.html',
          controller:'LoginCtrl'
         
      })

        .when('/register', {
          templateUrl: 'views/register/Register.html',
          controller: 'RegisterCtrl'
      })

        .when('/detail/:itemId', {
          templateUrl: 'views/detail/detail.html',
          controller: 'DetailCtrl'
      })

        .otherwise({
          redirectTo: '/home'
      });
});

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    
    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
            // User is Not Authenticated
        else {
            alert( "You need to log in.");
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};



app.controller("NavCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.logout = function () {
        $http.post("/logout")
        .success(function () {
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };
});


