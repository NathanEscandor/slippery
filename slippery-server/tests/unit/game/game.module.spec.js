const chai = require('chai');
const expect = chai.expect;

const GameModule = require('../../../modules/game/game.module');

describe('GameModule', function () {

  describe('game.module file', function () {
    it('should confirm that the GameModule function exists', function () {
      expect(GameModule).to.be.a('function');
    });

    it('should confirm that GameModule function returns an object', function () {
      expect(GameModule()).to.be.a('object');
    });

    it('should confirm that GameController function exists', function() {
      expect(GameModule().GameController).to.be.a('function');
    });

    it('should confirm that GameMiddleware object exists', function() {
      expect(GameModule().GameMiddleware).to.be.a('object');
    });

    it('should confirm that GameService object exists', function() {
      expect(GameModule().GameService).to.be.a('object');
    });

    it('should confirm that GameModel function exists', function() {
      expect(GameModule().GameModel).to.be.a('function');
    });
  });

});