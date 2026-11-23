var assert = require('assert');
var parseArgs = require('../lib/args');

describe('parseArgs', function () {
  it('parses --port forms', function () {
    assert.strictEqual(parseArgs(['--port', '8080']).port, '8080');
    assert.strictEqual(parseArgs(['--port=9000']).port, '9000');
  });
  it('handles flags and positionals', function () {
    var a = parseArgs(['--verbose', 'file']);
    assert.strictEqual(a.verbose, 'file');
    assert.deepStrictEqual(parseArgs(['x', '--', '--y'])._, ['x', '--y']);
  });
  it('ignores prototype pollution keys', function () {
    parseArgs(['--__proto__.x=1', '--__proto__=1']);
    assert.strictEqual({}.x, undefined);
  });
});
