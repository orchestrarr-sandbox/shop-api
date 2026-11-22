// Minimal replacement for minimist: only what server.js needs (--port).
// Supports `--port 8080`, `--port=8080`, `-p`-less usage; numeric values are
// coerced to numbers like minimist did. Avoids util.parseArgs (Node >= 18.3)
// because the Dockerfile still builds on node:14.
function parse(argv) {
  var out = {};
  for (var i = 0; i < argv.length; i++) {
    var a = argv[i];
    if (a === '--') break;
    var m = /^--([^=]+)(?:=(.*))?$/.exec(a);
    if (!m) continue;
    var key = m[1];
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    var val = m[2];
    if (val === undefined) {
      var next = argv[i + 1];
      if (next !== undefined && !/^-/.test(next)) { val = next; i++; } else { val = true; }
    }
    if (typeof val === 'string' && val.trim() !== '' && !isNaN(Number(val))) val = Number(val);
    out[key] = val;
  }
  return out;
}
module.exports = parse;
