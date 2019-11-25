'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

const bluebird = require('bluebird');
const Promise = bluebird.Promise;

const GameModule = require('../../../modules/game/game.module')();
const GameMiddleware = GameModule.GameMiddleware;
const GameService = GameModule.GameService;

const Fixtures = require('../../fixtures/fixtures');
const GameFixture = Fixtures.GameFixture;
const ErrorFixture = Fixtures.ErrorFixture;

let req, res, next;

describe('GameMiddleware', function () {
  beforeEach(function() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = sinon.spy();
  });

  describe('addGame', function() {
    let createGame, createGamePromise, expectedCreatedGame, expectedError;

    beforeEach(function () {
      createGame = sinon.stub(GameService, 'createGame');
      req.body = GameFixture.newGame;
    });

    afterEach(function () {
      createGame.restore();
    })

    it('should successfully create new game', function() {
      expectedCreatedGame = GameFixture.createdGame;
      createGamePromise = Promise.resolve(expectedCreatedGame);
      createGame.withArgs(req.body).returns(createGamePromise);

      GameMiddleware.addGame(req, res, next);

      sinon.assert.callCount(createGame, 1);

      return createGamePromise.then(function () {
        expect(req.response).to.be.a('object');
        expect(req.response).to.deep.equal(expectedCreatedGame);
        sinon.assert.callCount(next, 1);
      });
    });

    it('should throw error while creating a game', function() {
      expectedError = ErrorFixture.unknownError;

      createGamePromise = Promise.reject(expectedError);
      createGame.withArgs(req.body).returns(createGamePromise);

      GameMiddleware.addGame(req, res, next);

      sinon.assert.callCount(createGame, 1);

      return createGamePromise.catch(function (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equal(expectedError);
      });
    });
    
  });
});
