var expect = require('chai');
var condition =require('../../lib/Conditions/condition.js');
var resourceId = 0;
var resourceJsonFound = null;
var allResources = [];

describe('Resources',function(){
    this.timeout(5000);
    this.slow(4000);

    it('DataBase Spike POST',function(done){
        condition.preCondition.insertResource(
        {
          "name": "TWITTER",
          "customName": "Twitter",
          "fontIcon": "fa fa-twitter",
          "from": "",
          "description": "This is a Twitter Account"
        }
, function(result){
            done();
            resourceId = result._id;
        });
    });

    it('DataBase Spike GET',function(done){
        condition.preCondition.findResource( resourceId, function(result){
            resourceJsonFound = result;
            console.log('-----------------------------------');
            console.log(resourceJsonFound);
            done();
        });  
    });

    it('DataBase Spike GET-ALL',function(done){
        condition.assertion.findAllResources(function(result){
            allResources = result;
            console.log('-----------------------------------');
            console.log(allResources);
            done();
        });  
    });

    it('DataBase Spike DELETE',function(done){
        condition.postCondition.removeResource( resourceId, function(){
            console.log('-----------------------------------');
            done();
        });  
    });
});