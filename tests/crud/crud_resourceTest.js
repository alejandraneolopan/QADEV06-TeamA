/**
 * CRUD Resource Test
 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');

var condition = require('../../lib/Conditions/condition.js');

var resourceId;
var resourceJsonFound;
var allResources;

describe('Resources', function(){

    this.timeout(5000);
    this.slow(4000);

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var randomResource = generator
                            .generator_resource
                            .generateResource();

        condition
            .preCondition
            .insertResource(randomResource, function(result){
                resourceId = result._id;
                done();
            });
    });

    afterEach(function(done){
        if (resourceId !== undefined) {
            condition.removeResource( resourceId, function(){
                console.log('-----------------------------------');
                done();
            }); 
        };
    });

    var test ;

    it('Resource POST',function(done){
        var randomResource = generator
                            .generator_resource
                            .generateResource();

        request
            .mres
            .postResource(randomResource, function(err,res){
                var actualResult = res.body;
                condition
                    .assertion 
                    .findResource(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                    });
        });
    });

    it.only('DataBase Spike GET',function(done){
        request
            .mres
            .getResourceID(resourceId, function(err,res){ //REVISAR
                var actualResult = res.body;
                condition
                    .assertion 
                    .findResource(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                    });
        }); 
    });

    it('DataBase Spike GET-ALL',function(done){
        assertion.findAllResources(function(result){
            allResources = result;
            console.log('-----------------------------------');
            console.log(allResources);
            done();
        });  
    });

    it('DataBase Spike DELETE',function(done){
         done();
    });
});