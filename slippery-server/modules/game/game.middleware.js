(function() {
  'use strict';

  module.exports = {
    addGame: addGame
  };
  const GameService = require('./game.module')().GameService;

  function addGame(req, res, next) {
    GameService.createGame(req.body)
      .then(success)
      .catch(fail);

    function success(data) {
      req.response = data;
      next();
    }

    function fail(error) {
      next(error);
    }
  }
}) ();