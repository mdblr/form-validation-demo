'use strict';
(() => {
  angular
    .module('demo')
    .factory('FormItem', FormItem)

  FormItem.$inject = ['$http'];

  function FormItem($http) {

    function userGet(id) {
      return $http
        .get('./users.json', {
          userId: id
        })
        .then(data => {
          return data.data[id-1];
        });
    }

    function userUpdate() {

    }

    function usernameExists() {

    }

    function emailExists() {

    }

    return {
      userGet,
      userUpdate,
      usernameExists,
      emailExists
    }
  }

})();
