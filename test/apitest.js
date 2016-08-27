var expect = require('chai').expect;
var request = require('request');


describe("API Test", function (){
  describe('Basic Get', function (){
    it('Calls API', function(done){
      request('http://127.0.0.1:3000/api/games', function (error, response, body){
        expect(response.statusCode).to.equal(200);
        done();
      })
    })
  })
  describe('Put Game', function(){
    it('PUT Game', function(done){
      request.put('http://127.0.0.1:3000/api/games')

    })
  })
})
