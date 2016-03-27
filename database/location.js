var DBmanager = require('../database/dataBaseManager.js');
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://172.20.208.61:27017/roommanager';
var table = 'locations';
DBmanager.setTable(table);

var insertLocation = function(locationToInsert, callbacK){
	mongoClient.connect(url, function(err, db) {
		DBmanager.insert(locationToInsert, db, callbacK);
    });
};

var findLocation = function(id, callbacK){
	mongoClient.connect(url, function(err, db) {
		DBmanager.find(ObjectId(id), db, callbacK);
    });
};

var findAllLocations = function(callbacK){
	mongoClient.connect(url, function(err, db) {
		DBmanager.findAll(db, callbacK);
    });
};

var removeLocation = function(id, callbacK){
	mongoClient.connect(url, function(err, db) {
        DBmanager.remove(ObjectId(id), db, callbacK);
    });
};

exports.insertLocation = insertLocation;
exports.findLocation = findLocation;
exports.findAllLocations = findAllLocations;
exports.removeLocation = removeLocation;