//define(function (require) {
"use strict";

//    require(['bootstrap']);

//});


var garageApp = angular.module('garageApp', []);

garageApp.controller('appController', function () {
    var controller = this;
    controller.idCount = 1;
    controller.engineTypes = ['Four Cylinder', 'Three Cylinder', 'Two Stroke Cycle', 'In-Line Cylinder'];
    controller.car = {make: "Nissan", model: "Altima", hasBrakes: false, engineType: controller.engineTypes[0]};
    controller.carToRemove = null;
    controller.cars = [{id: 0, make: "Ford", model: "F150", hasBrakes: true, engineType: controller.engineTypes[1]}];
    controller.addCar = function() {
        controller.car.id = controller.idCount;
        controller.cars.push(controller.car);
        controller.car = {};
        controller.idCount++;
    };
    controller.selectCarToRemove = function(car, element) {
        controller.carToRemove = car;
    };
    controller.removeCar = function () {
        controller.cars = _.without(controller.cars, controller.carToRemove);
    };
});