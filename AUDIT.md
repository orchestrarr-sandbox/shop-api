# Dependency changes and audit

- lodash 4.17.4 -> 4.18.0 (package.json, package-lock.json).
- minimist 0.0.8 removed from dependencies; server.js now parses `--port <n>` / `--port=<n>` by hand
  (util.parseArgs is unavailable on the Dockerfile's node:14). Only transitive minimist 1.2.8 remains (dev: eslint > ... > mkdirp).
- `npm test`: 4 passing. Docker image (node:14-alpine) builds, starts and answers /health.

## Remaining `npm audit` findings (20: 7 low, 13 high), all still OPEN
Production (express 4.16.0): body-parser, cookie, path-to-regexp, qs, send, serve-static, express itself
 -> fix needs express 4.22.x (`npm audit fix --force`, out of declared range; separate change).
Dev only: mocha chain (debug, diff, js-yaml, minimatch, serialize-javascript, flatted/flat-cache) and
eslint chain (tmp, external-editor, inquirer) -> need mocha/eslint bumps.
Not fixed here: out of scope of the two requested alerts. Base image node:14-alpine is also end-of-life.
