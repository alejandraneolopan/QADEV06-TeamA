var config = require('../../config/config.json');
var rootURI = config.rootURI;
var endPoint = '{root}/locations/{complement}';
var newEndPoint;
/**
 * This function is used to return an specific
 * endpoint("GET") for "location" service.
 * @returns {string}
 */
var getURI = function(){
    return gpURI();
};
exports.getURI = getURI;
/**
 * This function is used to return an specific
 * endpoint("POST") for "location" service.
 * @returns {string}
 */
var postURI = function(){
    return gpURI();
};
exports.postURI = postURI;
/**
 * This function is used to build the
 * main endpoint for "location" service(https://172.20.208.66:4040/locations).
 * @returns {string}
 */
var gpURI = function(){
    newEndPoint = endPoint.replace('/{complement}', '');
    return newEndPoint.replace('{root}', rootURI);
};
/**
 * This function is used to return an specific
 * endpoint("GET")that receives like parameter
 * a "location" ID.
 * @param ID {string}
 * @returns {string}
 */
var getURIID = function(ID){
    return dpURI(ID);
};
exports.getURIID = getURIID;
/**
 * This function is used to return an specific
 * endpoint("DELETE")that receive like parameter
 * a "location" ID.
 * @param IdDelete {string}
 * @returns {string}
 */
var delURI = function(IdDelete){
    return dpURI(IdDelete);
};
exports.delURI = delURI;
/**
 * This function is used to return an specific
 * endpoint("PUT")that receive like parameter
 * a "location" ID.
 * @param IdUpdate {string}
 * @returns {string}
 */
var putURI = function(IdUpdate){
    return dpURI(IdUpdate);
};
exports.putURI = putURI;
/**
 * This function is used to build the main
 * endpoint for "location" service that receive
 * like parameter a location ID(https://172.20.208.66:4040/locations/ID).
 * @param ID {string}
 * @returns {string}
 */
var dpURI = function(ID){
    newEndPoint = endPoint.replace('{complement}', ID);
    return newEndPoint.replace('{root}', rootURI);
};