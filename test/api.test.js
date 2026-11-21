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
