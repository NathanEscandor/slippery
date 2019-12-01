(function () {
  'use strict';

  module.exports = {
    init: init
  };

  const bcrypt = require('bcryptjs');
  // const passport = require('passport');
  const passportConfig = require('../../../config/passport/passport-config').passport;

  const LocalStrategy = require('passport-local').Strategy;
  const User = require('../user/user.model')

  function init(passport) {
    const options = {};

    passport.use(new LocalStrategy (function (username, password, done) {
        let query = {email: username};
        User.findOne(query, function (err, user) {
          if (err) throw err;

          if (!user) {
            return done(null, false, {message: 'User not found'});
          }

          //Match password
          bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            }
            else {
              return done(null, false, {message: 'Incorrect password'});
            }
          })
        })
    }));

    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      })
    });
  }
}) ();