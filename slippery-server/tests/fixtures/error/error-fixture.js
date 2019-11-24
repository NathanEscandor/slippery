//this file used to expose all test fixtures from /tests/fixtures/game

(function () {
  'use strict';

  module.exports = {
    unknownError: require('./error-unknown.json'),
    error404: require('./error-404.json')
  };
  
}) ();