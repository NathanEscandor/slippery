(function() {
  'use strict';

  module.exports = {
    addGame: addGame
  };
  const GameService = require('./game.module')().GameService;

  function addGame(req, res, next) {
    GameService.createGame(req.body)
      .then(success);

    function success(data) {
      req.response = data;
      next();
    }
  }
}) ();