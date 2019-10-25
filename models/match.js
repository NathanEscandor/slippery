const Joi = require('joi');
const mongoose = require('mongoose');

const Match = mongoose.model('Match', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateCreated: { 
    type: Date, 
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [ String ]
  },
  games: {
    type: [ String ]
  }
}));

function validateMatch(match) {
  const schema = {
    name: Joi.string().min(2).max(50),
    isDeleted: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
    games: Joi.array().items(Joi.string())
  };

  return Joi.validate(match, schema);
}

module.exports.Match = Match;
module.exports.validate = validateMatch;