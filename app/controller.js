"use strict";

define(['app', 'garageStorage'], function(app){

   return app.controller('appController', ['$scope', 'garageStorage',

      function appController($scope, garageStorage){

         var controller = this;

         controller.cars = garageStorage.getAllCars();

         controller.engineTypes = garageStorage.getEngineTypes();

         $scope.$watch(function(){
            return garageStorage.getAllCars();
         }, function(newValue, oldValue){
            controller.cars = newValue;
         });

      }
   ]);

});

