//Initialing the angular app
angular.module('CalculatorApp', [])
//Initialing the controller.
    .controller('CalculatorController', function ($scope) {
        //Declaring the variables.
        $scope.inputNumber = "";
        $scope.prevNumber = "";
        $scope.operation = false;
        $scope.prevOperation = "";

        /*
        * This method will call when the user click on back button. This will remove single character from the input.
        */
        $scope.backspace = function () {
            $scope.inputNumber = $scope.inputNumber.substr(0, $scope.inputNumber.length - 1);
        }

        /*
        * This method will call when the user clicks on clear button. This will remove entire string from the input.
        */
        $scope.clear = function () {
            $scope.inputNumber = "";
            $scope.prevNumber = "";
            $scope.operation = false;
        }

        /*
        * This method will call when the user clicks on number.
        */
        $scope.setNumber = function (number) {
            if (!$scope.operation)
                $scope.inputNumber = $scope.inputNumber + number.toString();
            else {
                $scope.inputNumber = number;
                $scope.operation = false;
            }
        }

        /*
        * This method will call when the user clicks on = button. This will call the doOperation method with previous operation.
        */
        $scope.equalTo = function () {
            $scope.doOperation($scope.prevOperation, true);
        }

        /*
        * This method will call when any operation button is called(+, -, *, / etc.,). this will pass the operation to the switch case and do the operation.
        */
        $scope.doOperation = function (operation, fromEqual) {
            if (parseInt($scope.inputNumber) != NaN) {
                if ($scope.prevNumber === "") {
                    $scope.prevNumber = parseInt($scope.inputNumber);
                    $scope.prevOperation = operation;
                    $scope.operation = true;
                }
                else {
                    switch (operation) {
                        case '+' :
                            $scope.inputNumber = $scope.prevNumber + parseInt($scope.inputNumber);
                            if (fromEqual)
                                $scope.prevNumber = "";
                            else
                                $scope.prevNumber = $scope.inputNumber;
                            $scope.prevOperation = operation;
                            $scope.operation = true;
                            break;
                        case '-' :
                            $scope.inputNumber = $scope.prevNumber - parseInt($scope.inputNumber);
                            if (fromEqual)
                                $scope.prevNumber = "";
                            else
                                $scope.prevNumber = $scope.inputNumber;
                            $scope.prevOperation = operation;
                            $scope.operation = true;
                            break;
                        case '*' :
                            $scope.inputNumber = $scope.prevNumber * parseInt($scope.inputNumber);
                            if (fromEqual)
                                $scope.prevNumber = "";
                            else
                                $scope.prevNumber = $scope.inputNumber;
                            $scope.prevOperation = operation;
                            $scope.operation = true;
                            break;
                        case '/' :
                            $scope.inputNumber = $scope.prevNumber / parseInt($scope.inputNumber);
                            if (fromEqual)
                                $scope.prevNumber = "";
                            else
                                $scope.prevNumber = $scope.inputNumber;
                            $scope.prevOperation = operation;
                            $scope.operation = true;
                            break;
                        case '%' :
                            $scope.inputNumber = $scope.prevNumber % parseInt($scope.inputNumber);
                            if (fromEqual)
                                $scope.prevNumber = "";
                            else
                                $scope.prevNumber = $scope.inputNumber;
                            $scope.prevOperation = operation;
                            $scope.operation = true;
                            break;
                        case 'x2' :
                            $scope.inputNumber = parseInt($scope.inputNumber) * parseInt($scope.inputNumber);
                            if (fromEqual)
                                $scope.prevNumber = "";
                            else
                                $scope.prevNumber = $scope.inputNumber;
                            $scope.prevOperation = operation;
                            $scope.operation = true;
                            break;
                    }
                }
            }
        }
    });