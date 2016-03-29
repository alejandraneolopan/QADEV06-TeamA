var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe("Locations  - Feature", function(){
    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var bodyLocation;
    var locationID;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        bodyLocation = generator.generator_location.generateLocation();
        condition.preCondition.insertLocation(bodyLocation, function(result){
            locationID = result._id;
                done();
            });
    });

    afterEach(function(done){
        if (locationID !== undefined) {
            condition.removeLocation( locationID, function(){
                done();
            });
        };
    });

    it('GET /All the locations stored in the database, returns status code 200', function(done){
        request.location.getLocations(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /A specific location, returns status code 200', function(done){
        request.location.getLocationById(locationID, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /A specific location, returns 404 status code when a non-existent ID is used', function(done){
        var nonExistentLocationID = generator.generateValues();
        request.location.getLocationById(nonExistentLocationID, function(err, res){
            expect(res.status).to.equal(404);
            done();
        });
    });

    it('PUT /A specific location, returns status code 200', function(done){
        var body = generator.generator_location.generateLocation();
        request.location.putLocation(locationID, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DEL /A specific location, returns status code 200', function(done){
        request.location.delLocation(locationID, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DEL /A specific location, returns 404 status code when a non-existent location is used', function(done){
        var nonExistentLocationID = generator.generateValues();
        request.location.delLocation(nonExistentLocationID, function(err, res){
            expect(res.status).to.equal(404);
            done();
        });
    });

});
