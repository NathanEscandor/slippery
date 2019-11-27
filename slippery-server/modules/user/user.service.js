(function() {
  'use strict';

  module.exports = {
    createUser: createUser
  };

  const UserModel = require('./user.module')().UserModel;

  function createUser(user) {
    return UserModel.create(user);
  }
}) ();