var request = require('supertest');
var assert = require('assert');
var app = require('../server');

describe('api', function () {
  it('answers on /health', function (done) {
    request(app).get('/health').expect(200).end(function (err, res) {
      if (err) return done(err);
      assert.strictEqual(res.body.status, 'ok');
      done();
    });
  });

  it('lists the items in stock, cheapest first', function (done) {
    request(app).get('/items').expect(200).end(function (err, res) {
      if (err) return done(err);
      assert.deepStrictEqual(res.body.map(function (i) { return i.name; }), ['rope', 'anchor', 'compass']);
      done();
    });
  });

  it('filters by maxPrice', function (done) {
    request(app).get('/items?maxPrice=40').expect(200).end(function (err, res) {
      if (err) return done(err);
      assert.strictEqual(res.body.length, 2);
      done();
    });
  });

  it('answers 404 on an unknown route', function (done) {
    request(app).get('/nothing/here').expect(404, done);
  });
});

describe('args parser', function () {
  var parse = require('../lib/args');
  var assert = require('assert');
  it('parses --port in its forms', function () {
    assert.strictEqual(parse(['--port', '8080']).port, 8080);
    assert.strictEqual(parse(['--port=9090']).port, 9090);
    assert.strictEqual(parse([]).port, undefined);
  });
  it('handles flags, positionals and ignores __proto__', function () {
    var r = parse(['-v', 'file', '--no-color', '--__proto__=x']);
    assert.strictEqual(r.v, 'file');
    assert.strictEqual(r.color, false);
    assert.strictEqual(({}).x, undefined);
    assert.strictEqual(Object.getPrototypeOf(r), Object.prototype);
  });
});
