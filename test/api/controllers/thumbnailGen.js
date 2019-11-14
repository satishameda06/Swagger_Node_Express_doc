/**
 * Created by Satish Ameda on 08/16/2016.
 */
var supertest = require('supertest');
var should = require('should');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:10010');
var random = Math.random();
var idProduct = '';

// UNIT test begin
describe('Thumnail API unit test.', function() {
  

  it('should return thumnail image', function(done) {

    (function (cb) {
        return server
            .post('/api/login')
            .send({
                username: "anyusername",
                password: 'anypassword'
            }).end(function (err, res) {
                return cb(res.body.user.token);
            })
    })(function (token) {
        server
        .get('/api/thumb?src=/public/Images/cat.png&w=700&h=900')
        .set({ "authorization": token })
        .expect('Content-type', 'image/png')
        .expect(200) // This is HTTP response
        .end(function(err, res) {
          res.status.should.equal(200);
       
          res.body.should.be.ok;
          res.body.should.be.an.instanceOf(Object);
          done();
        });
    })
   
  });
});
