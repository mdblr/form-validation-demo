'use strict';

describe('formService', () => {

  let formService, result;

  beforeEach(()=> {
    module('demo');
    inject(($injector) => {
      formService = $injector.get('formService');
    });
  });

  it('should load profile for Abby', () => {
    formService.userGet(1).then((profile)=> {
      result = profile;
    });

    expect(result).toEqual({
      id: 1,
      username: 'abby',
      email: 'abby@test.com',
      password: 'password' });
  });

  // beforeEach(module('formService'));
  //
  // let FormController;
  //
  // beforeEach(inject( $controller => {
  //   FormController = $controller('FormController');
  // }));
  //
  // describe('Initialization', () => {
  //   it('Load profile for Abby', () => {
  //
  //     expect(FormController.user).toEqual({
  //       id: 1,
  //       username: 'abby',
  //       email: 'abby@test.com',
  //       password: 'password' });
  //   });
  // });

});
