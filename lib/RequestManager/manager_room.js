var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
var headersArray = [];
/**
 * This function is used to do the corresponding
 * request ("GET") for "room" service.
 * @param callback {function}
 */
var getRoom = function(callback){
    var endPoint = routes.rooms.URI();
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getRoom = getRoom;
/**
 * This function is used to do the corresponding
 * request ("GET") for "room" service.
 * @param ID {string}
 * @param callback {function}
 */
var getRoomID = function(ID, callback){
    var endPoint = routes.rooms.URI(ID);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getRoomID = getRoomID;
/**
 * This function is used to do the corresponding request
 * ("GET") for "room" service that include the resources.
 * @param ID {string}
 * @param callback {function}
 */
var getResourcesByRoomId = function(roomID, callback){
    var endPoint = routes.resource.URIByRoom(roomID);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourcesByRoomId = getResourcesByRoomId;

/**
 * This function is used to do the corresponding request
 * ("GET") for "room" service that include the resource ID.
 * @param roomID {string}
 * @param resourceID {string}
 * @param callback {function}
 */
var getResourcesIdByRoomId = function(roomID, resourceID, callback){
    var endPoint = routes.resource.URIByRoom(roomID, resourceID);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourcesIdByRoomId = getResourcesIdByRoomId;

/**
 * This function is used to do the corresponding request
 * ("PUT") for "room".
 * @param roomID {string}
 * @param body {string}
 * @param callback {function}
 */
var putRoom = function(roomID, body, callback){
    var endPoint = routes.rooms.URI(roomID);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putRoom = putRoom;

/**
 * This function is used to do the corresponding request
 * ("PUT") for "room" service that include the resource ID.
 * @param roomID {string}
 * @param resourceID {string}
 * @param body {string}
 * @param callback {function}
 */
var putResourceByRoomId = function(roomID, resourceID, body, callback){
    var endPoint = routes.resource.URIByRoom(roomID, resourceID);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putResourceByRoomId = putResourceByRoomId;
/**
 * This function is used to do the corresponding request
 * ("DELETE") for "room" service that include the resource ID.
 * @param roomID {string}
 * @param resourceID {string}
 * @param callback {function}
 */
var delResourceOfRoom = function(roomID, resourceID, callback){
    var endPoint = routes.resource.URIByRoom(roomID, resourceID);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delResourceOfRoom = delResourceOfRoom;


///precondi

/**
 * This function is used to do the corresponding
 * request ("POST") for "room" service.
 * @param IdRoom {string}
 * @param body {string}
 * @param callback {function}
 */
var postRoomResource= function(roomID, body, callback){
    var endPoint = routes.rooms.URI(roomID) + "/resources?type=bulk";
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest("post", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postRoomResource = postRoomResource;