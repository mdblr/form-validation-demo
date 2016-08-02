'use strict';

(function() {
  angular
    .module('demo')
    .factory('validationService', validationService);

    validationService.$inject = ['$http'];

    function validationService($http) {

        return {
          checkForChange,
          usernameExists,
          emailExists,
          passwordsMatch
        }

        function validate(inputObject, myId) {

            const property = Object.keys(inputObject)[0];
            const input = inputObject[property].toLowerCase();
            const usersGET = $http.get('./users.json');

            return usersGET.then(function(res){
                let users = res.data;

                for (let i in users) {

                    let testExistent = users[i][property].toLowerCase();
                    if (testExistent === input && users[i].id !== myId) {
                      return true;
                    }

                }
                return false;
            });
        }

        function usernameExists(usernameObj, id) {
            return validate(usernameObj, id);
        }

        function emailExists(emailObj, id) {
            return validate(emailObj, id);
        }

        function passwordsMatch(passObj) {
            return passObj.pass1 !== passObj.pass2 ? true : false;
        }

        function checkForChange(userCM, input) {
            for (let prop in userCM) {
              if (userCM[prop] !== input[prop]) return false;
            }
            return true;
        }
    }
})();
