'use strict';
(() => {
  angular
    .module('demo')
    .controller('FormController', FormController);

  FormController.$inject = ['formService'];

  function FormController(formService) {
    const vm = this;

    formService.userGet(1)
    .then(user => {
      vm.user = user;
      vm.user.confirmPass = vm.user.password;
    });
    // console.log(vm.user);

    vm.edit;
  }

})();
