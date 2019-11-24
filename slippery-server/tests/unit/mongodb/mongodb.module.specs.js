const chai = require('chai');
const expect = chai.expect;

const MongoDBModule = require('../../../modules/mongodb/mongodb.module');
const MongoDBUtil = require('../../../modules/mongodb/mongodb.module').MongoDBUtil;

describe('MongoDBModule', function () {
  describe('mongodb.module file', function () {
    it('should read the mongodb.module file', function () {
        expect(MongoDBModule).to.be.a('object');
    });
    it('should confirm MongoDBUtil exist', function () {
        expect(MongoDBUtil).to.be.a('object');
    });
  });
});