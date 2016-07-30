'use-strict';
(() => {
  angular
  .module('demo',['ngRoute'])
  .config(config);

  config.$inject = ['$routeProvider','$locationProvider'];

  function config($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'form/form.tpl.html',
        controller: 'form',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
