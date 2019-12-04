(function () {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const passport = require('passport');

  const UserMiddleware = require('./user.module')().UserMiddleware;

  router.post('/', 
    UserMiddleware.addUser,
    function (req, res) {
      res.status(201).json(req.response);
    }
  );

  router.get('/',
    UserMiddleware.getUsers,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  router.get('/:userId', 
    UserMiddleware.getUserById,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  router.put('/:userId',
    UserMiddleware.modifyUser,
    function (req, res) {
      res.status(200).json(req.response);
    }
  );

  module.exports = router;
}) (); 