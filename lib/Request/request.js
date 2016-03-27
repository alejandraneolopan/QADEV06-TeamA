var request = require('../../node_modules/superagent');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;


/**
 * This function is for building the API request, assigns parameters according to
 * type of request.
 * when this function receive 3 parameters, the third parameter change to callback.
 * @param type {string} : ('post', 'put', 'get', 'del')
 * @param endPoint {string}
 * @param dataRequest {json}
 * @param callback {function}
 */
var buildRequest = function(type, endPoint, dataRequest, callback){
    var req;
    if(arguments.length === 3){
        var callback = arguments[2];
        var dataRequest = {};
        console.log(endPoint);
    }else{
        dataRequest = setAuthorization(dataRequest);
    }

    switch(type){
        case "post":
            req = request.post(endPoint);
            finishRequestPostPut(req, dataRequest, callback);
            break;
        case "put":
            req = request.put(endPoint);
            finishRequestPostPut(req, dataRequest, callback);
            break;
        case "get":
            req = request.get(endPoint);
            finishRequestGetDel(req, dataRequest, callback);

            break;
        case "del":
            req = request.del(endPoint);
            finishRequestGetDel(req, dataRequest, callback);
            break;
    }

};
exports.buildRequest = buildRequest;

/**
 * This function is to finishing of build a get or delete request type.
 * @param req {function}
 * @param dataRequest {json}
 * @param callback {function}
 */
var finishRequestGetDel = function(req, dataRequest, callback){

    if(dataRequest.Authorization !== undefined)
        req = req.set(headers.get.Authorization.name, dataRequest.Authorization);

    req
        .end(function(err,res){
            callback(err, res);
        });
};

/**
 * This function is to finishing of build a post or put request type.
 * @param req {function}
 * @param dataRequest {json}
 * @param callback {function}
 */
var finishRequestPostPut = function(req, dataRequest, callback){

        req = req
            .set(headers.get.ContentType.name, headers.get.ContentType.value);

        if(dataRequest.Authorization !== ""){
            req = req
                .set(headers.get.Authorization.name, dataRequest.Authorization);
        }

        req
        .send(dataRequest.body)
        .end(function(err,res){
            callback(err, res);
        });
};

/**
 * This function is to set the authorization according to one type.
 * @param dataRequest {json}
 * @returns {json}
 */
var setAuthorization = function(dataRequest){
    var auth = dataRequest.Authorization;
    if(auth === "jwt ") {
        auth = headers.get.Authorization.jwt;
    }
    else if(auth === "Basic ") {
        auth = headers.get.Authorization.basic;
    }
    else if(auth === "") {
        auth = "";
    }
    dataRequest.Authorization = auth;

    return dataRequest;
}
