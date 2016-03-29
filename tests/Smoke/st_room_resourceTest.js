var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe("Room Resources - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = "56f8034fe7a7f714063029d3";
    var resource_ID;
    var roomResourceId;
    var resourceBody;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });
    before(function(done){
        var resourceBody = generator.generator_resource.generateResource();
        request.resource.postResource(resourceBody, function(err, res){
            resource_ID = res.body._id;
            generator.generator_resource.setPropertiesResource(resource_ID);
            done();
        });
    });
    before(function(done){
        generator.generator_resource.setPropertiesResource(resource_ID);
        resourceBody = generator.generator_resource.getResources();
        request.room.postRoomResource(room_ID, resourceBody, function(err, res){
            roomResourceId = res.body[0]._id;
            done();
        });
    });
    it('GET /room-resources returns status code 200', function(done){
        request.room.getResourcesByRoomId(room_ID, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /Specific Room with Specific Resource returns status code 200', function(done){
        request.room.getResourcesIdByRoomId(room_ID, roomResourceId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

   it('PUT /Updates a specific resource from a specific room, returns status code 200', function(done){
        var body = {"quantity": generator.generateCapacity()};
        request.room.putResourceByRoomId(room_ID, roomResourceId, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DEL /Removes a specific resource from a specific room, returns status code 200', function(done){
        request.room.delResourceOfRoom(room_ID, roomResourceId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });


});
