var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD - Out of Orders Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = null;
    var outOfOrderId = null, totalOutOfOrders = 0;
    var outOfOrderBody = null;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var startDate,dueDate;
        //Find a room
        dbQuery.preCondition.findAllRooms(function(res){
            room_ID = res[0]._id;
            //Creating a out-of-Order by DB  - without meeting -
            startDate = new Date(Date.now());
            dueDate = new Date(Date.now() + 900000);

            outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(startDate, dueDate, room_ID);
            dbQuery.preCondition.insertOutOfOrder(outOfOrderBody,function(res){
                //Updating the new object
                outOfOrderId = res._id;
                generator.generator_outOfOrder.updateId(outOfOrderId);
                outOfOrderBody = generator.generator_outOfOrder.outOfOrder;
                done();
            });
        });
    });


    it('GET /out-of-orders returns all out of orders', function(done){
            expect(outOfOrderId).not.to.equal(null);
            done();
    });

    it('GET /out-of-orders/{:out-of-orderId} returns one specific out of order', function(done){
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns all out of orders by specific Room and Service', function(done){
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns one out of order by specific Room and Service', function(done){
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/out-of-orders creates one out of order on one specific Room and Service', function(done){
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    it('PUT /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} updates one out of order by specific Room and Service', function(done){
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} deletes one out of order by specific Room and Service', function(done){
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    afterEach(function(done){
        dbQuery.postCondition.removeOutOfOrder(outOfOrderId,function(res){
            done();
        });
    });

});
