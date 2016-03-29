var request = require('../Request/request.js');
var resource =require('../../lib/BuildRoutes/routes_resource.js');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
var headersArray = [];
/**
 * This function is used to do the corresponding
 * request ("GET") for "resource" service.
 * @param callback {function}
 */
var getResource = function(callback){
    var endPoint = resource.getURI();
    request.buildRequest("get", endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResource = getResource;
/**
 * This function is used to do the corresponding
 * request ("GET") for a "resource" service.
 * @param Id {string}
 * @param callback {function}
 */
var getResourceID = function(Id, callback){
    var endPoint = resource.getURIID(Id);
    request.buildRequest("get", endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourceID = getResourceID;
/**
 * This function is used to do the corresponding
 * request ("POST") for "resource" service.
 * @param resourceBody {string}
 * @param callback {function}
 */
var postResource = function(resourceBody, callback){
    var endPoint = resource.postURI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": resourceBody};

    request.buildRequest("post", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postResource = postResource;
/**
 * This function is used to do the corresponding
 * request ("PUT") for "resource" service.
 * @param IdPut {string}
 * @param body {string}
 * @param callback {function}
 */
var putResource = function(IdPut, body, callback){
    var endPoint = resource.putURI(IdPut);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};
    request.buildRequest("put", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putResource = putResource;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for "resource" service.
 * @param IdDelete {string}
 * @param callback {function}
 */
var delResource = function(IdDelete, callback){
    var endPoint = resource.delURI(IdDelete);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};

    request.buildRequest("del", endPoint, dataRequest, function(err, res){
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

