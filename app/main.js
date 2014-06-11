'use strict';

require.config({

   paths: {
      icanhaz: 'vendor/ICanHaz-0.10.2.min',
      lodash: 'vendor/lodash-2.4.1.min',
      jquery: 'vendor/jquery-1.10.2.min',
      bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min',
      moment: 'vendor/moment-2.6.0.min',
      text: 'vendor/text-2.0.12',
      angular: 'vendor/angular',
      cesium: 'vendor/Cesium/Cesium'
   },

   shim: {

      lodash: {
         exports: '_'
      },
      'bootstrap': {
         deps: ['jquery']
      },
      angular: {
         exports: 'angular'
      },
      cesium: {
         exports: 'cesium'
      }

   },
   map: {
      "*": {"underscore": "lodash"}
   }

});

require([
      'angular',
      'app',
      'cesium',
      'controller',
      'browsercontroller',
      'addcontroller',
      'cesiumcontroller',
      'editorcontroller',
      'directives'
   ], function(angular){
      angular.bootstrap(document, ['garageApp']);
});




