'use strict';

(function() {
  angular
    .module('demo')
    .controller('FormController', FormController);

    FormController.$inject = ['formService', '$route', 'messages', '$timeout'];

    function FormController(formService, $route, messages, $timeout) {
        const vm = this;
        const fS = formService;

        vm.save, vm.cancel, vm.form, vm.errors, vm.success;
        vm.save = fS.userUpdate;
        vm.cancel = $route.reload;
        vm.form; 

        activate();

        $timeout(() => {
          if (messages.errors) {
            vm.errors = messages.errors;
          }
          else if (messages.success) {
            vm.success = messages.success;
          }
        }, 600);

        function activate() {
          return fS.returnUser(1)
              .then(function(res) {
                  vm.form = {};
                  Object.assign(vm.form, res);
                  vm.form.confirmPass = vm.form.password;
              });
        }
    }
})();
