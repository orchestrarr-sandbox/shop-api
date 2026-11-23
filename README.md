# shop-api

A **deliberately rotten** little Express application of a sandbox organisation. It exists to test an orchestrator of coding agents end to end:
find the problems, fix them, merge, deploy to a test machine, verify.

> Never reuse anything from this repository. Everything wrong in it is wrong on purpose. See [SCENARIOS.md](SCENARIOS.md).

```bash
npm install
npm test
npm start            # http://localhost:3000/health
docker compose up -d --build   # http://localhost:3100/health
```

## Dependency notes

- lodash is upgraded to ^4.18.1 (prototype pollution fix).
- minimist was dropped; `lib/port.js` (`portFromArgs`) parses `--port N` / `--port=N` in plain ES5, so it runs on the Dockerfile's Node 14.
