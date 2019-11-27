const chai = require('chai');
const expect = chai.expect;

const UserModule = require('../../../modules/user/user.module');

describe('UserModule', function () {

  describe('user.module file', function () {
    it('should confirm that the UserModule function exists', function () {
      expect(UserModule).to.be.a('function');
    });

    it('should confirm that UserModule function returns an object', function () {
      expect(UserModule()).to.be.a('object');
    })
  });

}); 
