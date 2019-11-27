'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const app = require('../../app');

const Fixtures = require('../fixtures/fixtures');
const UserFixture = Fixtures.UserFixture;

const baseUri = '/users';

describe('UserController', function () {
  describe("POST " + baseUri, function() {
    it('should add new user', function (done) {
      request(app)
        .post(baseUri)
        .send(UserFixture.newUser)
        .end(function (err, res) {
          expect(res.status).to.equal(201);
          expect(res.body).to.not.equal({});
          expect(res.body._id).to.not.equal(undefined);
          expect(res.body.name).to.equal(UserFixture.createdUser.name);

          done();
        });
    });
  });
}); 