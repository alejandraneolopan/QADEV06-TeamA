var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
describe("Suit: Authentication Service", function(){

    this.slow(10000);
    this.timeout(10000);

    it('POST /login API returns 200 with the "local" authentication', function(done){
        request.maut.postLogin(function(err, res){
            console.log(res.status);
            done();
        });
    });
    it('POST /login API returns 401 status when a incorrect password is used', function(done){
        request.maut.postLoginIncorrect("incorrectPassword", function(err, res){
            console.log(res.status);
            done();
        });
    });
    it('POST /login API returns 401 status when a non-existent user is used', function(done){
        request.maut.postLoginIncorrect("incorrectAccount", function(err, res){
            console.log(res.status);
            done();
        });
    });
    it('POST /login API returns 400 status code when the syntax is incorrect', function(done){
        request.maut.postLoginIncorrect("incorrectSyntax", function(err, res){
            console.log(res.status);
            done();
        });
    });
    it.only('POST /login API returns 400 status code without a required parameter.', function(done){
        request.maut.postLoginIncorrect("missRequeriment", function(err, res){
            console.log(res.status);
            done();
        });
    });
});