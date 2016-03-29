/**
 * Pre-Conditions
 * @module preconditions
 */
var resource = require('../../database/resource.js');
var location = require('../../database/location.js');
var service = require('../../database/service.js');
var room = require('../../database/room.js');

/**
 * Call the function for to insert a new resource by DB
 * @param {object} resourceToInsert - JSON containing the resource structure
 * @param {function} callback - Function for to manage the resource item created
 */
var findResource = function(id, callback){
	resource.findResource(id, callback);
};
var findAllResources = function(callback){
	resource.findAllResources(callback);
};
exports.findResource = findResource;
exports.findAllResources = findAllResources;

/**
 * Call the function for to insert a new location by DB
 * @param {object} locationToInsert - JSON containing the new location structure
 * @param {function} callback - Function for to manage the location item created
 */
var findLocation = function(id, callback){
	location.findLocation(id, callback);
};
var findAllLocations = function(callback){
	location.findAllLocations(callback);
};
exports.findLocation = findLocation;
exports.findAllLocations = findAllLocations;

var findService = function(id, callback){
	service.findService(id, callback);
};
var findAllServices = function(callback){
	service.findAllServices(callback);
};
exports.findService = findService;
exports.findAllServices = findAllServices;

var findRoom = function(id, callback){
	room.findRoom(id, callback);
};
var findAllRooms = function(callback){
	room.findAllRooms(callback);
};
var findAllRoomsOfOneService = function(serviceId, callback){
	room.findAllRoomsOfOneService(serviceId, callback);
};
exports.findRoom = findRoom;
exports.findAllRooms = findAllRooms;
exports.findAllRoomsOfOneService = findAllRoomsOfOneService;
/**
 * Call the function for to find and get the Admin account
  * @param {function} callback - Function for to manage the account in JSON format
 */