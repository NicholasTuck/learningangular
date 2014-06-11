"use strict";

define(['app', 'garageStorage'], function(app){

   return app.controller('editorController', ['$scope', '$rootScope', 'garageStorage',

      function editorController($scope, $rootScope, garageStorage){

         var controller = this;

         controller.selectedCar = garageStorage.getAllCars()[0];

         controller.setSelectedCar = function(car) {
            controller.selectedCar = car;

//            $rootScope.$broadcast('car:selected', car);
         };

          controller.cars = garageStorage.getAllCars();


      }
   ]);

});

