'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const app = require('../../app');

const Fixtures = require('../fixtures/fixtures');
const GameFixture = Fixtures.GameFixture;

const baseUri = '/games';

describe('GameController', function () {
  describe("POST " + baseUri, function() {
    it('should add new game', function (done) {
      request(app)
        .post(baseUri)
        .send(GameFixture.newGame)
        .end(function (err, res) {
          expect(res.status).to.equal(201);
          expect(res.body).to.not.equal({});
          expect(res.body._id).to.not.equal(undefined);
          expect(res.body.name).to.equal(GameFixture.createdGame.name);

          done();
        });
    });
  });

  describe("GET " + baseUri, function() {
    it('should get all games', function(done) {
      request(app)
        .get(baseUri)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.equal(undefined);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.not.equal(0);

          done();
        });
    });
  })
});