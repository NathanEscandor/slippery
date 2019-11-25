//used by other modules to get the reference for the game module's files
(function () {
  'use strict';

  module.exports = init;

  function init() {
    return {
      GameController: require('./game.controller'),
      GameMiddleware: require('./game.middleware')
    }
  }
}) ();