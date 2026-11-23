// Minimal replacement for the abandoned "minimist" package.
// Supports: --key=value, --key value, --flag, --no-flag, -k value, -abc, "--" and positionals.
// Numeric-looking values become numbers, like minimist did.
function coerce(v) {
  if (typeof v === 'string' && v.trim() !== '' && isFinite(Number(v))) return Number(v);
  return v;
}

function isValue(s) {
  return s !== undefined && (s[0] !== '-' || /^-\d/.test(s));
}

function set(out, key, val) {
  if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
  if (Object.prototype.hasOwnProperty.call(out, key)) {
    out[key] = [].concat(out[key], val);
  } else {
    out[key] = val;
  }
}

function parse(argv) {
  var out = { _: [] };
  for (var i = 0; i < argv.length; i++) {
    var a = String(argv[i]);
    var m;
    if (a === '--') {
      out._ = out._.concat(argv.slice(i + 1).map(coerce));
      break;
    } else if ((m = /^--([^=]+)=([\s\S]*)$/.exec(a))) {
      set(out, m[1], coerce(m[2]));
    } else if ((m = /^--no-(.+)$/.exec(a))) {
      set(out, m[1], false);
    } else if ((m = /^--(.+)$/.exec(a))) {
      if (isValue(argv[i + 1])) { set(out, m[1], coerce(String(argv[++i]))); } else { set(out, m[1], true); }
    } else if (/^-[^-]+/.test(a)) {
      var letters = a.slice(1).split('');
      for (var j = 0; j < letters.length; j++) {
        if (j === letters.length - 1) {
          if (isValue(argv[i + 1])) { set(out, letters[j], coerce(String(argv[++i]))); } else { set(out, letters[j], true); }
        } else {
          set(out, letters[j], true);
        }
      }
    } else {
      out._.push(coerce(a));
    }
  }
  return out;
}

module.exports = parse;
