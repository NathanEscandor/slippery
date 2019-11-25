(function() {
  'use strict';

  module.exports = {
    createGame: createGame
  };

  const GameModel = require('./game.module')().GameModel;

  function createGame(game) {
    return GameModel.create(game);
  }
}) ();