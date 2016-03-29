var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe("CRUD - Room Resources Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = null;
    var resource_ID, totalResources = 0;
    var resourceBody;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    before(function(done){
        resourceBody = generator.generator_resource.generateResource();
        condition.preCondition.insertResource(resourceBody,function(res){
                resource_ID = res._id;
                generator.generator_resource.setPropertiesResource(resource_ID);
                condition.preCondition.findAllRooms(function(res){
                    room_ID = res[0]._id;
                    condition.preCondition.addResourceToRoom(room_ID,resourceBody,function(err, res){
                        condition.preCondition.findRoom(room_ID,function(res){
                            totalResources = res.resources.length;
                            done();
                        });
                    });
                });
            });
    });

    it('GET Rooms API returns all room\'s resources belong to a Room', function(done){
        request.room.getResourcesByRoomId(room_ID, function(err, res){
            expect(res.body.length).to.equal(totalResources);
            done();
        });

    });
});
