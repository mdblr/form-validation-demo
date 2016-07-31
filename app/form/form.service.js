'use strict';
(() => {
  angular
    .module('demo')
    .factory('formService', formService)

  formService.$inject = ['$http'];

  function formService($http) {
    const user = {};

    function userGet(id) {
      return $http
        .get('./users.json' /* `/api/user/${id}` */ )
        .then(res => {
          for (let i in res.data[id - 1]) {
            user[i] = res.data[id - 1][i];
          }
          return user;
        });
    }

      function validate(item, id) {
        // e.g. { username : username } or { email: email }
        const param = {};
        const key = item;
        param[key] = item;

        return $http
          .get('./users.json', {
            param
          })
          .then(res => {
            for (let i of res) {
              if (res[i][item] === item && res[i].id !== id) return true;
            }
            return false;
          });
      }

      function usernameExists(username, id) {
        return validate(username, id);
      }

      function emailExists() {
        return validate(email, id);
      }

    function userUpdate() {
      const usernameErr = usernameExists();
      const emailErr = emailExists();

      if (!(usernameErr || emailErr)) {
        return $http
          .put();
      } else {
        //error handling
      }
    }

    return {
      userGet,
      userUpdate,
      usernameExists,
      emailExists
    }
  }

})();
