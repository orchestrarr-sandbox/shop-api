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
