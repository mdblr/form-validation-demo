'use strict';

(function() {
  angular
    .module('demo',['ngRoute'])
    .config(config);

    config.$inject = ['$routeProvider','$locationProvider'];

    function config($routeProvider, $locationProvider){

      $routeProvider
        .when('/user/1/edit', {
          templateUrl: 'form/form.html',
          controller: 'FormController',
          controllerAs: 'vm',
          resolve: {
            messages: formService => {
              return formService.getMessages();
            }
          }
        })
        .otherwise({
          redirectTo: '/user/1/edit'
        });

    }
})();
