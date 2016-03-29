var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');

describe("Suit: Resource Service", function(){

    this.slow(10000);
    this.timeout(10000);
    var ID;
    var listResources = [];

    before(function(done){
        request.maut.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var body = generator.generator_resource.generateResource();
        request.mres.postResource(body, function(err, res){
            ID = res.body._id;
            console.log(ID);
            done();
        });
    });

    it('GET /All resources returns status code 200', function(done){
        request.mres.getResource(function(err, res){
            for(var i = 0; i <= res.body.length; i++){
                listResources.push(res.body[i]);
            }

            console.log(res.status);
            done();
        });
    });

    it('GET /A specific resource returns status code 200', function(done){
        request.mres.getResourceID(ID, function(err, res){
            console.log(res.status);
            done();
        });
    });

    it('PUT /A specific resource returns status code 200', function(done){
        var body = generator.generator_resource.generateResource();
        request.mres.putResource(ID, body, function(err, res){
            console.log(res.status);
            done();
        });
    });

    it('DEL /A specific resource returns status code 200', function(done){
        request.mres.delResource(ID, function(err, res){
            console.log(res.status);
            done();
        });
    });

    /*it('DEL /All resources returns status code 200', function(done){
        var body;
        var list = generator.generator_resource.getResourcesList();
        for(var i=0; i <= listResources.length; i++){
            list.id.push(listResources[i]._id);
            console.log("ghjhgk22222  "+listResources[0]._id);
        }
        body = list.id;
        console.log(body);
        request.mres.delAllResources(body, function(err, res){
            console.log(res.status);
            done();
        });
    });*/

});