(function() {
  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');
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

  UserSchema.pre('save', function(next) {
    let user = this;
    //need to add a case for if password is not modified

    //gensalt and hash
    if (user.password) {
      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err); 
          user.password = hash;
          next();
      })
    }
  })

  module.exports = mongoose.model('users', UserSchema);
}) (); 