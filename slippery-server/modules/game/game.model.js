(function() {
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const GameSchema = new Schema({

  });
  
  module.exports = mongoose.model('games', GameSchema);
}) ();