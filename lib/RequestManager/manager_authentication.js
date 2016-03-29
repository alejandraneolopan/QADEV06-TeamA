var request = require('../Request/request.js');
var authentication = require('../../lib/BuildRoutes/routes_authentication.js');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
var generator = require('../../utils/generator.js');
var headersArray = [];

var postLogin = function(callback){
    var endPoint = authentication.postURI();
    var body = {"username": config.username, "password": config.password, "authentication": "local"};

    var dataRequest = {"Authorization" : "", "body": body};
    request.buildRequest("post", endPoint, dataRequest, function(err, res){

        headers.get.Authorization.jwt = config.typeAuthentication.jwt + res.body.token;
        headers.get.Authorization.basic = config.typeAuthentication.basic + "TODO";
        callback(err, res);
    });
};
exports.postLogin = postLogin;

var postLoginIncorrect = function(type, callback){
    var password;
    var account;
    var endPoint = authentication.postURI();
    var body;
    switch(type){
        case "incorrectPassword":
            password = generator.generateValues();
            body = {"username": config.username, "password": password, "authentication": "local"};
            break;
        case "incorrectAccount":
            account = generator.generateValues();
            body = {"username": account, "password": config.password, "authentication": "local"};
            break;
        case "incorrectSyntax":
            body = {"username": "]"+config.username, "password": config.password, "authentication": "local"};
            break;
        case "missRequeriment":
            body = {"username": config.username, "authentication": "local"};
            break;
    }
    var dataRequest = {"Authorization" : "", "body": body};
    request.buildRequest("post", endPoint, dataRequest, function(err, res){

        headers.get.Authorization.jwt = config.typeAuthentication.jwt + res.body.token;
        headers.get.Authorization.basic = config.typeAuthentication.basic + "TODO";
        callback(err, res);
    });
};
exports.postLoginIncorrect = postLoginIncorrect;

