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

  describe('getGames', function () {
    let fetchGames, fetchGamesPromise, expectedGames, expectedError;

    beforeEach(function () {
      fetchGames = sinon.stub(GameService, 'fetchGames');
      req.body = {};
    });

    afterEach(function () {
      fetchGames.restore();
    });

    it('should successfully get all g mes', function() {
      expectedGames = GameFixture.games;

      fetchGamesPromise = Promise.resolve(expectedGames);
      fetchGames.returns(fetchGamesPromise);

      GameMiddleware.getGames(req, res, next);

      sinon.assert.callCount(fetchGames, 1);

      return fetchGamesPromise.then(function() {
        expect(req.response).to.be.a('array');
        expect(req.response.length).to.equal(expectedGames.length);
        expect(req.response).to.deep.equal(expectedGames);
        sinon.assert.callCount(next, 1);
      });
    });

    it('should be able to throw an error while getting all games', function () {
      expectedError = ErrorFixture.unknownError;

      fetchGamesPromise = Promise.reject(expectedError);
      fetchGames.returns(fetchGamesPromise);

      GameMiddleware.getGames(req, res, next);

      sinon.assert.callCount(fetchGames, 1);

      return fetchGamesPromise.catch(function (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equal(expectedError);
      });
    })
  });

  describe('getCustomerById', function () {
    let fetchGameById, fetchGameByIdPromise, expectedGame, expectedError;

    beforeEach(function () {
      fetchGameById = sinon.stub(GameService, 'fetchGameById');
    });

    afterEach(function () {
      fetchGameById.restore();
    });

    it('should fetch game by id', function () {
      expectedGame = GameFixture.createdGame;

      fetchGameByIdPromise = Promise.resolve(expectedGame);

      fetchGameById.withArgs(req.params.GameId).returns(fetchGameByIdPromise);

      GameMiddleware.getGameById(req, res, next);

      sinon.assert.callCount(fetchGameById, 1);

      return fetchGameByIdPromise.then(function () {
        expect(req.response).to.be.a('object');
        expect(req.response).to.deep.equal(expectedGame);
        sinon.assert.callCount(next, 1);
      })
    });

    it('should be able to throw error while fetching game by id', function () {
      expectedError = ErrorFixture.unknownError;

      fetchGameByIdPromise = Promise.reject(expectedError);

      fetchGameById.withArgs(req.params.GameId).returns(fetchGameByIdPromise);

      GameMiddleware.getGameById(req, res, next);
      sinon.assert.callCount(fetchGameById, 1);

      return fetchGameByIdPromise.catch(function (error) {
        expect(error).to.be.a('object');
        expect(error).to.deep.equal(expectedError);
      });
    })
  });

  describe('modifyGame', function () {
    let updateGame, updateGamePromise, expectedModifiedGame, expectedError;

    beforeEach(function () {
      updateGame = sinon.stub(GameService, 'updateGame');
      req.body = GameFixture.modifiedGame;
      req.params.gameId = req.body._id;
    });

    afterEach(function () {
      updateGame.restore();
    });

    it('should modify the game details', function () {
      expectedModifiedGame = GameFixture.modifiedGame;

      updateGamePromise = Promise.resolve(expectedModifiedGame);
      updateGame.withArgs(req.params.gameId, req.body).returns(updateGamePromise);

      GameMiddleware.modifyGame(req, res, next);

      sinon.assert.callCount(updateGame, 1);

      return updateGamePromise.then(function () {
        expect(req.response).to.be.a('object');
        expect(req.response).to.deep.equal(expectedModifiedGame);
        sinon.assert.callCount(next, 1);
      });
    })
  });
});
