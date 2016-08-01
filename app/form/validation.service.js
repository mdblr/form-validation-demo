'use strict';

(function() {
  angular
    .module('demo')
    .factory('validationService', validationService);

    validationService.$inject = ['$http'];

    function validationService($http) {

        function validate(inputObject, id) {

            const key = Object.keys(inputObject)[0];
            const input = inputObject[key];
            const usersGET = $http.get('./users.json');

            return usersGET.then(function(res){
                let users = res.data;

                for (let i in users) {
                  if (users[i][key] === input && users[i].id !== id) {
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

        return {
          usernameExists,
          emailExists,
          passwordsMatch
        }
    }
})();
