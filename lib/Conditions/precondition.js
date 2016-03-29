/**
 * Pre-Conditions
 * @module preconditions
 */
var resource = require('../../database/resource.js');
var location = require('../../database/location.js');

/**
 * Call the function for to insert a new resource by DB
 * @param {object} resourceToInsert - JSON containing the resource structure
 * @param {function} callback - Function for to manage the resource item created
 */
var insertResource = function(resourceToInsert, callback){
	resource.insertResource(resourceToInsert, callback);
};
exports.insertResource = insertResource;

/**
 * Call the function for to insert a new location by DB
 * @param {object} locationToInsert - JSON containing the new location structure
 * @param {function} callback - Function for to manage the location item created
 */
var insertLocation = function(locationToInsert, callback){
	location.insertLocation(locationToInsert, callback);
};
exports.insertLocation = insertLocation;


/**
 * Call the function for to find and get the Admin account
  * @param {function} callback - Function for to manage the account in JSON format
 */