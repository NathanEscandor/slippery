'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

const bluebird = require('bluebird');
const Promise = bluebird.Promise;

const UserModule = require('../../../modules/user/user.module')();
const UserMiddleware = UserModule.UserMiddleware;
const UserService = UserModule.UserService;

const Fixtures = require('../../fixtures/fixtures');
const UserFixture = Fixtures.UserFixture;
const ErrorFixture = Fixtures.ErrorFixture;

let req, res, next;

describe('UserMiddleware', function () {
  beforeEach(function() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = sinon.spy();
  });

  describe('addUser', function() {
    let createUser, createUserPromise, expectedCreatedUser, expectedError;

    beforeEach(function () {
      createUser = sinon.stub(UserService, 'createUser');
      req.body = UserFixture.newUser;
    });

    afterEach(function () {
      createUser.restore();
    })

    it('should successfully create new user', function() {
      expectedCreatedUser = UserFixture.createdUser;
      createUserPromise = Promise.resolve(expectedCreatedUser);
      createUser.withArgs(req.body).returns(createUserPromise);

      UserMiddleware.addUser(req, res, next);

      sinon.assert.callCount(createUser, 1);

      return createUserPromise.then(function () {
        expect(req.response).to.be.a('object');
        expect(req.response).to.deep.equal(expectedCreatedUser);
        sinon.assert.callCount(next, 1);
      });
    });

    it('should be able to throw an error when creating new user', function() {
      expectedError = ErrorFixture.unknownError;

      createUserPromise = Promise.reject(expectedError);
      createUser.withArgs(req.body).returns(createUserPromise);

      UserMiddleware.addUser(req, res, next);

      sinon.assert.callCount(createUser, 1);

      return createUserPromise.catch(function (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equal(expectedError);
      });
    });

    it('should throw 409 error if user already exists', function () {
      expectedError = ErrorFixture.error409;

      createUserPromise = Promise.reject(expectedError);
      createUser.withArgs(req.body).returns(createUserPromise);

      UserMiddleware.addUser(req, res, next);

      sinon.assert.callCount(createUser, 1);

      return createUserPromise.catch(function (error) {
        expect(error).to.be.a('object');
        expect(error.status).to.equal(expectedError.status);
      });      
    });
  });
});