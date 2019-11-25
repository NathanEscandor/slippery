'use strict';

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

let mongoose = require('mongoose');

let GameModule = require('../../../modules/game/game.module')();
let GameModel = GameModule.GameModel;
let GameService = GameModule.GameService;

let Fixtures = require('../../fixtures/fixtures');
let GameFixture = Fixtures.GameFixture;
let ErrorFixture = Fixtures.ErrorFixture;

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
  });

});