'use strict';

// const Mongoose = require('mongoose').Mongoose;
// const Mockgoose = require('mockgoose-fix').Mockgoose;
// const mongoose = new Mongoose;
// const mockgoose = new Mockgoose(mongoose);
// mockgoose.helper.setDbVersion('3.4.3');

// mongoose.Promise = global.Promise;
// const mockMongoDBURL = 'mongodb://localhost:32768/mockUserDB';

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

  // before(function (done) {
  //   mockgoose.prepareStorage().then(function () {
  //     mongoose.connect(mockMongoDBURL, {}, function (err) {
  //       done(err);
  //     });
  //   })
  // });

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