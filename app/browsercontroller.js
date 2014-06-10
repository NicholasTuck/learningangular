"use strict";

define(['app', 'garageStorage'], function(app){

   return app.controller('browserController', ['$scope', '$rootScope', 'garageStorage',

      function browserController($scope, $rootScope, garageStorage){

         var controller = this;

         controller.selectedCar = garageStorage.getAllCars()[0];

         controller.setSelectedCar = function(car) {
            controller.selectedCar = car;

            $rootScope.$broadcast('car:selected', car);
         };

      }
   ]);

});

