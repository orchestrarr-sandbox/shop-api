var assert = require('assert');
var parse = require('../lib/args');

describe('args', function () {
  it('parses --port value and --port=value as numbers', function () {
    assert.strictEqual(parse(['--port', '8080']).port, 8080);
    assert.strictEqual(parse(['--port=9090']).port, 9090);
  });
  it('returns nothing for no args and ignores prototype keys', function () {
    assert.strictEqual(parse([]).port, undefined);
    parse(['--__proto__.x=1', '--__proto__=1']);
    assert.strictEqual({}.x, undefined);
  });
});
