const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Game, validate} = require('../models/game');
const game_loader = require('../game-loader');
const { default: SlippiGame } = require('slp-parser-js');

const multer = require('multer');
const upload = multer({dest: './uploads/'})

router.get('/', async(req, res) => {
  const games = await Game.find().sort('name');
  res.send(games);
});

router.get('/:id', async(req, res) => {
  const game = await Game.findById(req.params.id); //NJE: what if this fails?
  res.send(game);
});

router.post('/uploads', upload.single('slp_file'), async(req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
  // const test_game = new SlippiGame(req.file);
  console.log("in post uploads...");
  // console.log(req.files["path"]);
  const server_response = res.send(req.files);

  const test_game = new SlippiGame(server_response.req.file.path);
  // console.log("stats:");
  // console.log(test_game.getStats());

  // console.log("metadata:");
  // console.log(test_game.getMetadata());
  // console.log("after the send?");
  // console.log(test_game.stats);

  const slp_settings = test_game.getSettings();
  const slp_metadata = test_game.getMetadata();
  const slp_stats = test_game.getStats();

  let game = new Game({
    name: req.body.name || "current_time",
    settings: slp_settings,
    metadata: slp_metadata,
    stats: slp_stats
  });

  game = await game.save();
  console.log(game);


});

router.post('/uploads/', async (req, res) => {
  // getting rid of error for now. just want to save to db
  // const { error } = validate(req.body); //object destructuring to get error instead of result.error
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }

  const test_game = new SlippiGame('../test.slp');
                     
  let game = new Game({
    name: req.body.name || "current_time",
    settings: req.body.settings,
    metadata: req.body.metadata,
    stats: req.body.stats
  });

  


  game = await game.save();

  res.send(game);
});

module.exports = router;