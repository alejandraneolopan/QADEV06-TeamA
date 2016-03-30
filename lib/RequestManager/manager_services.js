var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
/**
 * This function is used to do the corresponding
 * request ("GET") for "services" service.
 * @param callback {function}
 */
var getServices = function(callback){
    var endPoint = routes.services.URI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};

    request.buildRequest(method.get, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.getServices = getServices;
/**
 * This function is used to do the corresponding
 * request ("GET") for "services" service.
 * @param serviceId {string}
 * @param callback {function}
 */
var getServiceById = function(serviceId, callback){
    var endPoint = routes.services.URI(serviceId);

    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getServiceById = getServiceById;
/**
 * This function is used to do the corresponding
 * request ("GET") for "services" service.
 * @param serviceType {string}
 * @param callback {function}
 */
var getServiceByType = function(serviceType, callback){
    var endPoint = routes.services.URI() + "?type=" + serviceType;
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};

    request.buildRequest(method.get, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.getServiceByType = getServiceByType;
/**
 * This function is used to do the corresponding
 * request ("POST") for "services" service.
 * @param serviceType {string}
 * @param body {string}
 * @param callback {function}
 */
var postService = function(serviceType, body, callback){
    var endPoint = routes.services.URI() + "?type=" + serviceType;
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postService = postService;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for "services" service.
 * @param serviceId {string}
 * @param callback {function}
 */
var delService = function(serviceId, callback){
    var endPoint = routes.services.URI(serviceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};

    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delService = delService;

