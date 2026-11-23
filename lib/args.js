// Minimal replacement for minimist, compatible with Node 14 (no util.parseArgs).
// Supports --key value, --key=value, and bare --flag (true). Other tokens go to `_`.
function parseArgs(argv) {
  var out = Object.create(null);
  out._ = [];
  for (var i = 0; i < argv.length; i++) {
    var arg = argv[i];
    if (arg === '--') {
      out._ = out._.concat(argv.slice(i + 1));
      break;
    }
    var m = /^--([^=]+)(?:=(.*))?$/.exec(arg);
    if (!m) {
      out._.push(arg);
      continue;
    }
    var key = m[1];
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    if (m[2] !== undefined) {
      out[key] = m[2];
    } else if (i + 1 < argv.length && argv[i + 1].charAt(0) !== '-') {
      out[key] = argv[++i];
    } else {
      out[key] = true;
    }
  }
  return out;
}

module.exports = parseArgs;
