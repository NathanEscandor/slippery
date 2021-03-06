(function () {
  'use strict';

  module.exports = {
    init: init
  };

  const bcrypt = require('bcryptjs');
  const passportConfig = require('../../../config/passport/passport-config').passport;
  const jwtConfig = require('../../../config/jwt/jwt-config').jwt;

  const JWTStrategy = require('passport-jwt').Strategy;
  const ExtractJWT= require('passport-jwt').ExtractJwt;
  const User = require('../user/user.model');
  const Game = require('../game/game.model');

  function init(passport) {
    const jwtOptions = {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true
    };

    passport.use('checkToken', new JWTStrategy(jwtOptions, function (req, jwtPayload, done) {
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

    //used for checking if user has permissions to protected game routes
    passport.use('checkTokenGame', new JWTStrategy(jwtOptions, function (req, jwtPayload, done) {
      const userQuery = {email: jwtPayload.email};
      const gameQuery = {_id: req.params.gameId};

      User.findOne(userQuery, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false, {message: 'User not found'});
        }

        Game.findOne(gameQuery, function (err, game) {
          if (err) {
            return done(err, false);
          }
          if (game.validateCredentials(user)) {
            return done(null, user);
          }
          else {
            return done(null, false, {message: 'Invalid credentials'});
          }
        });
      });
    }));

    //NJE: I don't think I need this anymore
    // passport.serializeUser(function (user, done) {
    //   done(null, user.id);
    // });

    // passport.deserializeUser(function (id, done) {
    //   User.findById(id, function(err, user) {
    //     done(err, user);
    //   })
    // });
  }
}) ();