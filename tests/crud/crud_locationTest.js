/**
 * CRUD Location Test
 */
var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var locationId;

describe('CRUD methods for API-Locations', function(){

    this.timeout(5000);
    this.slow(4000);

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var randomLocation = generator
                            .generator_location
                            .generateLocation();
                            
        condition
            .preCondition
            .insertLocation(randomLocation, function(result){
                locationId = result._id;
                done();
            });
    });

    afterEach(function(done){
        if (locationId !== undefined) {
            condition.removeLocation( locationId, function(){
                console.log('-----------------------------------');
                done();
            }); 
        };
    });

    var test ;

    it('Location POST', function(done){
        var randomLocation = generator
                            .generator_location
                            .generateLocation();

        request
            .mloc
            .postLocation(randomLocation, function(err, res){
                var actualResult = res.body;
                condition
                    .assertion 
                    .findLocation(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                    });
        });
    });

    it('Location GET', function(done){
        request
            .mloc
            .getLocationsID(locationId, function(err, res){ //REVISAR getLocationById AND print URI
                var actualResult = res.body;
                condition
                    .assertion 
                    .findLocation(res.body._id, function(result){
                        expect(actualResult.customName).to.equal(result.customName);
                        expect(actualResult.name).to.equal(result.name);
                        expect(actualResult.fontIcon).to.equal(result.fontIcon);
                        done();
                    });
        }); 
    });

    it('Location GET-ALL', function(done){
        request
            .mloc
            .getLocations(function(err, res){ //REVISAR getLocations AND print URI
                var actualResult = res.body.length;
                condition
                    .assertion 
                    .findAllLocations(function(result){
                        expect(actualResult).to.equal(result.length);
                        done();
                    });
        }); 
    });

    it('Location DELETE',function(done){
         request
            .mloc
            .delLocation(locationId, function(err,res){ //REVISAR getLocationById AND print URI
                condition
                    .assertion 
                    .findLocation(res.body._id, function(result){
                        expect(result).to.equal(undefined);
                        done();
                    });
        });
    });
});
