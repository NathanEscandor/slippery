const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Game, validate} = require('../models/game');

router.get('/', async(req, res) => {
  const games = await Game.find().sort('name');
  res.send(games);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  let game = new Game();
  game = await game.save();

  res.send(game);
});

module.exports = router;