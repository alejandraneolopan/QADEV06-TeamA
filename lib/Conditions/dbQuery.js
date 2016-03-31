/**
 * Conditions
 * @module preconditions
 */
var preCondition = this;
var postCondition = this;
var assertion = this;
var resource = require('../../database/resource.js');
var location = require('../../database/location.js');
var service = require('../../database/service.js');
var room = require('../../database/room.js');
var meeting = require('../../database/meeting.js');

/**
 * Call the function for to insert a new resource by DB
 * @param {object} resourceToInsert - JSON containing the resource structure
 * @param {function} callback - Function for to manage the resource item created
 */
var insertResource = function(resourceToInsert, callback){
	resource.insertResource(resourceToInsert, callback);
};
var findResource = function(id, callback){
	resource.findResource(id, callback);
};
var findAllResources = function(callback){
	resource.findAllResources(callback);
};
var removeResource = function(id, callback){
	resource.removeResource(id, callback);
};
exports.insertResource = insertResource;
exports.verifyResourceExist = exports.findResource = findResource;
exports.verifyAllResources = exports.findAllResources = findAllResources;
exports.removeResource = removeResource;

/**
 * Call the function for to insert a new location by DB
 * @param {object} locationToInsert - JSON containing the new location structure
 * @param {function} callback - Function for to manage the location item created
 */
var insertLocation = function(locationToInsert, callback){
	location.insertLocation(locationToInsert, callback);
};
var findLocation = function(id, callback){
	location.findLocation(id, callback);
};
var findAllLocations = function(callback){
	location.findAllLocations(callback);
};
var removeLocation = function(id, callback){
	location.removeLocation(id, callback);
};
exports.insertLocation = insertLocation;
exports.verifyLocationExist = exports.findLocation = findLocation;
exports.verifyAllLocations = exports.findAllLocations = findAllLocations;
exports.removeLocation = removeLocation;

//------------
var findMeeting = function(id, callback){
	meeting.findMeeting(id, callback);
};
var findAllMeetings = function(callback){
	meeting.findAllMeetings(callback);
};
var removeMeeting = function(id, callback){
	meeting.removeMeeting(id, callback);
};
exports.verifyMeetingExist = exports.findMeeting = findMeeting;
exports.verifyAllMeetings = exports.findAllMeetings = findAllMeetings;
exports.removeMeeting = removeMeeting;

//-------------------------
var findService = function(id, callback){
	service.findService(id, callback);
};
var findAllServices = function(callback){
	service.findAllServices(callback);
};
exports.verifyServiceExist = exports.findService = findService;
exports.verifyAllServices = exports.findAllServices = findAllServices;

//------------------
var addResourceToRoom = function(id,resourceToInsert, callback){
	room.addResourceToRoom(id,resourceToInsert, callback);
};
var removeResourceToRoom = function(roomId,resourceId, callback){
	room.removeResourceToRoom(roomId,resourceId, callback);
};

var findRoom = function(id, callback){
	room.findRoom(id, callback);
};
var findAllRooms = function(callback){
	room.findAllRooms(callback);
};
var findAllRoomsOfOneService = function(serviceId, callback){
	room.findAllRoomsOfOneService(serviceId, callback);
};
exports.verifyRoomExist = exports.findRoom = findRoom;
exports.verifyAllRooms = exports.findAllRooms = findAllRooms;
exports.verifyAllRoomsOfOneService = exports.findAllRoomsOfOneService = findAllRoomsOfOneService;
exports.addResourceToRoom = addResourceToRoom;
exports.removeResourceToRoom = removeResourceToRoom;


var insertOutOfOrder = function(outOfOrderToInsert, callback){
	outOfOrder.insertOutOfOrder(outOfOrderToInsert, callback);
};

var findOutOfOrderById = function(id, callback){
	outOfOrder.findOutOfOrderById(id, callback);
};
var findOutOfOrderByIdByRoom = function(roomId, outOfOrderId,callback){
	outOfOrder.findOutOfOrderByIdByRoom(roomId, outOfOrderId,callback);
};
var findAllOutOfOrders = function(callback){
	outOfOrder.findAllOutOfOrders(callback);
};
var findAllOutOfOrdersByRoom = function(roomId,callback){
	outOfOrder.findAllOutOfOrdersByRoom(roomId,callback);
};

var removeOutOfOrder = function(id, callback){
	outOfOrder.removeOutOfOrder(id, callback);
};

exports.insertOutOfOrder = insertOutOfOrder;
exports.findOutOfOrderById = findOutOfOrderById;
exports.findOutOfOrderByIdByRoom = findOutOfOrderByIdByRoom;
exports.findAllOutOfOrders = findAllOutOfOrders;
exports.removeOutOfOrder = removeOutOfOrder;
exports.findAllOutOfOrdersByRoom = findAllOutOfOrdersByRoom;
/**
 * Call the function for to find and get the Admin account
  * @param {function} callback - Function for to manage the account in JSON format
 */

 exports.preCondition = preCondition;
 exports.postCondition =postCondition;
 exports.assertion = assertion;