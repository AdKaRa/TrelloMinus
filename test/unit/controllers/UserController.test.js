var request = require('supertest');


describe('UsersController', function() {

  describe('#profile()', function() {
    it('should redirect to /signin', function (done) {
      request(sails.hooks.http.app)
        .get('/user/test')
        .expect(302)
        .expect('location','/signin', done);
    });
  });

});
