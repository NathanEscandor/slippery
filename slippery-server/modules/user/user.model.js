(function() {
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 320,
      unique: true
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true
    },
    tag: {
      type: String,
      minlength: 1,
      maxlength: 50
    },
    dateCreated: { 
      type: Date, 
      default: Date.now,
    }
  });

  module.exports = mongoose.model('users', UserSchema);
}) (); 