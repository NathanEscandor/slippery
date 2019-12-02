//this is the entry point for any game requests
(function () {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const passport = require('passport');

  const GameMiddleware = require('./game.module')().GameMiddleware;

  //must be logged in to upload games
  router.post('/',
    passport.authenticate('checkToken'),
    GameMiddleware.addGame, 
    function (req, res) {
      res.status(201).json(req.response);
  });

  router.get('/',
    GameMiddleware.getGames,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  router.get('/:gameId', 
    GameMiddleware.getGameById,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  router.put('/:gameId',
    passport.authenticate('checkTokenGame'),
    GameMiddleware.modifyGame,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  router.delete('/:gameId',
    passport.authenticate('checkTokenGame'),
    GameMiddleware.removeGame,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  module.exports = router;
}) ();