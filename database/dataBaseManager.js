var ObjectId = require('mongodb').ObjectID;
var table = '';

var insert = function (toInsert, db, callback) {
    db.collection(table).insertOne(
        toInsert
        , function (err, result) {
        callback(result.ops[0]);
        db.close();
    });
};

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

var findAll = function (db, callback) {
    var collection = db.collection(table).find(
        {
        }).toArray(
        function(err, result) {
        console.log("FOUND-ALL");
        callback(result);
    });
};

var remove = function (id, db, callback) {

    db.collection(table).remove(
        {
        	"_id" : id
        }
        , function (err, result) {
        console.log("REMOVED");
        //console.log(id);
        callback();
    });
};

var setTable = function(currentTable){
    table = currentTable;
};

exports.insert = insert;
exports.find = find;
exports.findAll = findAll;
exports.remove = remove;
exports.setTable = setTable;