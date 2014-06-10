"use strict";
/*
define(['app', 'garageStorage', 'cesium'], function(app){

   return app.controller('cesiumController', ['$scope', 'garageStorage',

      function cesiumController($scope, garageStorage){

         var controller = this;

         $scope.initCesium = function() {

            var builtInCzml = [{
               "id" : "Vehicle",
               "availability" : "2012-08-04T16:00:00Z/2012-08-04T17:04:54.9962195740191Z",
               "billboard" : {
                  "eyeOffset" : {
                     "cartesian" : [0.0, 0.0, 0.0]
                  },
                  "horizontalOrigin" : "CENTER",
                  "image" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEISURBVEhLvVXBDYQwDOuojHKj8LhBbpTbpBCEkZsmIVTXq1RVQGrHiWlLmTTqPiZBlyLgy/KSZQ5JSHDQ/mCYCsC8106kDU0AdwRnvYZArWRcAl0dcYJq1hWCb3hBrumbDAVMwAC82WoRvgMnVMDBnB0nYZFTbE6BBvdUGqVqCbjBIk3PyFFR/NU7EKzru+qZsau3ryPwwCRLKYOzutZuCL6fUmWeJGzNzL/RxAMrUmASSCkkAayk2IxPlwhAAYGpsiHQjbLccfdOY5gKkCXAMi7SscAwbQpAnKyctWyUZ6z8ja3OGMepwD8asz+9FnSvbhU8uVOHFIwQsI3/p0CfhuqCSQuxLqsN6mu8SS+N42MAAAAASUVORK5CYII=",
                  "pixelOffset" : {
                     "cartesian2" : [0.0, 0.0]
                  },
                  "scale" : 0.8333333333333334,
                  "show" : [{
                     "interval" : "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                     "boolean" : true
                  }],
                  "verticalOrigin" : "BOTTOM"
               },
               "label" : {
                  "fillColor" : [{
                     "interval" : "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                     "rgba" : [255, 255, 0, 255]
                  }],
                  "font" : "bold 10pt Segoe UI Semibold",
                  "horizontalOrigin" : "LEFT",
                  "outlineColor" : {
                     "rgba" : [0, 0, 0, 255]
                  },
                  "pixelOffset" : {
                     "cartesian2" : [10.0, 0.0]
                  },
                  "scale" : 1.0,
                  "show" : [{
                     "interval" : "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                     "boolean" : true
                  }],
                  "style" : "FILL",
                  "text" : "Tank",
                  "verticalOrigin" : "CENTER"
               },
               "path" : {
                  "color" : [{
                     "interval" : "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                     "rgba" : [255, 255, 0, 255]
                  }],
                  "outlineWidth" : 0.0,
                  "width" : [{
                     "interval" : "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                     "number" : 5.0
                  }],
                  "show" : [{
                     "interval" : "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                     "boolean" : true
                  }]
               },
               "position" : {
                  "interpolationAlgorithm" : "LAGRANGE",
                  "interpolationDegree" : 1,
                  "epoch" : "2012-08-04T16:00:00Z",
                  // Trimmed to just 2 points
                  "cartesian" : [0.0, -2379754.6637012, -4665332.88013588, 3628133.68924173,
                     3894.996219574019, -2291336.52323822, -4682359.21232197, 3662718.52171165]
               }
            }];

//            var viewer = new Cesium.Viewer('cesiumContainer');
            // initialize the Cesium widget
            var viewer = new Cesium.Viewer('cesiumContainer');
//            cesiumWidget.centralBody.depthTestAgainstTerrain = true;
            viewer.clock.onTick.addEventListener(updateData);

            var pathVisualizers,
               dynamicObjectView;

            function setTimeFromBuffer(dynamicObjectCollection) {

               var clock = viewer.clock;

               var availability = dynamicObjectCollection.computeAvailability();
               if (availability.start.equals(Cesium.Iso8601.MINIMUM_VALUE)) {
                  clock.startTime = new Cesium.JulianDate();
                  clock.stopTime = clock.startTime.addDays(1);
                  clock.clockRange = Cesium.ClockRange.UNBOUNDED;
                  clock.multiplier = 60.0;
               } else {
                  clock.startTime = availability.start;
                  clock.stopTime = availability.stop;
               }

               clock.currentTime = clock.startTime;
               clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
   //            timelineWidget.zoomTo(clock.startTime, clock.stopTime);

   //            animationWidget.viewModel.startTime = clock.startTime;
   //            animationWidget.viewModel.stopTime = clock.stopTime;
            }

            function flyToObject(scene, dynamicObject) {

//            disableInput(scene);

               var time = viewer.clock.currentTime;

               dynamicObjectView = new Cesium.DynamicObjectView(dynamicObject, scene);
               dynamicObjectView.update(time);

               var objectPosition = dynamicObject.position.getValue(time);
               var cameraOffset = new Cesium.Cartesian3(0, -1000, 100);
               var direction = Cesium.Cartesian3.negate(Cesium.Cartesian3.normalize(cameraOffset));
               var up = Cesium.Cartesian3.normalize(Cesium.Cartesian3.cross(Cesium.Cartesian3.cross(direction, objectPosition), direction));

               var cameraFlightPath = Cesium.CameraFlightPath.createAnimation(
                  scene, {
                     destination : Cesium.Cartesian3.add(objectPosition, cameraOffset),
                     direction : direction,
                     up : up,
                     duration : 5000,
                     onComplete : function() {
                        //enableInput(scene);
                     }
                  });
               scene.animations.add(cameraFlightPath);
            }

            function updateData() {

               if (viewer.clock.shouldAnimate === false) {
                  return;
               }

               var clock = viewer.clock;

               // update czml visualizations
               if (pathVisualizers !== 'undefined') {
                  pathVisualizers.update(clock.currentTime);
               }

               // update the camera position
               if (typeof dynamicObjectView !== 'undefined') {
                  dynamicObjectView.update(clock.currentTime);
               }
            }



            // load path czml
            var pathCzmlDataSource = new Cesium.CzmlDataSource();
            pathCzmlDataSource.load(builtInCzml, 'The CZML');

            var dynamicObjectCollection =  pathCzmlDataSource.getDynamicObjectCollection();
            setTimeFromBuffer(dynamicObjectCollection);

            var dataSourceCollection = new Cesium.DataSourceCollection();
            dataSourceCollection.add(pathCzmlDataSource);
            pathVisualizers = new Cesium.DataSourceDisplay(viewer.scene, dataSourceCollection);

            // set the camera to follow the path
            var lookAtObject = dynamicObjectCollection.getById("Vehicle");
            flyToObject(viewer.scene, lookAtObject);
            //var pathObject = lookAtObject;





            controller.cesiumWidget = viewer;
         };

      }
   ]);

});
*/
