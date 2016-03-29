var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var precondition = require('../../lib/Conditions/assertion.js');
describe("Suit: Service", function(){

    this.slow(10000);
    this.timeout(10000);
    var roomID;
    var serviceID;

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
    });

    before(function(done){
        precondition.findAllServices(function(res){
            serviceID = res[0]._id;
            console.log(serviceID);
            done();
        });
    });

    before(function(done){
        precondition.findAllRoomsOfOneService(serviceID, function(res){
            roomID = res[0]._id;
            console.log(roomID);
            done();
        });
    });

    it('GET /Gets all the specified room’s resources, returns status code 200', function(done){
        request.mser.getServices(function(err, res){
            //console.log(res.body);
            done();
        });
    });
});
