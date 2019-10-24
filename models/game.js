const Joi = require('joi');
const mongoose = require('mongoose');

const Game = mongoose.model('Game', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateCreated: { 
    type: Date, 
    default: Date.now 
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  tags: [ String ],
  settings: {
    type: Object,
    required: true
  },
  metadata: {
    type: Object,
    required: true
  },
  path: {
    type: String
  },
  stats: {
    type: Object,
    required: true
  }
}));

function validateGame(game) {
  const schema = {
    name: Joi.string().min(2).max(50),
    isDeleted: Joi.boolean(),
    tags: Joi.string().min(2).max(50),
    path: Joi.string().min(16).max(32)
  };

  return Joi.validate(game, schema);
}

module.exports.Game = Game;
module.exports.validate = validateGame;