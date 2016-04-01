var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Meetings - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room;
    var roomId;
    var serviceId;
    var meetingId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/meetings', function(done){
            dbQuery.preCondition.findAllRooms(function(res){
                room = res[0];
                roomId = res[0]._id;
                var meetingBody = generator.generator_meeting.generateMeeting(room);
                dbQuery.preCondition.findAllServices(function(res){
                    serviceId = res[0]._id;
                    request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                        meetingId = res.body._id;
                        done();
                    });
                });
            });
    });

    describe("Meetings - Feature", function(){

        var startTime;
        var endTime;

        before(function(done){
        dbQuery.preCondition.findAllRooms(function(res){
            room = res[6];
            roomId = res[6]._id;
            var meetingBody = generator.generator_meeting.generateMeeting(room);
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                    meetingId = res.body._id;
                    startTime = res.body.start;
                    endTime = res.body.end;
                    done();
                });
            });
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns status code 200', function(done){
        request.meeting.getMeetingById(serviceId, roomId, meetingId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/meetings, returns status code 200', function(done){
        request.meeting.getMeetings(serviceId, roomId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('PUT /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns status code 200', function(done){
        var meetingBody = generator.generator_meeting.generateMeeting(room);
        request.meeting.putMeeting(serviceId, roomId, meetingId, meetingBody, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DELETE /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns status code 200', function(done){
        request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
  });
});
