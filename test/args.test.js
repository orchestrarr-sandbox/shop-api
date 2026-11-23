var assert = require('assert');
var cp = require('child_process');
var path = require('path');
var portFromArgs = require('../lib/args').portFromArgs;

describe('portFromArgs', function () {
  it('parses --port 8000', function () {
    assert.strictEqual(portFromArgs(['--port', '8000']), '8000');
  });
  it('parses --port=8000', function () {
    assert.strictEqual(portFromArgs(['--port=8000']), '8000');
  });
  it('returns undefined when absent or valueless', function () {
    assert.strictEqual(portFromArgs([]), undefined);
    assert.strictEqual(portFromArgs(['--port']), undefined);
    assert.strictEqual(portFromArgs(['--port', '--other']), undefined);
  });
  it('server listens on the --port given on the command line', function (done) {
    var child = cp.spawn(process.execPath, [path.join(__dirname, '..', 'server.js'), '--port', '38123']);
    var out = '';
    child.stdout.on('data', function (d) {
      out += d;
      if (/listening on 38123/.test(out)) { child.kill(); done(); }
    });
    child.on('error', done);
  });
});
