var expect = require('chai').expect;
var request = require('request');
const baseUrl = 'http://127.0.0.1:3000/api/';

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
    it('PUT Game', function(done) {
      request.put(baseUrl + '/games', (err, response, body) => {
      expect(response.statusCode).to.equal(400);
      done();
      })
    })
  })
  describe('GET Configuratinons', () =>{
    it('GET All Configurations', (done) =>{
      request.get(baseUrl + '/configurations', (err, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.exist;
        done();
      })
    })
  })
})
