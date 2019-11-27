(function() {
  'use strict';

  module.exports = {
    addUser: addUser
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
}) (); 