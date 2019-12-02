//this is the entry point for any game requests
(function () {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const passport = require('passport');

  const GameMiddleware = require('./game.module')().GameMiddleware;

  router.post('/', 
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
    // passport.authenticate('checkToken'), //-- THIS WORKS!, have to add jwtkey to tests file
    GameMiddleware.modifyGame,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  router.delete('/:gameId',
    GameMiddleware.removeGame,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  module.exports = router;
}) ();