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
var removeResource = function(id, callback){
	resource.removeResource(id, callback);
};
exports.removeResource = removeResource;

/**
 * Call the function for to insert a new location by DB
 * @param {object} locationToInsert - JSON containing the new location structure
 * @param {function} callback - Function for to manage the location item created
 */
var removeLocation = function(id, callback){
	location.removeLocation(id, callback);
};
exports.removeLocation = removeLocation;


/**
 * Call the function for to find and get the Admin account
  * @param {function} callback - Function for to manage the account in JSON format
 */