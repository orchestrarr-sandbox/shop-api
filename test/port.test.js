var assert = require('assert');
var portFromArgs = require('../lib/port');

describe('portFromArgs', function () {
  it('reads "--port N"', function () {
    assert.strictEqual(portFromArgs(['--port', '8080']), '8080');
  });
  it('reads "--port=N"', function () {
    assert.strictEqual(portFromArgs(['--port=9090']), '9090');
  });
  it('returns undefined when absent', function () {
    assert.strictEqual(portFromArgs(['--other', '1']), undefined);
    assert.strictEqual(portFromArgs([]), undefined);
  });
});
