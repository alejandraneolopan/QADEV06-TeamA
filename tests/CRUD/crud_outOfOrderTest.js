var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD - Out of Orders Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = null,serviceId = null;
    var outOfOrderId = null, totalOutOfOrders = 0;
    var outOfOrderBody = null;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                done();
            });
        });
    });

    beforeEach(function(done){
        //Find a room
        dbQuery.preCondition.findAllRoomsOfOneService(serviceId, function(res){
            room_ID = res[0]._id;
            //Creating a out-of-Order by DB  - without meeting -
            outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(room_ID);
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
        request.outOfOrders.getOutOfOrders(function(err, res){
            var actualResult = res.body;
            dbQuery.assertion.findAllOutOfOrders(function(resultExpected){
                var totalPresents = 0, present;

                actualResult.forEach(function(element){
                    present = false;
                    resultExpected.forEach(function(dbElement){
                        var from = new Date(dbElement.from);
                        if (element._id == dbElement._id &&
                            element.roomId == dbElement.roomId &&
                            element.title == dbElement.title &&
                            element.from == from.toISOString()){
                            present = true;
                        }
                    });
                    if (present){
                        totalPresents ++;
                    }
                });
                expect(actualResult.length).to.equal(resultExpected.length);
                expect(totalPresents).to.equal(resultExpected.length);
                done();
            });
        });
    });

    it('GET /out-of-orders/{:out-of-orderId} returns one specific out of order', function(done){
        request.outOfOrders.getOutOfOrderById(outOfOrderId, function(err, res){
            var actualResult = res.body;
            dbQuery.assertion.findOutOfOrderById(outOfOrderId,function(resultExpected){
                var from = new Date(resultExpected.from);
                var to = new Date(resultExpected.to);
                console.log(actualResult.to,to.toISOString(), actualResult.from,from.toISOString());
                console.log(outOfOrderId,'-',actualResult._id,resultExpected._id, actualResult.roomId,resultExpected.roomId);
                expect(actualResult._id == resultExpected._id).to.equal(true);
                expect(actualResult.roomId == resultExpected.roomId).to.equal(true);
                expect(actualResult.title == resultExpected.title).to.equal(true);
                expect(actualResult.from == from.toISOString()).to.equal(true);
                expect(actualResult.to == to.toISOString()).to.equal(true);

                done();
            });
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns all out of orders by specific Room and Service', function(done){
        request.outOfOrders.getOutOfOrderByRoom(serviceId, room_ID, function(err, res){
            var actualResult = res.body;
            dbQuery.assertion.findAllOutOfOrders(function(resultExpected){//TODO
                var totalPresents = 0, present;

                actualResult.forEach(function(element){
                    present = false;
                    resultExpected.forEach(function(dbElement){
                        var from = new Date(dbElement.from);
                        if (element._id == dbElement._id &&
                            element.roomId == dbElement.roomId &&
                            element.title == dbElement.title &&
                            element.from == from.toISOString()){
                            present = true;
                        }
                    });
                    if (present){
                        totalPresents ++;
                    }
                });
                expect(actualResult.length).to.equal(resultExpected.length);
                expect(totalPresents).to.equal(resultExpected.length);
                done();
            });
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns one out of order by specific Room and Service', function(done){
        request.outOfOrders.getOutOfOrderByRoom(outOfOrderId, function(err, res){
            var actualResult = res.body;
            dbQuery.assertion.findOutOfOrderById(outOfOrderId,function(resultExpected){
                var from = new Date(resultExpected.from);
                var to = new Date(resultExpected.to);
                console.log(actualResult.to,to.toISOString(), actualResult.from,from.toISOString());
                console.log(outOfOrderId,'-',actualResult._id,resultExpected._id, actualResult.roomId,resultExpected.roomId);
                expect(actualResult._id == resultExpected._id).to.equal(true);
                expect(actualResult.roomId == resultExpected.roomId).to.equal(true);
                expect(actualResult.title == resultExpected.title).to.equal(true);
                expect(actualResult.from == from.toISOString()).to.equal(true);
                expect(actualResult.to == to.toISOString()).to.equal(true);

                done();
            });
        });
    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/out-of-orders creates one out of order on one specific Room and Service', function(done){
        //TODO
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    it('PUT /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} updates one out of order by specific Room and Service', function(done){
        //TODO
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} deletes one out of order by specific Room and Service', function(done){
        //TODO
        expect(outOfOrderId).not.to.equal(null);
        done();
    });

    afterEach(function(done){
        dbQuery.postCondition.removeOutOfOrder(outOfOrderId,function(res){
            done();
        });
    });
});
