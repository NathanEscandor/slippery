(function() {
  'use strict';

  module.exports = {
    createGame: createGame,
    fetchGames: fetchGames
  };

  const GameModel = require('./game.module')().GameModel;

  function createGame(game) {
    return GameModel.create(game);
  }

  function fetchGames() {
    return GameModel.find({})
      .exec();
  }
}) ();