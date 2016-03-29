/**
 * MongoDB Data Base Manager
 * @module insert,find,findAll, finByParam, remove
 */
var ObjectId = require('mongodb').ObjectID;
var table = '';
/**
 * Create a new document in the database
 * @param {Object} toInsert - Object JSON data according table schema
 * @param {Object} db - Connection with MongoDB database
 * @param {function} callbacK - function for handle the new object
 */
var insert = function (toInsert, db, callback) {
    db.collection(table).insert(
        toInsert
        , function (err, result) {
        console.log("INSERTED");
        callback(result.ops[0]);
        db.close();
    });
};
/**
 * Find a specific object by ID in the database
 * @param {Object} id - Object Id
 * @param {Object} db - Connection with MongoDB database
 * @param {function} callbacK - function for handle the object found
 */
var find = function (id, db, callback) {
    db.collection(table).find(
        {
            "_id":id
        }).toArray(
        function(err, result) {
        console.log("FOUND");
        callback(result[0]);
    });
};
/**
 * Find Objects by a JSON parameters in the database
 * @param {Object} paramJSON - Filters specified in JSON format { data : value,...}
 * @param {Object} db - Connection with MongoDB database
 * @param {function} callbacK - function for handle the object array found
 */
var findByParameters = function (json, db, callback) {
    db.collection(table).find(
        json
        ).toArray(
        function(err, result) {
        console.log("FOUND");
        callback(result);
    });
};

/**
 * Find all objects in the table specified
 * @param {Object} db - Connection with MongoDB database
 * @param {function} callbacK - function for handle the object array found
 */
var findAll = function (db, callback) {
    var collection = db.collection(table).find(
        {
        }).toArray(
        function(err, result) {
        console.log("FOUND-ALL");
        callback(result);
    });
};
/**
 * Delete a specific object by ID in the database according table name
 * @param {Object} id - Object Id
 * @param {function} callbacK - function for handle the object deleted
 */
var remove = function (id, db, callback) {

    db.collection(table).remove(
        {
        	"_id" : id
        }
        , function (err, result) {
        console.log("REMOVED");
        callback();
    });
};
/**
 * Set the current table
 * @param {string} currentTable - Table name
 */
var setTable = function(currentTable){
    table = currentTable;
};

exports.insert = insert;
exports.find = find;
exports.findAll = findAll;
exports.findByParameters = findByParameters;
exports.remove = remove;
exports.setTable = setTable;
