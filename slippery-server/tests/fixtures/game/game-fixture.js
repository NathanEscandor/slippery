//this file used to expose all test fixtures from /tests/fixtures/game

(function () {
  'use strict';

  module.exports = {
    games: require('./games.json'),
    newGame: require('./new-game.json'),
    createdGame: require('./created-game.json'),
    modifiedGame: require('./modified-game.json')
  };
}) ();