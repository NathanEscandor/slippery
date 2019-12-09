(function () {
  'use strict';

  module.exports = {
    init: init
  };

  const bcrypt = require('bcryptjs');
  const passportConfig = require('../../../config/passport/passport-config').passport;

  const LocalStrategy = require('passport-local').Strategy;
  const User = require('../user/user.model');

  function init(passport) {
    const localOptions = {};

    passport.use('register', new LocalStrategy (function (username, password, done) {
        const query = {email: username};
        User.findOne(query, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {message: 'User not found'});
          }

          bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            else {
              return done(null, false, {message: 'Incorrect password'});
            }
          })
        })
    }));

    passport.use('login', new LocalStrategy (function (username, password, done) {
      const query = {email: username};
      User.findOne(query, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'User not found'});
        }

        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            const token = user.generateAuthToken();
            return done(null, user, token);
          }
          else {
            return done(null, false, {message: 'Incorrect password'});
          }
        });
      })
    }));

  }
}) ();