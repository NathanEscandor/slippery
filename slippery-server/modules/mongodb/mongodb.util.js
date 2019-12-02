(function () {
  'use strict';

  module.exports = {
    init: init
  };

  const mongoose = require('mongoose');
  const mongodbConfig = require('../../../config/mongodb/mongodb-config').mongodb;

  function init() {
    const options = {
      promiseLibrary: require('bluebird'),
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const connectionString = prepConnectionString(mongodbConfig);

    mongoose.connect(connectionString, options)
      .then(function (result) {
        console.log("MongoDB connection succesful! -- DB: " + connectionString);
      })
      .catch(function (error) {
        console.log(error.message);
        console.log("Error occurred while connecting to DB: " + connectionString);
      });
  }

  //standard mongodb uri format is:
  //mongodb://username:password@host:port/database?options
  function prepConnectionString(config) {
    let connectionString = 'mongodb://';

    if (config.user) {
      connectionString += config.user + ':' + config.password + '@';
    }
    connectionString += config.server + '/' + config.database;

    return connectionString;
  }
}) ();