'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-mongoose');

const mongoose = require('mongoose');

const GameModule = require('../../../modules/game/game.module')();
const GameModel = GameModule.GameModel;
const GameService = GameModule.GameService;

const Fixtures = require('../../fixtures/fixtures');
const GameFixture = Fixtures.GameFixture;
const ErrorFixture = Fixtures.ErrorFixture;

let GameModelMock;

describe('GameService', function () {
  beforeEach(function () {
    GameModelMock = sinon.mock(GameModel);
  });

  afterEach(function () {
    GameModelMock.restore();

    mongoose.models = {};
    mongoose.modelSchemas = {};

    return mongoose.connection.close();
  });

  describe('createGame', function () {
    let newGame, expectedCreatedGame, expectedError;

    it('should successfully create new game', function() {
      newGame = GameFixture.newGame;
      expectedCreatedGame = GameFixture.createGame;

      GameModelMock.expects('create')
        .withArgs(newGame)
        .resolves(expectedCreatedGame);
      
      return GameService.createGame(newGame)
        .then(function (data) {
          GameModelMock.verify();
          expect(data).to.deep.equal(expectedCreatedGame);
        });
    });

    it('should throw an error while creating a game', function () {
      newGame = GameFixture.newGame;
      expectedError = ErrorFixture.unknownError;

      GameModelMock.expects('create')
        .withArgs(newGame)
        .rejects(expectedError);

      return GameService.createGame(newGame)
        .catch(function (error) {
          GameModelMock.verify();
          expect(error).to.deep.equal(expectedError)
        });

    });
  });

  describe('fetchGames', function () {
    let expectedGames, expectedError;
    
    it('should successfully fetch all games', function () {
      expectedGames = GameFixture.games;

      GameModelMock.expects('find')
        .withArgs({})
        .chain('exec')
        .resolves(expectedGames);

      return GameService.fetchGames()
        .then(function (data) {
          GameModelMock.verify();
          expect(data).to.deep.equal(expectedGames);
        });
    });

    it('should be able to throw an error while fetching all games', function () {
      expectedError = ErrorFixture.unknownError;

      GameModelMock.expects('find')
        .withArgs({})
        .chain('exec')
        .rejects(expectedError);
      
      return GameService.fetchGames()
        .catch(function (error) {
          GameModelMock.verify();
          expect(error).to.deep.equal(expectedError);
        });
    });
  });

  describe('fetchCustomerById', function() {
    let expectedFetchedGame, gameId, expectedError;

    it('should fetch game by id', function () {
      expectedFetchedGame = GameFixture.createdGame;
      gameId = expectedFetchedGame._id;

      GameModelMock.expects('findById')
        .withArgs(gameId)
        .chain('exec')
        .resolves(expectedFetchedGame);

      return GameService.fetchGameById(gameId)
        .then(function (data) {
          GameModelMock.verify();
          expect(data).to.deep.equal(expectedFetchedGame);
        });
    })
  });
});