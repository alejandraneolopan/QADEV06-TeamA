var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe('CRUD methods for API-Resources', function(){

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
        condition.preCondition.insertResource(randomResource, function(result){
        resourceId = result._id;
            done();
        });
    });

    afterEach(function(done){
        if (resourceId !== undefined) {
            condition.removeResource( resourceId, function(){
                done();
            }); 
        }
    });

    it('Resource POST', function(done){
        var randomResource = generator.generator_resource.generateResource();
        request.resource.postResource(randomResource, function(err, res){
                var actualResult = res.body;
                condition.assertion.findResource(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                });
        });
    });

    it('Resource GET', function(done){
        request.resource.getResourceById(resourceId, function(err, res){
                var actualResult = res.body;
                condition.assertion.findResource(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                });
        }); 
    });

    it('Resource GET-ALL', function(done){
        request.resource.getResources(function(err, res){
                var actualResult = res.body.length;
                condition.assertion.findAllResources(function(result){
                        expect(actualResult).to.equal(result.length);
                        done();
                 });
        }); 
    });

    it('Resource DELETE',function(done){
         request.resource.delResource(resourceId, function(err,res){
                condition.assertion.findResource(res.body._id, function(result){
                       expect(result).to.equal(undefined);
                       done();
                });
        });
    });
});
