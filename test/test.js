'use strict'; 

var request = require('request'),
    assert = require('assert'); 

describe('Current Time Service', function() {
  var base_url = 'http://localhost:3000/time';
  var server; 

  before('start server', function() {
    server = require('../server.js'); 
  }); 

  after('close server', function() {
    server.close(); 
  }); 

  describe('GET /time', function() {
    it('returns status code 200', function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it('returns current time', function(done) {
      request.get(base_url, function(error, response, body) {
        var t1 = 0; 
        assert.doesNotThrow(() => {
          let j = JSON.parse(body); 
          if (!j.time) throw new Error('Response body object does not have a time property'); 
          let m = Date.parse(j.time); // returns in milliseconds since epoch  
          if (!m) throw new Error('Value of time property is not a valid ISO 8601 date/time string'); 
          t1 = m;  
        }); 
        var t2 = Date.now(); 
        assert.ok(Math.abs(t2 - t1) < 50, `Time returned by service ${t1} is more than 50ms off current time of ${t2}`); 
        done();
      });
    });
  });
});
