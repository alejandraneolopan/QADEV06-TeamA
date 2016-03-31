var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Smoke: Rooms - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var roomId;
    var serviceId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllRooms(function(res){
                    roomId = res[0]._id;
                    request.authentication.postLogin(function(err, res){
                        dbQuery.preCondition.findAllServices(function(res){
                            serviceId = res[0]._id;
                            done();
                        });
                    });
            });
        });
    });

    it('GET /rooms, returns status code 200', function(done){
        request.room.getRoom(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
     });

    it('GET /rooms/{:roomId}, returns status code 200', function(done){
        request.room.getRoomById(roomId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /services/{:serviceId}/rooms, returns status code 200', function(done){
        request.room.getRoomByService(serviceId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}, returns status code 200', function(done){
        request.room.getRoomsByService(serviceId, roomId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('PUT /rooms/{:roomId}, returns status code 200', function(done){
        var body = generator.generator_room.generateRoom();
        request.room.putRoom(roomId, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('PUT /services/{:serviceId}/rooms/{:roomId}, returns status code 200', function(done){
        var body = generator.generator_room.generateRoom();
        request.room.putRoomByService(serviceId, roomId, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
});
