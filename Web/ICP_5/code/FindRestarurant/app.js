var app = angular.module('restaurantApp', []);
app.controller('restaurantCtrl', function ($scope, $http) {
    //Declaring the variables
    $scope.txtPlace = "";
    $scope.txtFood = "";
    $scope.venues = [];

    //This method will do initial settings.
    $scope.init = function () {
        angular.element(".error").hide();
    }

    //Calling the init method.
    $scope.init();

    /*
    * This method will call when the user clicks on Find Restaurant button.
    * In this method we will check the validations and then make a call to four squares API to get the details to restaurants.
    */
    $scope.findRestaurant = function () {
        angular.element(".error").hide();
        if ($scope.txtFood !== "" && $scope.txtPlace !== "") {
            $http({
                method: 'GET',
                url: "https://api.foursquare.com/v2/venues/search?client_id=EA0USKAXOJAG3M3P2W1J1VNVGM1ZXFO2WY5BEWSC2FPG5QWR&client_secret=H3IBXZLLCW4GE1UDJ4IOP1XW1MSUAHQYVB2JPI4AA1MRAWCY&v=20160215&limit=5&near=" + $scope.txtPlace + "&query=" + $scope.txtFood
            }).then(function successCallback(response) {
                /*
                * If the response has result then we are assigning to venues.
                * else we are displaying the message No data found.
                */
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