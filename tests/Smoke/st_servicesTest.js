var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var condition = require('../../lib/Conditions/condition.js');
var config = require('../../config/config.json');

describe("Service - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var roomID;
    var serviceID;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            condition.preCondition.findAllServices(function(res){
                serviceID = res[0]._id;
                condition.preCondition.findAllRoomsOfOneService(serviceID, function(res){
                    roomID = res[0]._id;
                    done();
                });
            });
        });
    });

    it('GET /Gets all the specified room’s resources, returns status code 200', function(done){
        request.services.getServices(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
});
