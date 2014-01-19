!(function() {
  var app = angular.module('App', []).run(function() {
    console.log('hello from Angular!');
  });

  app.controller('AppCtrl', function( $scope ) {
    $scope.message = 'Hello World';
  })
})();
