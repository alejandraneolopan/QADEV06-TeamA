var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
describe("Suit: Service", function(){

    this.slow(10000);
    this.timeout(10000);
    var roomID = "56ec5e0a0004801c0ce00dd0";///services/{:serviceId}/rooms/{:roomId}/resources
    var serviceID = "56ec5e0a0004801c0ce00dad";

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
    });

    it('GET /Gets all the specified room’s resources, returns status code 200', function(done){
        request.mser.getServices(function(err, res){
            console.log(res.body);
            done();
        });
    });
});
