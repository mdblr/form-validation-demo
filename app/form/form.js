'use strict';

(function(){
  angular
    .module('demo')
    .controller('FormController', FormController);

    FormController.$inject = ['formService', '$route', 'messages', '$timeout'];

    function FormController(formService, $route, messages, $timeout) {

        const vm = this;
        const form = formService;

        form.getUser(1)
            .then(function(res) {
              console.log(res);
                vm.profile = res;
                vm.profile.confirmPass = vm.profile.password;
            })

        vm.save = formService.userUpdate;
        vm.cancel = $route.reload;

        if (messages.errors) {
          vm.errors = messages.errors;
        }
        else if (messages.success) {
          vm.success = messages.success;
        }

    }
})();
