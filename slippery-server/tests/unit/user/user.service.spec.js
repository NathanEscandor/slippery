'use strict';

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

let mongoose = require('mongoose');

let UserModule = require('../../../modules/user/user.module')();
let UserModel = UserModule.UserModel;
let UserService = UserModule.UserService;

let Fixtures = require('../../fixtures/fixtures');
let UserFixture = Fixtures.UserFixture;
let ErrorFixture = Fixtures.ErrorFixture;

let UserModelMock;

describe('UserService', function () {
  beforeEach(function () {
    UserModelMock = sinon.mock(UserModel);
  });

  afterEach(function () {
    UserModelMock.restore();

    mongoose.models = {};
    mongoose.modelSchemas = {};

    return mongoose.connection.close();
  });

  describe('createUser', function () {
    let newUser, expectedCreatedUser, expectedError;

    it('should successfully create new user', function() {
      newUser = UserFixture.newUser;
      expectedCreatedUser = UserFixture.createUser;

      UserModelMock.expects('create')
        .withArgs(newUser)
        .resolves(expectedCreatedUser);

      return UserService.createUser(newUser)
        .then(function (data) {
          UserModelMock.verify();
          expect(data).to.deep.equal(expectedCreatedUser);
        });
    });
  });

}); 