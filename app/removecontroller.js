"use strict";

define(['app', 'garageStorage'], function(app){

   return app.controller('removeController', ['$scope', '$rootScope', 'garageStorage',

      function removeController($scope, $rootScope, garageStorage){

         var controller = this;

         controller.selectedCar;

         controller.setSelectedCar = function(car) {
            controller.selectedCar = car;
         };

         controller.getSelectedCarId = function() {
            return controller.selectedCar ? controller.selectedCar.id : null;
         };

         controller.getSelectedCar = function() {
            return controller.selectedCar;
         };

         controller.removeSelectedCar = function() {
            if(controller.selectedCar) {

               $rootScope.$broadcast('car:removed', controller.selectedCar);

               garageStorage.removeCar(controller.selectedCar);
               controller.selectedCar = null;
            }
         };
      }
   ]);

});

