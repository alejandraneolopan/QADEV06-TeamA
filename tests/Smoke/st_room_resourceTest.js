var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Smoke: Room Resources - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID;
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
            dbQuery.preCondition.findAllRooms(function(res){
                room_ID = res[0]._id;
                done();
            });
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

    it('POST /rooms/{:roomId}/resources, returns status code 200', function(done){
        resourceBody = generator.generator_resource.generateResource();
        request.resource.postResource(resourceBody, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /rooms/{:roomId}/resources, returns status code 200', function(done){
        request.resource.getResourcesByRoom(room_ID, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /rooms/{:roomId}/resources/{:roomResourceId}, returns status code 200', function(done){
        request.resource.getResourceByRoomId(room_ID, roomResourceId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

   it('PUT /rooms/{:roomId}/resources/{:roomResourceId}, returns status code 200', function(done){
        var body = {"quantity": generator.generateCapacity()};
        request.resource.putResourceByRoom(room_ID, roomResourceId, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DEL /rooms/{:roomId}/resources/{:roomResourceId}, returns status code 200', function(done){
        request.resource.delResourceByRoom(room_ID, roomResourceId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });


});
