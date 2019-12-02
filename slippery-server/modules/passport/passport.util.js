(function () {
  'use strict';

  module.exports = {
    init: init
  };

  const bcrypt = require('bcryptjs');
  // const passport = require('passport');
  const passportConfig = require('../../../config/passport/passport-config').passport;
  const jwtConfig = require('../../../config/jwt/jwt-config').jwt;

  const LocalStrategy = require('passport-local').Strategy;
  const JWTStrategy = require('passport-jwt').Strategy;
  const ExtractJWT= require('passport-jwt').ExtractJwt;
  const User = require('../user/user.model');

  function init(passport) {
    const jwtOptions = {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret
    };

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

    passport.use('checkToken', new JWTStrategy(jwtOptions, function (jwtPayload, done) {
      const query = {email: jwtPayload.email};

      User.findOne(query, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false, {message: 'User not found'});
        }
        return done(null, user);
      });
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