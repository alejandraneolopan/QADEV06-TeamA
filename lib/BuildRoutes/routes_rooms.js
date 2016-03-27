var config = require('../../config/config.json');
var rootURI = config.rootURI;
var endPoint = '{root}/rooms/{complement}';
var newEndPoint;
/**
 * This function is used to return an specific
 * endpoint("GET") for "rooms" service.
 * @returns {string}
 */
var getURI = function(){
    return gpURI();
};
exports.getURI = getURI;
/**
 * This function is used to build the main endpoint
 * for "rooms" service(https://172.20.208.66:4040/rooms).
 * @returns {string}
 */
var gpURI = function(){
    newEndPoint = endPoint.replace('/{complement}', '');
    return newEndPoint.replace('{root}', rootURI);
};
/**
 * This function is used to return an specific
 * endpoint("GET")that receives like parameter
 * a "room" ID.
 * @param Id {string}
 * @returns {string}
 */
var getURI_Id = function(Id){
    return dpURI(Id);
};
exports.getURI_Id = getURI_Id;
/**
 * This function is used to return an specific
 * endpoint("PUT")that receives like parameter
 * a "room" ID.
 * @param IdUpdate {string}
 * @returns {string}
 */
var putURI = function(IdUpdate){
    return dpURI(IdUpdate);
};
exports.putURI = putURI;
/**
 * This function is used to build the main
 * endpoint for "rooms" service that receive
 * like parameter a room ID(https://172.20.208.66:4040/rooms/ID).
 * @param ID {string}
 * @returns {string}
 */
var dpURI = function(ID){
    newEndPoint = endPoint.replace('{complement}', ID);
    return newEndPoint.replace('{root}', rootURI);
};