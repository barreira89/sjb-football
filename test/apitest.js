var expect = require('chai').expect;
var request = require('request');


describe("API Test", function (){
  describe('Basic Get', function (){
    it('Calls API', function(done){
      request('http://127.0.0.1:3000/api/games', function (error, response, body){
        expect(response.statusCode).to.equal(200);
        expect(body.length).to.equal(49003);
        done();
      })
    })
  })
})
