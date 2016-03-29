var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe("Rooms - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var RoomID;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            condition.preCondition
                .findAllRooms(function(res){
                    RoomID = res[0]._id;
                    done();
                });
        });
    });

    it('GET /rooms returns status code 200', function(done){
        request.room.getRoom(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
     });

    it('GET /room by ID returns status code 200', function(done){
        request.room.getRoomID(RoomID, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('PUT /rooms returns status code 200', function(done){
        var body = generator.generator_room.generateRoom();
        request.room.putRoom(RoomID, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
});
