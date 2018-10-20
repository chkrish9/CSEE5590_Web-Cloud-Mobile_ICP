var app = angular.module("bookApp", []);
app.controller("bookCtrl", function($scope,$http) {
    //Delclaring the books variable.
    $scope.books = [];
    $scope.isEdit = false;
    //init function will call on book.js load. This method will call the get method to fetch the records.
    init =function(){
        $scope.getData();
    }
   
    //In this method will make a get request to node api to get all records. 
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

    //In this method will make a post request to node api to add a record. 
    $scope.add = function(){
        let book = {
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
            data: book
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    //This method will call when user clicks on edit button. In this method we are setting the isEdit to true. 
    $scope.edit = function(){
        $scope.isEdit = true;
    }

    //This method will call when user clicks on cancel button. In this method we are setting the isEdit to false.
    $scope.cancel = function(){
        $scope.isEdit = false;
    }

    //In this method will make a put request to node api to update a record.
    $scope.editsave = function(id){
        console.log(id);
        var data =  $scope.books.filter(function(el){
            return el._id===id;
        })[0];
        let book = {
            "bookName": data.bookName,
            "bookAuthor":data.bookAuthor,
            "copies":data.copies,
            "edition":data.edition,
            "isbn":data.isbn
        }
        $http({
            method: 'PUT',
            url: 'http://localhost:3001/update/'+id,
            headers: {"Content-Type": "application/json"},
            data: book
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.isEdit = false;
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    //In this method will make a delete request to node api to delete a record.
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

    //Calling the inti method.
    init();
});