'use strict';

define(['app', 'garageStorage', 'moment'], function(app, garageStorage, Moment){

   app.directive('carForm', [function(){

      return {
         restrict: 'E',
         templateUrl: 'app/car/carForm.html',
         scope: {
            car: '=',
            disabled: '@'
         },
         controllerAs: 'ctrl',
         controller: function ($scope, $rootScope, garageStorage) {
             $scope.engineTypes = garageStorage.getEngineTypes();

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


    app.directive('addCarPanel', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/add/addCarPanel.html',
            controller:  function($scope, $rootScope, garageStorage){
                $scope.cars = garageStorage.getAllCars();
                $scope.car = garageStorage.makeFakeCar();

                $scope.$on('car:saved', function(event, car){
                    garageStorage.addCar(car);
                    $scope.car = garageStorage.makeFakeCar();
                });
            }
        }
    }]);

    app.directive('garageLog', [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/log/garageLog.html',
            controller:  function($scope, $rootScope, garageStorage, $element){
                $scope.cars = garageStorage.getAllCars();
                $scope.logMessages = [];

                // todo is there a way to not find the new/removed ones by hand?!
                $scope.$watchCollection('cars', function(newValues, oldValues){
                    if(newValues.length > oldValues.length) {
                        var newCar = _.difference(newValues, oldValues)[0];
                        logCar('Added car', newCar);
                    } else if (newValues.length < oldValues.length) {
                        var removedCar = _.difference(oldValues, newValues)[0];
                        logCar('Removed car', removedCar);
                    }
                }, false);

                $scope.logText = function() {
                    var fullLogText = "";
                    _.each($scope.logMessages, function(message){
                        fullLogText += message + "\n";
                    });
                    return fullLogText;
                };

                $scope.clearLog = function() {
                    _.remove($scope.logMessages, function(item) { return true; });
                };

                function logCar(message, car){
                    var moment = Moment();

                    $scope.logMessages.push(moment.format() + " " + message + ": " + angular.toJson(car));
                }
            }
        }
    }]);

});

