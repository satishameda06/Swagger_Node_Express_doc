/**
 * Created by Satish Ameda on 14/11/2019.
 */
var supertest = require('supertest');
var should = require('should');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:10010');
var random = Math.random();
var idProduct = '';

// UNIT test begin
describe('LOGIN API unit test.', function() {
  

  it('should return login success', function(done) {
    // Test Insert Product
    server
      .post('/api/login')
      .send({
        username: "anyusername",
        password: 'anypassword'
      })
      .expect('Content-type', /json/)
      .expect(200) // This is HTTP response
      .end(function(err, res) {
    
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.result.should.equal(true);
        // Product should be in json
        should.exist(res.body.user.token);
        res.body.user.should.be.ok;
        // Product should instance of Object
        res.body.user.should.be.an.instanceOf(Object);
        // Product should have property described
        res.body.should.have.properties(
          'result',
          'user'
        );
        done();
      });
  });
});
