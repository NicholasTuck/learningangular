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

         removeCar: function (carToRemove) {
         //   console.log('Car to remove: ' + JSON.stringify(carToRemove));
            cars = _.without(cars, carToRemove);
         //   console.log(JSON.stringify(cars));
            carToRemove = null;
         },

         addCar: function (car) {
            cars.push(car);
            car.id = cars.length;
         }

      }

   });

});