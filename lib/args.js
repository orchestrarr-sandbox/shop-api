// Minimal replacement for minimist: only the --port flag is used.
// Supports "--port 8000" and "--port=8000"; the last occurrence wins.
function portFromArgs(argv) {
  var port;
  for (var i = 0; i < argv.length; i++) {
    var a = String(argv[i]);
    if (a === '--') break;
    if (a === '--port') {
      var next = argv[i + 1];
      if (next !== undefined && String(next).indexOf('-') !== 0) {
        port = String(next);
        i++;
      }
    } else if (a.indexOf('--port=') === 0) {
      port = a.slice('--port='.length);
    }
  }
  return port ? port : undefined;
}

module.exports = { portFromArgs: portFromArgs };
