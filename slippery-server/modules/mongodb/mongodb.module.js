(function () {  //IIFE block to private the variables
  'use strict';

  module.exports = {
    //here, we declare attributes that will be exposed to other modules
    MongoDBUtil: require('./mongodb.util')
  };
}) ();