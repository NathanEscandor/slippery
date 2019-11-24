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
    })
  });

});