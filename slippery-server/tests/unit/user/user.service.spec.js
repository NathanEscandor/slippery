'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const mongoose = require('mongoose');

const UserModule = require('../../../modules/user/user.module')();
const UserModel = UserModule.UserModel;
const UserService = UserModule.UserService;

const Fixtures = require('../../fixtures/fixtures');
const UserFixture = Fixtures.UserFixture;
const ErrorFixture = Fixtures.ErrorFixture;

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