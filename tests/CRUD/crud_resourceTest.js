var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe('CRUD: methods for API-Resources', function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);

    var resourceId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var randomResource = generator.generator_resource.generateResource();
        dbQuery.preCondition.insertResource(randomResource, function(result){
        resourceId = result._id;
            done();
        });
    });

    afterEach(function(done){
        if (resourceId !== undefined) {
            dbQuery.removeResource( resourceId, function(){
                done();
            }); 
        }
    });

    it('POST /Resources create a new resource', function(done){
        var randomResource = generator.generator_resource.generateResource();
        request.resource.postResource(randomResource, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findResource(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                });
        });
    });

    it('GET /Resources/{:Id} returns the resource specified', function(done){
        request.resource.getResourceById(resourceId, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findResource(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                });
        }); 
    });

    it('PUT /Resources/{:id} modifies the resource specified', function(done){
        var randomResource = generator.generator_resource.generateResource();
        request.resource.putResource(resourceId, randomResource, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findResource(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                });
        }); 
    });

    it('GET /Resources returns all resources', function(done){
        request.resource.getResources(function(err, res){
                var actualResult = res.body.length;
                dbQuery.assertion.findAllResources(function(result){
                        expect(actualResult).to.equal(result.length);
                        done();
                 });
        }); 
    });

    it('DELETE /Resources/{:Id} delete the resource specified',function(done){
         request.resource.delResource(resourceId, function(err,res){
                dbQuery.assertion.findResource(res.body._id, function(result){
                       expect(result).to.equal(undefined);
                       done();
                });
        });
    });
});
