var config = require('../../config/config.json');
var rootURI = config.rootURI;
var endPoint = '{root}/resources/{complement}';
var newEndPoint;
/**
 * This function is used to return an specific
 * endpoint("GET") for "resource" service.
 * @returns {string}
 */
var getURI = function(){
    return gpURI();
};
exports.getURI = getURI;
/**
 * This function is used to return an specific
 * endpoint("POST") for "resource" service.
 * @returns {string}
 */
var postURI = function(){
    return gpURI();
};
exports.postURI = postURI;
/**
 * This function is used to build the main
 * endpoint for "resource" service(https://172.20.208.66:4040/resources).
 * @returns {string}
 */
var gpURI = function(){
    newEndPoint = endPoint.replace('/{complement}', '');
    return newEndPoint.replace('{root}', rootURI);
};
/**
 * This function is used to return an specific
 * endpoint("DELETE")that receives like parameter
 * a "resource" ID.
 * @param IdDelete {string}
 * @returns {string}
 */
var delURI = function(IdDelete){
    return dpURI(IdDelete);
};
exports.delURI = delURI;
/**
 * This function is used to return an specific
 * endpoint("PUT")that receives like parameter
 * a "resource" ID.
 * @param IdUpdate {string}
 * @returns {string}
 */
var putURI = function(IdUpdate){
    return dpURI(IdUpdate);
};
exports.putURI = putURI;
/**
 * This function is used to build the main
 * endpoint for resource service that receive
 * like parameter a "resource" ID(https://172.20.208.66:4040/resources/ID).
 * @param ID {string}
 * @returns {string}
 */
var dpURI = function(ID){
    newEndPoint = endPoint.replace('{complement}', ID);
    return newEndPoint.replace('{root}', rootURI);
};