/*
	Feature: Meeting API

	Scenario1: Create a new Meeting with the same Schedule of Other Meeting
		Given I have a Service
			And I have a room of this service 
			And I create a new meeting with an especific schedule
		When I create a new meeting with the same schedule
		Then the second meeting is rejected

 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');


describe('Scenario1 for Meeting API', function(){
	context('Create a new Meeting with the same Schedule of Other Meeting', function(){

		this.slow(config.timeSlow);
	    this.timeout(config.timeOut);

	    var room;
	    var roomId;
	    var serviceId;
	    var meetingId;
	    var secondMeetingId;
	    var startDate;
	    var endDate;
	    var requestStatus;

	    before(function(done){
	        request.authentication.postLogin(function(err, res){
	            done();
	        });
	    });

	    it('Given I have a Service',function(done){
	    	dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                done();
            });
	    });

	    it('And I have a room of this service',function(done){
	    	dbQuery.preCondition.findAllRooms(function(res){
	            room = res[0];
	            roomId = res[0]._id;
	            done();
        	});
	    });

	    it('And I create a new meeting with an especific schedule',function(done){
	    	var meetingBody = generator.generator_meeting.generateMeeting(room);
	    	startDate = meetingBody.start;
	    	endDate = meetingBody.end;
	    	request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                meetingId = res.body._id;   
                done();             
            });
	    });

	    it('When I create a new meeting with the same schedule',function(done){
	    	//console.log(room);
	    	var meetingBody = generator.generator_meeting.generateMeeting(room);
	    	meetingBody.start = startDate;
	    	meetingBody.end = endDate;
	    	request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                secondMeetingId = res.body._id;  
                done();              
            });
	    });

	    it('Then the second meeting is rejected',function(done){
	    	expect(requestStatus).to.not.equal(200);
	    	done();
	    });

	    after(function(done){
            request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
                if (meetingId !== undefined) {
		            request.meeting.delMeeting(serviceId, roomId, secondMeetingId, function(err, res){
		                done();
		            });
		        }else{
		            done();
		        }
            });
	    });

	});
});




/*
describe("CRUD: for API Meetings", function(){

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

    

    afterEach(function(done){
        if (meetingId !== undefined) {
            request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
                done();
            });
        }else{
            done();
        }
    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/meetings create a new meeting', function(done){
        dbQuery.preCondition.findAllRooms(function(res){
            room = res[0];
            roomId = res[0]._id;
            var meetingBody = generator.generator_meeting.generateMeeting(room);
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                    meetingId = res.body._id;
                    var actualResult = res.body;
                    dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                        expect(result.title).to.equal(actualResult.title);
                        expect(result.start.toISOString()).to.equal(actualResult.start);
                        expect(result.end.toISOString()).to.equal(actualResult.end);
                        done();
                    });
                });
            });
        });
    });

    describe('', function(){
        beforeEach(function(done){
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

        it('GET /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns the specified meeting', function(done){
            request.meeting.getMeetingById(serviceId, roomId, meetingId, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                    expect(result.title).to.equal(actualResult.title);
                    expect(result.start.toISOString()).to.equal(actualResult.start);
                    expect(result.end.toISOString()).to.equal(actualResult.end);
                    done();
                });
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/meetings, returns all meetings of a room', function(done){
            request.meeting.getMeetings(serviceId, roomId, function(err, res){
                var actualResult = res.body.length;
                dbQuery.assertion.verifyAllMeetingsOfOneRoom(roomId, function(result){
                    expect(actualResult).to.equal(result.length);
                    done();
                });
            });
        });

        it('PUT /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, modifies the specified meeting', function(done){
            var meetingBody = generator.generator_meeting.generateMeeting(room);
            request.meeting.putMeeting(serviceId, roomId, meetingId, meetingBody, function(err, res){       
                var actualResult = res.body;
                dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                    expect(result.title).to.equal(actualResult.title);
                    expect(result.start.toISOString()).to.equal(actualResult.start);
                    expect(result.end.toISOString()).to.equal(actualResult.end);
                    done();
                });
            });
        });

        it('DELETE /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, deletes the specified meeting', function(done){
            request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
                meetingId = undefined;
                dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                    expect(undefined).to.equal(result);
                    done();
                });
            });
        });

    });
});
*/