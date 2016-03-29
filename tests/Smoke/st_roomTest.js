var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var precondition = require('../../lib/Conditions/assertion.js');
describe("Suit: Rooms Service", function(){

    this.slow(10000);
    this.timeout(10000);
    var RoomID ;// '56f811cfb020b44c0547bde7';

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
    });

    before(function(done){
        precondition.findAllRooms(function(res){
            RoomID = res[0]._id;
            done();
        });
    });

    it('GET /rooms returns status code 200', function(done){
        request.mroo.getRoom(function(err, res){
            console.log("----------------------------------------------");
            console.log("All Rooms:");
            console.log(res.status);
            done();
        });
     });

    it('GET /room by ID returns status code 200', function(done){
        request.mroo.getRoomID(RoomID, function(err, res){
            console.log("----------------------------------------------");
            console.log("Room by ID: " + RoomID);
            console.log(res.status);
            done();
        });
    });

    it('PUT /rooms returns status code 200', function(done){
        var body = generator.generator_room.generateRoom();
        request.mroo.putRoom(RoomID, body, function(err, res){
            console.log("----------------------------------------------");
            console.log("Room: " + RoomID + " Has been uploaded");
            console.log(res.status);
            done();
        });
    });
});
