var request = require('../Request/request.js');
var room =require('../../lib/BuildRoutes/routes_rooms.js');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
var headersArray = [];
/**
 * This function is used to do the corresponding
 * request ("GET") for "room" service.
 * @param callback {function}
 */
var getRoom = function(callback){
    var endPoint = room.getURI();
    request.buildRequest("get", endPoint, function(err, res){
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
    var endPoint = room.getURI_Id(ID);
    request.buildRequest("get", endPoint, function(err, res){
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
var getRoomIDResources = function(ID, callback){
    var endPoint = room.getURI_Id(ID) + "/resources";
    request.buildRequest("get", endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getRoomIDResources = getRoomIDResources;
/**
 * This function is used to do the corresponding request
 * ("GET") for "room" service that include the resource ID.
 * @param roomID {string}
 * @param resourceID {string}
 * @param callback {function}
 */
var getRoomIDResourcesID = function(roomID, resourceID, callback){
    var endPoint = room.getURI_Id(roomID) + "/resources/" + resourceID;
    request.buildRequest("get", endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getRoomIDResourcesID = getRoomIDResourcesID;
/**
 * This function is used to do the corresponding
 * request ("POST") for "room" service.
 * @param IdRoom {string}
 * @param body {string}
 * @param callback {function}
 */
var postRoomResource = function(IdRoom, body, callback){
    var endPoint = room.putURI(IdRoom) + "/resources?type=bulk";
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest("post", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postRoomResource = postRoomResource;
/**
 * This function is used to do the corresponding request
 * ("PUT") for "room".
 * @param IdPut {string}
 * @param body {string}
 * @param callback {function}
 */
var putRoom = function(IdPut, body, callback){
    var endPoint = room.putURI(IdPut);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest("put", endPoint, dataRequest, function(err, res){
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
var putRoomResource = function(roomID, resourceID, body, callback){
    var endPoint = room.putURI(roomID)+ "/resources/" + resourceID;
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest("put", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putRoomResource = putRoomResource;
/**
 * This function is used to do the corresponding request
 * ("DELETE") for "room" service that include the resource ID.
 * @param roomID {string}
 * @param resourceID {string}
 * @param callback {function}
 */
var delRoomIDResourcesID = function(roomID, resourceID, callback){
    var endPoint = room.getURI_Id(roomID) + "/resources/" + resourceID;
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest("del", endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delRoomIDResourcesID = delRoomIDResourcesID;


