(function() {
  'use strict';

  module.exports = {
    addUser: addUser,
    getUsers: getUsers,
    getUserById: getUserById,
    modifyUser: modifyUser
  };
  const UserService = require('./user.module')().UserService;

  function addUser(req, res, next) {
    UserService.createUser(req.body)
      .then(success)
      .catch(fail);

    function success(data) {
      req.response = data;
      next();
    }

    function fail(error) {
      next(error);
    }
  }

  function getUsers(req, res, next) {
    UserService.fetchUsers()
      .then(success)
      .catch(fail);

    function success(data) {
      req.response = data;
      next();
    }

    function fail(error) {
      next(error);
    }
  }

  function getUserById(req, res, next) {
    UserService.fetchUserById(req.params.userId)
      .then(success)
      .catch(fail);

    function success(data) {
      req.response = data;
      next();
    }

    function fail(error) {
      next(error);
    }
  }

  function modifyUser(req, res, next) {
    console.log('mid user, userid is: ' + req.params.userId);
    console.log('body is: ' + req.body);
    UserService.updateUser(req.params.userId, req.body)
      .then(success)
      .catch(fail);

    function success(data) {
      req.response = data;
      next();
    }

    function fail(error) {
      next(error);
    }
  }
}) (); 