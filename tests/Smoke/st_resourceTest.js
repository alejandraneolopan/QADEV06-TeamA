var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe("Resource - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var resourceId;
    var listResources = [];

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var body = generator.generator_resource.generateResource();
        condition.preCondition.insertResource(body, function(result){
                resourceId = result._id;
                done();
        });
    });

    afterEach(function(done){
        if (resourceId !== undefined) {
            condition.removeResource( resourceId, function(){
                done();
            });
        };
    });

    it('GET /All resources returns status code 200', function(done){
        request.resource.getResources(function(err, res){
            for(var i = 0; i <= res.body.length; i++){
                listResources.push(res.body[i]);
            }
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /A specific resource returns status code 200', function(done){
        request.resource.getResourceById(resourceId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /resource returns 404 status code when a non-existent resourceID is used', function(done){
        request.resource.getResourceById(generator.generateValues(), function(err, res){
            expect(res.status).to.equal(404);
            done();
        });
    });

    it('PUT /A specific resource returns status code 200', function(done){
        var body = generator.generator_resource.generateResource();
        request.resource.putResource(resourceId, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('PUT /resource returns 404 status code when a non-existent resourceID is used', function(done){
        var body = generator.generator_resource.generateResource();
        request.resource.putResource(generator.generateValues(), body, function(err, res){
            expect(res.status).to.equal(404);
            done();
        });
    });

    it('DEL /A specific resource returns status code 200', function(done){
        request.resource.delResource(resourceId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DEL /resource returns 404 status code when a non-existent resourceID is used', function(done){
        request.resource.delResource(generator.generateValues(), function(err, res){
            expect(res.status).to.equal(404);
            done();
        });
    });

});