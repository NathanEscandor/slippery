(function() {
  const mongoose = require('mongoose');
  mongoose.set('useFindAndModify', false);
  const Schema = mongoose.Schema;

  const GameSchema = new Schema({
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
    path: {
      type: String
    },
    settings: {
      type: Object,
      required: true
    },
    metadata: {
      type: Object,
      required: true
    },
    stats: {
      type: Object,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    }
  });

  GameSchema.methods.validateCredentials = function (user) {
    const game = this;

    const creator = (game.createdBy == user._id);
    const admin = !!(user.roles.admin);
    
    const result = (creator || admin);

    return result;
  }
  
  module.exports = mongoose.model('games', GameSchema);
}) ();