/**
 * Created by Satish Ameda on 08/16/2016.
 */
var supertest = require('supertest');
var should = require('should');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:10010');


// UNIT test begin



describe('JSONPATCH API unit test.', function () {


    it('should return Access denied. No token provided.', function (done) {
        // Test with notoken
        server
            .patch('/api/jsonpatch')
            .send({
                "jsonObj": { "Name": "Satish", "Age": 27 },
                "jsonPatch": [{ "op": "add", "path": "/Designation", "value": "Software Engineer" }]
            })
            .expect('Content-type', /json/)
            .expect(200) // This is HTTP response
            .end(function (err, res) {
                res.status.should.equal(401);
                res.body.message.should.equal("Access denied. No token provided.");
                should.exist(res.body.message);
                res.body.should.have.properties(
                    'message'
                );
                done();
            });
    });
    it('should return update json', function (done) {
       
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
                .patch('/api/jsonpatch').set({ "authorization": token })
                .send({
                    "jsonObj": { "Name": "Satish", "Age": 27 },
                    "jsonPatch": [{ "op": "add", "path": "/Designation", "value": "Software Engineer" }]
                })
                .expect('Content-type', /json/)
                .expect(200) // This is HTTP response
                .end(function (err, res) {
                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // Error key should be false.
                    res.body.result.should.equal(true);
                    // jsonPatch should be in json
                    should.exist(res.body.json);
                    res.body.json.should.be.ok;
                    // jsonPatch should instance of Object
                    res.body.json.should.be.an.instanceOf(Object);
                    // jsonPatch should have property described
                    res.body.should.have.properties(
                        'result',
                        'json'
                    );

                    done();
                });
        });

    });
});
