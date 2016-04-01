var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD: methods for API-Room", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var roomID, roomName ;
    var roomsList;
    var serviceId;
    var roomsServiceListExpected;
    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                dbQuery.preCondition.findAllRooms(function(res2){
                    roomsList=res2;
                    roomID = res2[0]._id;
                    roomName=res2[0].customDisplayName;
                    done();
                });
            });

        });
    });

    it('CRUD - GET /room returns all rooms', function(done){
        request.room.getRoom(function(err, res){
            expect(res.body.length).to.equal(roomsList.length);
            done();
        });
    });

    it('CRUD - GET /rooms/{:roomId} returns a room', function(done){
        request.room.getRoomById(roomID, function(err, res){
            expect(res.body._id).to.equal(roomID.toString());
            expect(res.body.customDisplayName).to.equal(roomName);
            done();
        });
    });
    
    it('CRUD - PUT /rooms/{:roomId} modifies a specific room', function(done){
        var body = generator.generator_room.generateRoom();
        roomName=body.customDisplayName;
        request.room.putRoom(roomID, body, function(err, res){
            expect(res.body._id).to.equal(roomID.toString());
            expect(res.body.customDisplayName).to.equal(roomName);
            done();
        });
    });

    it('CRUD - GET /services/{:serviceId}/rooms returns all rooms by service Id', function(done){
        dbQuery.preCondition.findAllRoomsOfOneService(serviceId,function(res){
            roomsServiceListExpected = res;
            request.room.getRoomsByService(serviceId, function(err, res){
                var found =false, totalFound = 0;
                var roomServiceResult =res.body;
                (roomServiceResult instanceof Array)? found = false : roomServiceResult = [];
                roomServiceResult.forEach(function(elementNow){
                    roomsServiceListExpected.forEach(function(elementExpect){
                        if (elementNow._id == elementExpect._id &&
                            elementNow.emailAddress == elementExpect.emailAddress &&
                            elementNow.displayName == elementExpect.displayName &&
                            elementNow.serviceId == elementExpect.serviceId){
                            found = true;
                        }
                    });
                    if (found){
                        totalFound ++;
                    }
                });
                expect(totalFound).to.equal(roomsServiceListExpected.length);
                expect(roomServiceResult.length).to.equal(roomsServiceListExpected.length);
                done();
            });
        });
    });

    it('CRUD - GET /services/{:serviceId}/rooms/{:roomId} returns a room by service Id', function(done){
        dbQuery.preCondition.findAllRoomsOfOneService(serviceId,function(res){
            var roomServiceId = res[0]._id;
            var roomServiceName = res[0].customDisplayName;
            request.room.getRoomByService(serviceId, roomID, function(err, res){
                expect(res.body._id).to.equal(roomServiceId.toString());
                expect(res.body.customDisplayName).to.equal(roomServiceName);
                done();
            });
        });
    });

    it('CRUD - PUT /services/{:serviceId}/rooms/{:roomId} modify a specific room by service Id', function(done){
        dbQuery.preCondition.findAllRoomsOfOneService(serviceId,function(res){
            var roomServiceId = res[0]._id;
            var body = generator.generator_room.generateRoom();
            var roomServiceName=body.customDisplayName;
            request.room.putRoomByService(serviceId, roomServiceId, body, function(err, res){
                expect(res.body._id).to.equal(roomServiceId.toString());
                expect(res.body.customDisplayName).to.equal(roomServiceName);
                done();
            });
        });
    });
});