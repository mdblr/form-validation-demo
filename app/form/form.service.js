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

        return {
            returnUser,
            userUpdate,
            getMessages
        }

        function returnUser(id) {
            if (Object.keys(user).length > 0) {
                return $timeout(() => {
                    return Promise.resolve(user);
                }, 600);

            }

            const returnAll = $http.get('./users.json');
            return $timeout(() => {
                return returnAll.then(function(res) {
                    const data = res.data;
                    return Object.assign(user, data[id-1]);
                });

            }, 600);
        }

        function userUpdate(formObj) {
            const username = {
                username: formObj.username
            };
            const email = {
                email: formObj.email
            };
            const passwords = {
                pass1: formObj.password,
                pass2: formObj.confirmPass
            };

            // promises

            const changesBool = vS.checkForChange(user, formObj);
            const usernameErr = vS.usernameExists(username, formObj.id);
            const emailErr = vS.emailExists(email, formObj.id);
            const passErr = vS.passwordsMatch(passwords);

            Promise.all([changesBool, usernameErr, emailErr, passErr])
                .then(function(arr) {
                    clearOldMessages();
                    if (arr[0]) {
                        messages.errors = {};
                        messages.errors.noChange = true;
                    }
                    else if (arr[1] || arr[2] || arr[3]) {
                        messages.errors = {};
                        if (arr[1]) messages.errors.username = true;
                        if (arr[2]) messages.errors.email = true;
                        if (arr[3]) messages.errors.passwords = true;
                    } else {
                        user.email = email.email;
                        user.username = username.username;
                        user.password = passwords.pass1;
                        messages.success = 'Updated successfully!';
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

    }
})();
