(function () {
  'use strict';

  module.exports = init;

  function init() {
    return {
      UserController: require('./user.controller'),
      UserMiddleware: require('./user.middleware')
    }
  }
}) (); 