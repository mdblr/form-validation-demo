'use strict';

(() => {
  angular
    .module('demo')
    .factory('formService', formService);

    formService.$inject = ['$http', 'validationService'];

    function formService($http, validationService) {

        const user = {};
        const vS = validationService;

        function userGet(id) {

            const usersGET = $http.get('./users.json');

            return usersGET.then(res => {
              let data = res.data;
              for (let i in data[id - 1]) {
                user[i] = data[id - 1][i];
              }
              return user;
            });
        }

        function userUpdate(user) {

            const username = {
              username: user.username
            };
            const email = {
              email: user.email
            };
            const passwords = {
              pass1: user.password,
              pass2: user.confirmPass
            }
            const usernameErr = vS.usernameExists(username, user.id);
            const emailErr = vS.emailExists(email, user.id);
            const passErr = vS.passwordsMatch(passwords);

            Promise.all([usernameErr, emailErr, passErr])
              .then(arr => {
                if (!(arr[0] || arr[1] || arr[2])) {
                  console.log('no err')
                } else {
                  console.log('err')
                }
              });
          }

          return {
            userGet,
            userUpdate
        }
    }
})();
