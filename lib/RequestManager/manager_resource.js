var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
var headersArray = [];
/**
 * This function is used to do the corresponding
 * request ("GET") for "resource" service.
 * @param callback {function}
 */
var getResources = function(callback){
    var endPoint = routes.resource.URI();
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResources = getResources;
/**
 * This function is used to do the corresponding
 * request ("GET") for a "resource" service.
 * @param resourceId {string}
 * @param callback {function}
 */
var getResourceById = function(resourceId, callback){
    var endPoint = routes.resource.URI(resourceId);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourceById = getResourceById;
/**
 * This function is used to do the corresponding
 * request ("POST") for "resource" service.
 * @param resourceBody {string}
 * @param callback {function}
 */
var postResource = function(resourceBody, callback){
    var endPoint = routes.resource.URI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": resourceBody};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postResource = postResource;
/**
 * This function is used to do the corresponding
 * request ("PUT") for "resource" service.
 * @param resourceId {string}
 * @param body {string}
 * @param callback {function}
 */
var putResource = function(resourceId, body, callback){
    var endPoint = routes.resource.URI(resourceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putResource = putResource;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for "resource" service.
 * @param resourceId {string}
 * @param callback {function}
 */
var delResource = function(resourceId, callback){
    var endPoint = routes.resource.URI(resourceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};

    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delResource = delResource;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for all "resource" service.
 * @param body {string}
 * @param callback {function}
 */
/*var delAllResources = function(body, callback){
    var endPoint = resource.getURI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": body};

    request.buildRequest("del", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delAllResources = delAllResources;*/

