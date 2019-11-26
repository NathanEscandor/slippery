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

let testData = {
  existingGame: {},
  modifiedGame: GameFixture.modifiedGame
};

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

          //nje: i'm not 100% sure if this is chill?
          //     just didn't want to hardcode the value because i shouldn't be stubbing/mocking integration tests
          testData.existingGame = res.body[0];
          done();
        });
    });
  })

  describe("GET " + baseUri + "/:gameId", function() {
    it('should get game by id', function(done) {
      request(app)
        .get(baseUri + '/' + testData.existingGame._id)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.equal(undefined);
          expect(res.body).to.deep.equal(testData.existingGame);
          expect(res.body.name).to.equal(testData.existingGame.name);

          done();
        });
    });
  })

  describe("PUT " + baseUri + "/:gameId", function () {
    it('should modify an existing game', function (done) {
      testData.modifiedGame._id = testData.existingGame._id;

      request(app)
        .put(baseUri + '/' + testData.modifiedGame._id)
        .send(testData.modifiedGame)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.equal(undefined);
          expect(res.body.name).to.equal(testData.modifiedGame.name);
          expect(res.body.settings.p3).to.equal(testData.modifiedGame.settings.p3);

          done();
        });

    });
  });
});