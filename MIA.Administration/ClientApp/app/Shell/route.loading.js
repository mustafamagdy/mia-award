(function() {
    'use strict';
  
    angular
      .module('home')
      .config(config)
      .run(runBlock);
  
    config.$inject = ['ngProgressLiteProvider'];
    runBlock.$inject = ['$rootScope', 'ngProgressLite','$transitions','blockUI'];
  
    function config(ngProgressLiteProvider) {
      ngProgressLiteProvider.settings.speed = 1000;
  
    }
  
    function runBlock($rootScope, ngProgressLite,$transitions,blockUI) {
  
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          startProgress();
      });
      $transitions.onStart({}, function(transition) {
        blockUI.start("Loading..."); 
      });
      $transitions.onSuccess({}, function(transition) {
        blockUI.stop();
      });
      $transitions.onError({  }, function(transition) {
        blockUI.stop();
      });
      var routingDoneEvents = ['$stateChangeSuccess', '$stateChangeError', '$stateNotFound'];
  
      angular.forEach(routingDoneEvents, function(event) {
        $rootScope.$on(event, function(event, toState, toParams, fromState, fromParams) {
          endProgress();
        });
      });
  
      function startProgress() {
        ngProgressLite.start();
      }
  
      function endProgress() {
        ngProgressLite.done();
      }
  
    }
  })();
  