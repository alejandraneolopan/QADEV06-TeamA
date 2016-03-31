var expect = require('chai').expect;
var ISODate = require('isodate');
var ObjectId = require('mongodb').ObjectID;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD - Out of Orders Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = null;
    var outOfOrderId= null, totalOutOfOrders = 0;


    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){

        dbQuery.preCondition.findAllRooms(function(res){
            room_ID = res[0]._id;
            var mydate=Date.now()+3600000;
            var dueDate=new Date(mydate);
            var startDate=new Date(Date.now());
            dueDate = convertTime(dueDate);
            startDate = convertTime(startDate);
            console.log(startDate,dueDate);
            var timeNow=ISODate("2016-03-31T09:33:00.000Z").toISOString();
            var datetime=ISODate(dueDate).toISOString();
           // datetime2= datetime2.toLocaleDateString();
            console.log(timeNow,datetime);
            var outOfOrderBody =
            {
                "from" : ISODate("2016-03-30T19:00:00.000Z"),//change and formating
                "to" : ISODate("2016-03-30T19:30:00.000Z"),
                "roomId" : ObjectId(room_ID),
                "title" : "Temporarily Out of Order",
                "description" : "test1",
                "sendEmail" : true,
                "__v" : 0
            };
            dbQuery.preCondition.insertOutOfOrder(outOfOrderBody,function(res){
                outOfOrderId = res._id;

                done();
            });
        });
    });


    it('GET /out-of-orders returns all out of orders', function(done){

            expect(outOfOrderId).not.to.equal(null);
            done();


    });

});
var convertTime=  function(someDate)
{ var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var h=someDate.getHours();
    var m=someDate.getMinutes();
    var s=someDate.getSeconds();
    var mmm=someDate.getMilliseconds();

    if(dd<10){dd = '0' + dd;}
    if(mm<10){mm = '0' + mm;}
    if(h<10){h = '0' + h;}
    if(m<10){m = '0' + m;}
    var finalDate =y + '-'+ mm + '-'+ dd + 'T' + h + ':' + m  + ':' + s + '.' + mmm + 'Z';
    return finalDate;
};
