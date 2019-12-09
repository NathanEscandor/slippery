(function () {
  'use strict';

  module.exports = {
    init: init
  };




  // const bcrypt = require('bcryptjs');
  // const passportConfig = require('../../../config/passport/passport-config').passport;
  // const jwtConfig = require('../../../config/jwt/jwt-config').jwt;

  // const LocalStrategy = require('passport-local').Strategy;
  // const JWTStrategy = require('passport-jwt').Strategy;
  // const ExtractJWT= require('passport-jwt').ExtractJwt;
  // const User = require('../user/user.model');
  // const Game = require('../game/game.model');


  const localStrategy = require('./passport.local');
  const jwtStrategy = require('./passport.jwt');


  function init(passport) {
    
    localStrategy.init(passport);
    jwtStrategy.init(passport);

  }
}) ();