(function() {
  'use strict';

  module.exports = {
    createGame: createGame,
    fetchGames: fetchGames,
    fetchGameById: fetchGameById
  };

  const GameModel = require('./game.module')().GameModel;

  function createGame(game) {
    return GameModel.create(game);
  }

  function fetchGames() {
    return GameModel.find({})
      .exec();
  }

  function fetchGameById(gameId) {
    return GameModel.findById(gameId)
      .exec();
  }
}) ();