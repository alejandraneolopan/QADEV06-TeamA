var ObjectId = require('mongodb').ObjectID;
var generator = require('../utils/generator.js');
var outOfOrder =
{
    "from" : "",
    "to" : "",
    "roomId" : "",
    "title" : "",
    "description" : "",
    "sendEmail" : true,
    "__v" : 0
};
var generateOutOfOrder = function(startDate,dueDate, roomId){
    outOfOrder.from = startDate.toISOString() ;
    outOfOrder.to = dueDate.toISOString();
    outOfOrder.roomId = ObjectId(roomId);
    outOfOrder.title = generator.generateValues();
    outOfOrder.description = generator.generateValues();
    return outOfOrder;
};
exports.generateOutOfOrder = generateOutOfOrder;

var updateId = function(currentId){
    outOfOrder._id = currentId;
};
exports.updateId = updateId;
