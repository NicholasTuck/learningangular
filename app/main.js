//define(function (require) {
"use strict";

//    require(['bootstrap']);

//});


var garageApp = angular.module('garageApp', []);

garageApp.controller('appController', function ($scope) {
    var controller = this;


    controller.idCount = 1;
    controller.engineTypes = ['Four Cylinder', 'Three Cylinder', 'Two Stroke Cycle', 'In-Line Cylinder'];
    controller.car = {make: "Nissan", model: "Altima", hasBrakes: false, engineType: controller.engineTypes[0]};
    controller.carToRemove = null;
    controller.cars = [
        {id: 0, make: "Ford", model: "F150", hasBrakes: true, engineType: controller.engineTypes[1]}
    ];
    controller.addCar = function (event, car) {
        car.id = controller.idCount;
        controller.cars.push(car);
        controller.car = {};
        controller.idCount++;
    };
    controller.selectCarToRemove = function (car, element) {
        controller.carToRemove = car;
    };
    controller.removeCar = function () {
        controller.cars = _.without(controller.cars, controller.carToRemove);
    };

    $scope.$on('car:saved', controller.addCar);

});

garageApp.directive('carForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/car/carForm.html',
        scope: {
            car: '=',
            engineTypes: '='
        },
        controllerAs: 'ctrl',
        controller: function ($scope) {
            $scope.addCar = function () {
                $scope.$emit("car:saved", $scope.car);
            };
        }
    };
});