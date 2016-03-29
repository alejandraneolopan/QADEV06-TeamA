var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe('CRUD methods for API-Locations', function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var locationId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var randomLocation = generator.generator_location.generateLocation();
        condition.preCondition.insertLocation(randomLocation, function(result){
                locationId = result._id;
                done();
            });
    });

    afterEach(function(done){
        if (locationId !== undefined) {
            condition.removeLocation( locationId, function(){
                done();
            }); 
        };
    });

    it('Location POST', function(done){
        var randomLocation = generator.generator_location.generateLocation();
        request.location.postLocation(randomLocation, function(err, res){
            var actualResult = res.body;
            condition.assertion.findLocation(res.body._id, function(result){
                    expect(actualResult.customName).to.equal(result.customName);
                    expect(actualResult.name).to.equal(result.name);
                    expect(actualResult.fontIcon).to.equal(result.fontIcon);
                    done();
                });
        });
    });

    it('Location GET', function(done){
        request.location.getLocationById(locationId, function(err, res){
            var actualResult = res.body;
            condition.assertion.findLocation(res.body._id, function(result){
                    expect(actualResult.customName).to.equal(result.customName);
                    expect(actualResult.name).to.equal(result.name);
                    expect(actualResult.fontIcon).to.equal(result.fontIcon);
                    done();
                });
        }); 
    });

    it('Location GET-ALL', function(done){
        request.location.getLocations(function(err, res){
            var actualResult = res.body.length;
            condition.assertion.findAllLocations(function(result){
                    expect(actualResult).to.equal(result.length);
                    done();
                });
        }); 
    });

    it('Location DELETE',function(done){
         request.location.delLocation(locationId, function(err,res){
            condition.assertion.findLocation(res.body._id, function(result){
                    expect(result).to.equal(undefined);
                    done();
                });
        });
    });
});