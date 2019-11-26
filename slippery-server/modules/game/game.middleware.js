(function() {
  'use strict';

  module.exports = {
    addGame: addGame,
    getGames: getGames,
    getGameById: getGameById
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

  function getGames(req, res, next) {
    GameService.fetchGames()
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

  function getGameById(req, res, next) {
    GameService.fetchGameById(req.params.gameId)
      .then(success);

    function success(data) {
      req.response = data;
      next();
    }
  }
}) ();