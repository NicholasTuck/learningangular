"use strict";

define(['app', 'garageStorage'], function(app){

   return app.controller('addController', ['$scope', 'garageStorage',

      function addController($scope, garageStorage){

         var controller = this;

         controller.cars = garageStorage.getAllCars();

         controller.engineTypes = garageStorage.getEngineTypes();

         controller.car = {make: "Nissan", model: "Altima", hasBrakes: false, engineType: controller.engineTypes[0], lon: -100.0, lat: 27.0};

         $scope.$on('car:saved', function(event, car){
            garageStorage.addCar(car);
         });

      }
   ]);

});

