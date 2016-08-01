'use strict';

(function() {
  angular
    .module('demo')
    .factory('formService', formService);

    formService.$inject = ['$http', 'validationService', '$route', '$timeout'];

    function formService($http, validationService, $route, $timeout) {
        const user = {};
        const vS = validationService;
        const messages = {};

        function getUser(id) {
            if (Object.keys(user).length > 0) {
              return $timeout(() => {
                return Promise.resolve(user);
              }, 500);
            }

            const usersGET = $http.get('./users.json');

            return $timeout( () => {
              return usersGET.then(function(res) {
                  let data = res.data;
                  for (let i in data[id - 1]) {
                      user[i] = data[id - 1][i];
                  }
                  return user;
              });
            }, 500);
        }

        function userUpdate(info) {

            const username = {
              username: info.username
            };
            const email = {
              email: info.email
            };
            const passwords = {
              pass1: info.password,
              pass2: info.confirmPass
            }

            const usernameErr = vS.usernameExists(username, info.id);
            const emailErr = vS.emailExists(email, info.id);
            const passErr = vS.passwordsMatch(passwords);

            Promise.all([usernameErr, emailErr, passErr])
              .then(function(arr) {
                clearOldMessages();
                if (!(arr[0] || arr[1] || arr[2])) {
                  // user.email = email.email;
                  // user.username = username.username;
                  // user.password = passwords.pass1;
                  messages.success = 'Updated successfully!';
                  console.log('no err')
                } else {
                  messages.errors = {};
                  if (arr[0]) messages.errors.username = true;
                  if (arr[1]) messages.errors.email = true;
                  if (arr[2]) messages.errors.passwords = true;
                  console.log('err')
                }
              })
              .then(function() {
                $route.reload();
              });
          }

          function getMessages() {
              return messages;
          }

          function clearOldMessages() {
              delete messages.success;
              delete messages.errors;
          }

          return {
            getUser,
            // setUser,
            userUpdate,
            getMessages
        }
    }
})();
