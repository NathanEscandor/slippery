(function() {
  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const jwtConfig = require('../../../config/jwt/jwt-config').jwt;

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
    },
    roles: {
      type: [ String ],
      required: true
    }
  });

  UserSchema.pre('save', function(next) {
    let user = this;
    //need to add a case for if password is not modified

    if (user.password) {
      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err); 
          user.password = hash;
          next();
      })
    }
  })

  UserSchema.methods.generateAuthToken =  function () {
    const user = this;
    const jwtOptions = {
      expiresIn: "3h"
    };

    const token = jwt.sign({email: user.email}, jwtConfig.secret);

    return token;
  }

  module.exports = mongoose.model('users', UserSchema);
}) (); 