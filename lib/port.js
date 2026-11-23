// Reads the port from "--port N" or "--port=N"; returns undefined when absent.
function portFromArgs(argv) {
  for (var i = 0; i < argv.length; i++) {
    if (argv[i] === '--port' && i + 1 < argv.length) return argv[i + 1];
    if (argv[i].indexOf('--port=') === 0) return argv[i].slice('--port='.length);
  }
  return undefined;
}

module.exports = portFromArgs;
