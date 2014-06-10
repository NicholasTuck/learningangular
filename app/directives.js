'use strict';

define(['app'], function(app){

   app.directive('carForm', [function(){

      return {
         restrict: 'E',
         templateUrl: 'app/car/carForm.html',
         scope: {
            car: '=',
            engineTypes: '='
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

});

