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

  // have to call find, set, save to trigger the pre-save document hook
  // (rather than just using findByIdAndUpdate which only triggers query hooks)
  function updateUser(userId, user) {
    UserModel.findById(userId, function (err, userDoc) {
      userDoc.set(user);
      userDoc.save();
    });
  }
}) ();