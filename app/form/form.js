'use strict';
(() => {
  angular
    .module('demo')
    .controller('form', form);

  form.$inject = ['FormItem'];

  function form(FormItem) {
    const vm = this;

    FormItem.userGet(1)
    .then(user => {
      vm.user = user;
      vm.user.confirmPass = vm.user.password;
    });
    // console.log(vm.user);

    vm.edit;
  }

})();
