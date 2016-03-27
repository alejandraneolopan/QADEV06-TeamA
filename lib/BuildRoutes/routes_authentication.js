var config = require('../../config/config.json');
var rootURI = config.rootURI;
var endPoint = '{root}/login';
/**
 * This function is used to return an specific
 * endpoint("POST") for "authentication" service(https://172.20.208.66:4040/login).
 * @returns {string}
 */
var postURI = function(){
    return endPoint.replace('{root}', rootURI);
};
exports.postURI = postURI;