var app = angular.module("bookApp", []);
app.controller("bookCtrl", function($scope,$http) {
    $scope.b ={

    };
    $scope.books = [];
    init =function(){
        $scope.getData();
    }
   

    $scope.getData = function(){
        $http({
            method: 'GET',
            url: 'http://localhost:3001'
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.books = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    $scope.add = function(){
 
        let d = {
            "bookName": $scope.data.bookName,
            "bookAuthor":$scope.data.bookAuthor,
            "copies":$scope.data.copies,
            "edition":$scope.data.edition,
            "isbn":$scope.data.isbn
        }
        $http({
            method: 'POST',
            url: 'http://localhost:3001/create',
            headers: {"Content-Type": "application/json"},
            data: d
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    $scope.edit = function(id){
        console.log(id);
        var data1 =  $scope.books.filter(function(el){
            return el._id===id;
        })[0];
        let d = {
            "bookName": data1.bookName,
            "bookAuthor":data1.bookAuthor,
            "copies":data1.copies,
            "edition":data1.edition,
            "isbn":data1.isbn
        }
        $http({
            method: 'PUT',
            url: 'http://localhost:3001/update/'+id,
            headers: {"Content-Type": "application/json"},
            data: d
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.delete = function(id){
        console.log(id);
        $http({
            method: 'DELETE',
            url: 'http://localhost:3001/delete/'+id
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    init();
});