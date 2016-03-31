var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD ROOMS", function(){

    this.slow(10000);
    this.timeout(10000);
    var RoomID, RoomName ;
    var RoomsList;
    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition
                .findAllRooms(function(res){
                    RoomsList=res;
                    RoomID = res[0]._id;
                    RoomName=res[0].customDisplayName;
                    done();
                });
        });
    });

    it('CRUD - GET /room returns all rooms', function(done){
        request.room.getRoom(function(err, res){
            expect(res.body.length).to.equal(RoomsList.length);
            done();
        });
    });

    it('CRUD - GET /rooms/{:roomId} returns a room', function(done){
        request.room.getRoomById(RoomID, function(err, res){
            expect(res.body._id).to.equal(RoomID.toString());
            expect(res.body.customDisplayName).to.equal(RoomName);
            done();
        });
    });
    
    it('CRUD - PUT /rooms api modify a specific room', function(done){
        var body = generator.generator_room.generateRoom();
        RoomName=body.customDisplayName;
        request.room.putRoom(RoomID, body, function(err, res){
            expect(res.body.customDisplayName).to.equal(RoomName);
            done();
        });
    });
});