var request = require('../Request/request.js');
var location =require('../../lib/BuildRoutes/routes_location.js');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
var headersArray = [];
/**
 * This function is used to do the corresponding
 * request ("GET") for "location" service.
 * @param callback {function}
 */
var getLocations = function(callback){
    var endPoint = location.getURI();
    var dataRequest = {};

    request.buildRequest("get", endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getLocations = getLocations;
/**
 * This function is used to do the corresponding
 * request ("GET") for "location" service by ID.
 * @param ID {string}
 * @param callback {function}
 */
var getLocationsID = function(ID, callback){
    var endPoint = location.getURIID(ID);
    var dataRequest = {};

    request.buildRequest("get", endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getLocationsID = getLocationsID;
/**
 * This function is used to do the corresponding
 * request ("POST") for "location" service.
 * @param body {string}
 * @param callback {function}
 */
var postLocation = function(body, callback){
    var endPoint = location.postURI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest("post", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postLocation = postLocation;
/**
 * This function is used to do the corresponding
 * request ("PUT") for "location" service.
 * @param ID {string}
 * @param body {string}
 * @param callback {function}
 */
var putLocation = function(ID, body, callback){
    var endPoint = location.getURIID(ID);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest("put", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putLocation = putLocation;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for "location" service.
 * @param locationID {string}
 * @param callback {function}
 */
var delLocation = function(locationID, callback){
    var endPoint = location.getURIID(locationID);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest("del", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delLocation = delLocation;