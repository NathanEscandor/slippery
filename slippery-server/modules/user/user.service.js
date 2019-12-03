(function() {
  'use strict';

  module.exports = {
    createUser: createUser,
    fetchUsers: fetchUsers,
    fetchUserById: fetchUserById,
    updateUser: updateUser
  };

  const UserModel = require('./user.module')().UserModel;

  function createUser(user) {
    return UserModel.create(user);
  }

  function fetchUsers() {
    return UserModel.find({})
  }

  function fetchUserById(userId) {
    return UserModel.findById(userId);
  }

  function updateUser(userId, user) {
    console.log('user service about to call update');
    return UserModel.findByIdAndUpdate(userId, user, {new: true});
  }
}) ();