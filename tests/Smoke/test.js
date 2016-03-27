var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');


var request = require('../../node_modules/superagent');


describe("suit", function() {

    var random;

    this.slow(10000);

    beforeEach(function(done){
        random = generator.generator_resource.generateResource();
        done();
    });

    it.only("1", function(){
        console.log(typeof(request));
    });

});