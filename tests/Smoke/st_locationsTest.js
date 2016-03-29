var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');

describe("Suit: Locations Service", function(){
    this.slow(10000);
    this.timeout(10000);
    var bodyLocation;
    var parentID;
    var sonLocationID;

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        bodyLocation = generator.generator_location.generateLocation();
        request.mloc.postLocation(bodyLocation, function(err, res){
            console.log("----------------------------------------------");
            parentID = res.body._id;
            console.log("New Location has been created: " + parentID);
            console.log(res.body);

            bodyLocation = generator.generator_location.generateLocation();
            generator.generator_location.setParentId(parentID);
            request.mloc.postLocation(bodyLocation, function(err, res){
                console.log("----------------------------------------------");
                console.log("New Location has been created with parentID: " + parentID);
                sonLocationID = res.body._id;
                console.log(res.body);
                done();
            });
        });
    });

    it('GET /All the locations stored in the database, returns status code 200', function(done){
        request.mloc.getLocations(function(err, res){
            console.log("----------------------------------------------");
            console.log("All Locations:");
            console.log(res.body);
            done();
        });
    });

    it('GET /A specific location, returns status code 200', function(done){
        request.mloc.getLocationsID(parentID, function(err, res){
            console.log("----------------------------------------------");
            console.log("Specific Location:");
            console.log(res.body);
            done();
        });
    });

    it('PUT /A specific location, returns status code 200', function(done){
        var body = generator.generator_location.generateLocation();
        request.mloc.putLocation(sonLocationID, body, function(err, res){
            console.log("----------------------------------------------");
            console.log("Specific Location:");
            console.log(res.body);
            done();
        });
    });

    it('DEL /A specific location, returns status code 200', function(done){
        var body = generator.generator_location.generateLocation();
        request.mloc.delLocation(sonLocationID, function(err, res){
            console.log("----------------------------------------------");
            console.log("Specific Location:");
            console.log(res.status);
            done();
        });
    });

});
