(function() {
  const mongoose = require('mongoose');
  mongoose.set('useFindAndModify', false);
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

    if (user.isModified('password') || user.isNew()) {
      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err); 
          user.password = hash;
          next();
      })
    }
  })

  UserSchema.methods.validateCredentials = function (requestor) {
    const user = this;
    const requestor = (user._id == requestor._id);
    const admin = !!(requestor.roles.admin);

    const result = (requestor || admin);
    
    return result;
  }

  UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const jwtOptions = {
      expiresIn: "3h"
    };

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id
      }, jwtConfig.secret);

    return token;
  }

  module.exports = mongoose.model('users', UserSchema);
}) (); 