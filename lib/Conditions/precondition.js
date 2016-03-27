var resource = require('../../database/resource.js');
var location = require('../../database/location.js');


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
exports.findResource = findResource;
exports.findAllResources = findAllResources;
exports.removeResource = removeResource;

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
exports.findLocation = findLocation;
exports.findAllLocations = findAllLocations;