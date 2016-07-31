'use strict';

(() => {
  angular
    .module('demo')
    .controller('FormController', FormController);

    FormController.$inject = ['formService', '$route'];

    function FormController(formService, $route) {

        const vm = this;
        const form = formService;

        form.userGet(1)
          .then(user => {
              vm.user = user;
              vm.user.confirmPass = vm.user.password;
          })

        vm.save = form.userUpdate;
        vm.cancel = $route.reload;
    }
})();
