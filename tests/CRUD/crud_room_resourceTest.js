var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD - Room Resources Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = null, room_ID2=null;
    var roomResourceId= null, totalResources = 0;
    var resourceBody;
    var roomResourceIdForPost;
    var resourceIdForPost= null,resourceJSON= null;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });


    beforeEach(function(done){
        resourceBody = generator.generator_resource.generateResource();
        dbQuery.preCondition.insertResource(resourceBody,function(res){
            roomResourceId = res._id;

            generator.generator_resource.setPropertiesResource(roomResourceId);
            dbQuery.preCondition.findAllRooms(function(res){
                room_ID = res[0]._id;
                room_ID2 = res[1]._id;
                dbQuery.preCondition.addResourceToRoom(room_ID,resourceBody,function(err, res){
                    dbQuery.preCondition.findRoom(room_ID,function(res){
                        totalResources = res.resources.length;
                        done();
                    });
                });
            });
        });
    });

    it('GET /rooms/{:roomId}/resources returns all room\'s resources by room Id', function(done){
        request.resource.getResourcesByRoom(room_ID, function(err, res){
            expect(res.body.length).to.equal(totalResources);
            done();
        });
    });


    it('GET /rooms/{:roomId}/resources/{:roomResourceId} returns a specific resource from a specific room', function(done){
        request.resource.getResourceByRoomId(room_ID,roomResourceId, function(err, res){
            expect(res.body._id).to.equal(roomResourceId.toString());
            done();
        });

    });
    it('PUT /rooms/{:roomId}/resources/{:roomResourceId} updates a specific resource from a specific room', function(done){
        var quantity = generator.generateCapacity();
        var body = {"quantity": quantity};
        var found=false;

        request.resource.putResourceByRoom(room_ID, roomResourceId, body, function(err, res){
            var resourcesList=res.body.resources;
            /*Verify that the resource is inside of Room*/
            resourcesList.forEach(function(elementResource){
                if (elementResource._id == roomResourceId){
                    found=true;
                    expect(elementResource.quantity.toString()).to.equal(quantity);
                }
            });
            expect(found).to.equal(true);

            done();
        });
    });

    it('DEL /rooms/{:roomId}/resources/{:roomResourceId} removes a specific resource from a specific room', function(done){
        var found=false;
        request.resource.delResourceByRoom(room_ID, roomResourceId, function(err, res){
            var resourcesList=res.body.resources;
            /*Verify that the resource is not inside of the Room*/
            resourcesList.forEach(function(elementResource){
                if (elementResource._id == roomResourceId){
                    found=true;
                }
            });
            expect(found).to.equal(false);
            done();
        });
    });

    it('POST /rooms/{:roomId}/resources associates a resource to a room', function(done){
        var found=false;
        generator.generator_resource.setPropertiesResource(roomResourceId);
        resourceJSON = generator.generator_resource.getResources();
        request.room.postRoomResource(room_ID2, resourceJSON, function(err, res){
            var resourcesList=res.body;
            /*Verify that the resource is not inside of the Room*/
            resourcesList.forEach(function(elementResource){
                if (elementResource.resourceId == roomResourceId){
                    found=true;
                }
            });
            expect(found).to.equal(true);
            done();
        });

    });

   afterEach(function(done){

        if(roomResourceId) {
            dbQuery.postCondition.removeResourceToRoom(room_ID, roomResourceId, function (re) {

                dbQuery.postCondition.removeResource(roomResourceId, function (res) {
                    done();
                });
            });
        }
        else
        {done();}
    });
    after(function(done){

        dbQuery.postCondition.removeResourceToRoom(room_ID2, roomResourceId, function (err,res) {

            //dbQuery.postCondition.removeResource(roomResourceIdForPost, function (res) {
            done();
            //});
        });
    });


});
