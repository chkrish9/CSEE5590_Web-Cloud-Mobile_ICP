var app = angular.module('restaurantApp', []);
app.controller('restaurantCtrl', function ($scope, $http) {
    $scope.txtPlace = "";
    $scope.txtFood = "";
    $scope.venues = [];
    $scope.init = function () {
        angular.element(".error").hide();
    }
    $scope.init();
    $scope.findRestaurant = function () {
        angular.element(".error").hide();
        if ($scope.txtFood !== "" && $scope.txtPlace !== "") {
            $http({
                method: 'GET',
                url: "https://api.foursquare.com/v2/venues/search?client_id=EA0USKAXOJAG3M3P2W1J1VNVGM1ZXFO2WY5BEWSC2FPG5QWR&client_secret=H3IBXZLLCW4GE1UDJ4IOP1XW1MSUAHQYVB2JPI4AA1MRAWCY&v=20160215&limit=5&near=" + $scope.txtPlace + "&query=" + $scope.txtFood
            }).then(function successCallback(response) {
                if (response.status === 200 && response.data.response.venues.length > 0) {
                    console.log(response.data.response.venues);
                    $scope.venues = response.data.response.venues;
                }
                else{
                    angular.element(".error").show();
                    angular.element("#error").html("No data found...&#9785;");
                    $scope.venues = [];
                }
            }, function errorCallback(response) {
                console.log(response);
            });
        }
        else {
            angular.element(".error").show();
            angular.element("#error").text("Please enter the details.");
            $scope.venues = [];
        }
    }

});