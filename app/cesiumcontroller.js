"use strict";

define(['app', 'garageStorage', 'cesium', 'underscore'], function (app) {

    return app.controller('cesiumController', ['$scope', '$rootScope', 'garageStorage',

        function cesiumController($scope, $rootScope, garageStorage) {

            var controller = this,
                zoomHeight = 300000;


            $scope.initCesium = function () {

                $scope.cars = garageStorage.getAllCars();
                controller.viewer = new Cesium.CesiumWidget('cesiumContainer');

                initializeBillboards();

                // todo is there a way to not find the new/removed ones by hand?!
                $scope.$watchCollection('cars', function(newValues, oldValues){
                    if(newValues.length > oldValues.length) {
                        var newCar = _.difference(newValues, oldValues)[0];
                        addBillboard(newCar);
                    } else if (newValues.length < oldValues.length) {
                        var removedCar = _.difference(oldValues, newValues)[0];
                        removeBillboard(removedCar);
                    }
                }, false);

                $scope.$on('car:selected', function (event, car) {
                    flyToCar(car);
                });

                function addBillboard(car) {

                    controller.billboards.add({
                        position: Cesium.Cartesian3.fromDegrees(car.lon, car.lat),
                        imageIndex: 0,
                        id: car
                    });


                }

                function flyToCar(car) {

                    var destination = Cesium.Cartesian3.fromDegrees(car.lon, car.lat, zoomHeight);
                    var scene = controller.viewer.scene;

                    var flight = Cesium.CameraFlightPath.createAnimation(scene, {
                        destination: destination,
                        duration: 3500
                    });
                    scene.animations.add(flight);
                }

                function removeBillboard(car) {
                    var billboard = _.find(controller.billboards._billboards, {id: car});
                    controller.billboards.remove(billboard);
                }

                function initializeBillboards() {

                    var scene = controller.viewer.scene,
                        cars = garageStorage.getAllCars();

                    controller.billboards = new Cesium.BillboardCollection();

                    var image = new Image();
                    image.onload = function () {

                        var textureAtlas = new Cesium.TextureAtlas({
                            scene: controller.viewer.scene,
                            image: image
                        });

                        controller.billboards.textureAtlas = textureAtlas;
                        _.each(cars, addBillboard);

                        scene.primitives.add(controller.billboards);
                    };

                    image.src = 'app/images/tank.png';

                }
            };

        }
    ]);

});

