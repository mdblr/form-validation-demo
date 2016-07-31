'use strict';
(() => {
  angular
  .module('demo',['ngRoute'])
  .config(config);

  config.$inject = ['$routeProvider','$locationProvider'];

  function config($routeProvider, $locationProvider){
    $routeProvider
      .when('/user/1/edit', {
        templateUrl: 'form/form.tpl.html',
        controller: 'FormController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/user/1/edit'
      });
  }

})();
