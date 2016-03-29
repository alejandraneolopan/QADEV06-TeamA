/**
 * CRUD Room Test
 */
var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');

var assertions = require('../../lib/Conditions/assertion.js');

describe("CRUD ROOMS", function(){

    this.slow(10000);
    this.timeout(10000);
    /**
     * RoomId for working the update - set the first room in db, ensure that there is at least one room
     * @type {string}
     */
    var RoomID, RoomName ;// '56f811cfb020b44c0547bde7';
    /**
     * Array of all Rooms
     * @type {Array{JSON}}
     */
    var RoomsList;

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
        /* I need ensure that there is rooms
         If there is? OK take one room
         */
        serviceId ="56ec215705a9841c06292f4c";
        /*
         No --> Create a new Service BY DataBase??? ummm too complicated
         request.maut.postLogin(function(err, res){
         done();
         });
         */
    });

    before(function(done){
        assertions.findAllRooms(function(res){
            RoomsList=res;
            RoomID = res[0]._id;
            RoomName=res[0].customDisplayName;
            done();
        });
    });

    it('CRUD - GET /room returns all rooms', function(done){
        request.mroo.getRoom(function(err, res){
            expect(res.body.length).to.equal(RoomsList.length);
            done();
        });
    });

    it('CRUD - GET /rooms/{:roomId} returns a room', function(done){
        request.mroo.getRoomID(RoomID, function(err, res){
            console.log("----------------------------------------------");
            //console.log("Room by ID: " + RoomID);
            expect(res.body._id).to.equal(RoomID.toString());
            expect(res.body.customDisplayName).to.equal(RoomName);
            done();
        });
    });

    it('CRUD - PUT /rooms api modify a specific room', function(done){
        var body = generator.generator_room.generateRoom();
        RoomName=body.customDisplayName;
        request.mroo.putRoom(RoomID, body, function(err, res){
            console.log("----------------------------------------------");
            //console.log("Room: " + RoomID + " Has been uploaded");
            console.log(res.body);
            expect(res.body.customDisplayName).to.equal(RoomName);
            done();
        });
    });
});