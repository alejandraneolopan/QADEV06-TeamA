var DBmanager = require('../database/dataBaseManager.js');
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://172.20.208.229:27017/roommanager';
var table = 'resourcemodels';

var insertResource = function(resourceToInsert, callbacK){
	DBmanager.setTable(table);
	mongoClient.connect(url, function(err, db) {
		DBmanager.insert(resourceToInsert, db, callbacK);
    });
};

var findResource = function(id, callbacK){
	mongoClient.connect(url, function(err, db) {
		DBmanager.find(ObjectId(id), db, callbacK);
    });
};

var findAllResources = function(callbacK){
	mongoClient.connect(url, function(err, db) {
		DBmanager.findAll(db, callbacK);
    });
};

var removeResource = function(id, callbacK){
	mongoClient.connect(url, function(err, db) {
        DBmanager.remove(ObjectId(id), db, callbacK);
    });
};

exports.insertResource = insertResource;
exports.findResource = findResource;
exports.findAllResources = findAllResources;
exports.removeResource = removeResource;