'use strict';

define(['app', 'underscore'], function (app, _) {


    app.factory('garageStorage', function () {

        var engineTypes = ['Four Cylinder', 'Three Cylinder', 'Two Stroke Cycle', 'In-Line Cylinder'],
            cars = [];

        var carIdCount = 0;

        var that = {

            getEngineTypes: function () {
                return engineTypes;
            },

            getCarById: function (id) {
                return _.where(cars, {id: id});
            },

            getAllCars: function () {
                return cars;
            },

            addCar: function (car) {
                cars.push(car);
                car.id = carIdCount;
                carIdCount++;
            },

            makeFakeCar: function () {
                return {make: "Nissan", model: "Altima", hasBrakes: false, engineType: engineTypes[0], lon: -100.0, lat: 27.0};
            }
        };

        that.addCar(that.makeFakeCar());

        return that;

    });

})
;