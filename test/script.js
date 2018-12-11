const server = require('../server');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

function subtract(a,b) { return a-b; };

suite('subtract test', function() {
 console.log('suite 1');
  test('minus', function(done) { 
  assert.equal(subtract(10,2), 8, 'it should be 8');
  assert.equal(subtract(15,3), 12, 'it should be 12');
  assert.equal(subtract(70,4), 66, 'it should be 66');
  done();
});

});

suite('app test', function() {
 console.log('suite 2');
  test('post', function(done) {
   chai.request(server)
    .post('/api/test')
    .send({
       name: 'Bill',
       age: 23
   })
    .end(function(err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.name, 'Bill');
      assert.equal(res.body.age, 23);
      done();
    });
  });
  
});