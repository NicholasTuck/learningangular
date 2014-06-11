'use strict';

define(['app', 'underscore'], function(app, _){


   app.factory('garageStorage', function(){

      var engineTypes = ['Four Cylinder', 'Three Cylinder', 'Two Stroke Cycle', 'In-Line Cylinder'],
         cars = [
            {id: 0, make: "Ford", model: "F150", hasBrakes: true, engineType: engineTypes[1], lat: '25.7', lon: '-80.22'}
         ];

      return {

         getEngineTypes: function() {
            return engineTypes;
         },

         getCarById: function(id) {
            var car = _.where(cars, {id: id});
            return car;
         },

         getAllCars: function() {
            return cars;
         },

         addCar: function (car) {
            cars.push(car);
            car.id = cars.length - 1;
         }

      }

   });

});