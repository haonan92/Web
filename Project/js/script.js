var app = angular.module("OnlineUniversity", []);

app.controller("OnlineUniversityController",
    function ($scope, $http) {
        $http.get("/api/course")
        .success(function (response) {
            $scope.courses = response;
        });


        $(function () {
            $("#dateCreated").datepicker();
        });


        $scope.remove = function (index) {
            $http.delete('/api/course/' + index)
            .success(function (response) {
                $scope.courses = response;
                $('.delete').modal('show');
            })
        }

        //add
        $scope.add = function()
        {     
            document.getElementById("addOk").style.display = '';
            document.getElementById("editOk").style.display = 'none';
            
            $('#createCourse').modal('show');
        }


        $scope.addCourse = function (course) {
  
            $http.post('/api/course', course)
            .success(function (response) {
                $scope.courses = response;
              }); 
        }



    
       
        $scope.edit = function (index) {
            $http.get('/api/course/' + index)
            .success(function (response) {
                
                $scope.course = response;
                $scope.newCourse = $scope.course;
                $("#name").val($scope.course.name);
                $("#category").val($scope.course.category);
                $("#dateCreated").val($scope.course.dateCreated);
                $("#description").val($scope.course.description);
                document.getElementById("addOk").style.display = 'none';
                document.getElementById("editOk").style.display = '';
                
            });
            $scope.index = index;
            $('#createCourse').modal('show');
        };

        $scope.editCourse = function (newCourse) {
            $http.put('/api/course/' + $scope.index, newCourse)
            .success(function (response) {
                $scope.courses = response;
            });
        };


    });