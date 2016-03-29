var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var config = require('../../config/config.json');

describe("Authentication - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);

    it('POST /login API returns 200 with the "local" authentication', function(done){
        request.authentication.postLogin(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
    it('POST /login API returns 401 status when a incorrect password is used', function(done){
        request.authentication.postLoginIncorrect("incorrectPassword", function(err, res){
            expect(res.status).to.equal(401);
            done();
        });
    });
    it('POST /login API returns 401 status when a non-existent user is used', function(done){
        request.authentication.postLoginIncorrect("incorrectAccount", function(err, res){
            expect(res.status).to.equal(401);
            done();
        });
    });
    it('POST /login API returns 400 status code when the syntax is incorrect', function(done){
        request.authentication.postLoginIncorrect("incorrectSyntax", function(err, res){
            expect(res.status).to.equal(400);
            done();
        });
    });
    it('POST /login API returns 400 status code without a required parameter.', function(done){
        request.authentication.postLoginIncorrect("missRequeriment", function(err, res){
            expect(res.status).to.equal(400);
            done();
        });
    });
});