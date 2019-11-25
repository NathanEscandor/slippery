'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

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

});