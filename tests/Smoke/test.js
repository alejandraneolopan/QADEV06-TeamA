var expect = require('chai');
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');



describe("suit", function() {

    var random;

    this.slow(10000);

    beforeEach(function(done){
        random = generator.generator_resource.generateResource();
        done();
    });

    it("1", function(){
        console.log(random);
    });

});