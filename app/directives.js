'use strict';

define(['app', 'garageStorage'], function(app){

   app.directive('carForm', [function(){

      return {
         restrict: 'E',
         templateUrl: 'app/car/carForm.html',
         scope: {
            car: '=',
            engineTypes: '=',
            disabled: '@'
         },
         controllerAs: 'ctrl',
         controller: function ($scope, $rootScope) {
            $scope.addCar = function () {
               $scope.$emit("car:saved", $scope.car);

               $rootScope.$broadcast('car:added', $scope.car);
            };
         }
      };

   }]);

    app.directive('carItemsList', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/car/carItemsList.html',
            scope: {
                cars: '=',
                selectedCar: '='
            },
            controller: function ($scope) {
                $scope.carSelected = function(car) {
                    $scope.selectedCar = car;
                };

            }
        }
    }]);

    app.directive('garageBrowser', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/browser/garageBrowser.html',
            scope: {
                disabled: '@'
            },
            controller: function ($scope, $rootScope, garageStorage) {
                $scope.cars = garageStorage.getAllCars();

                $scope.initializeSelectedCar = function() {
                    $scope.selectedCar = ($scope.cars.length > 0 ? $scope.cars[0] : null);
                };

                $scope.$watch('selectedCar', function(newCar, oldCar) {
                    if(newCar) {
                        if ($scope.disabled) {
                            $rootScope.$broadcast('car:selected', $scope.selectedCar);
                        }
                    }
                });

                $scope.panelTitle = ($scope.disabled ? "Garage Browser" : "Garage Editor");

            }
        }
    }]);


    app.directive('removeCarPanel', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/remove/removeCarPanel.html',
            controller:  function($scope, $rootScope, garageStorage){
                var controller = this;

                $scope.cars = garageStorage.getAllCars();

                $scope.initializeSelectedCar = function() {
                    $scope.selectedCar = ($scope.cars.length > 0 ? $scope.cars[0] : null);
                };


                $scope.initializeSelectedCar();


                $scope.removeSelectedCar = function() {
                    if($scope.selectedCar) {
                        _.pull($scope.cars, $scope.selectedCar);
                        $scope.initializeSelectedCar();
                    }
                };
            }
        }
    }]);

});

