/**
 * Room module
 * @module findRoom
 */
var DBmanager = require('../database/dataBaseManager.js');
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dbConfig = require('../config/dbconfig.json');
/**
 * URL representation on the API taken from dbconfig.json.
 * @type {string}
 */
var url = dbConfig.url;
/**
 * collection name in MongoDB
 * @type {string}
 */
var table = dbConfig.tables.room;

/**
 * Find a specific room by ID in the database
 * @param {Object} id - Room Id
 * @param {function} callback - function for handle the object found
 */
var findRoom = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.find(ObjectId(id), db, callback);
    });
};

/**
 * Return all rooms
 * @param {function} callback - function for handle the array
 */
var findAllRooms = function(callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findAll(db, callback);
    });
};

/**
 * Return all rooms pertaining to a service
 * @param {Object} id - Service Id
 * @param {function} callback- function for handle the array
 */
var findAllRoomsOfOneService = function(serviceId, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findByParameters({"serviceId":ObjectId(serviceId)}, db, callback);
    });
};

/**
 * Update a room according the json params
 * @param {string} id - Room Id
 * @param {Object} resourceToInsert - Resource data in JSON structure
 * @param {function} callback - function for handle the object modified
 */
var addResourceToRoom = function(id,resourceToInsert, callback){
        var jsonResource=
        { $push: {
            resources: {
            "quantity": resourceToInsert.quantity,
            "resourceId": resourceToInsert._id.toString(),
                "_id": ObjectId(resourceToInsert._id)
            }
        } };

        mongoClient.connect(url, function(err, db) {
            DBmanager.setTable(table);
            DBmanager.update(ObjectId(id),
                jsonResource,
                db, callback);
        });

};
exports.findRoom = findRoom;
exports.findAllRooms = findAllRooms;
exports.findAllRoomsOfOneService = findAllRoomsOfOneService;
exports.addResourceToRoom = addResourceToRoom;