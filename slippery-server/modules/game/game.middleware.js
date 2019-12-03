(function() {
  'use strict';

  module.exports = {
    addGame: addGame,
    getGames: getGames,
    getGameById: getGameById,
    modifyGame: modifyGame,
    removeGame: removeGame
  };
  const GameService = require('./game.module')().GameService;

  function addGame(req, res, next) {
    GameService.createGame(req.body, req.user._id)
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

  function modifyGame(req, res, next) {
    GameService.updateGame(req.params.gameId, req.body)
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

  function removeGame(req, res, next) {
    GameService.deleteGame(req.params.gameId)
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