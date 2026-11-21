# Scenarios

What is wrong, on purpose, and what a good fix looks like. This is the acceptance list for Orchestrarr: each scenario must end with the application healthy again, the tests passing and nothing else changed.

| # | What is wrong | Where | A good fix |
|---|---|---|---|
| S1 | **Vulnerable dependencies** with known advisories (`express`, `lodash`, `minimist`, and dev tools) | `package.json` | Bump to a fixed version, keep the tests green, no unrelated change |
| S2 | **A major bump that breaks the build**: Express 5 no longer accepts the `*` catch-all route | `server.js` (last route) | After the bump, change the route to the new syntax; the 404 test still passes |
| S3 | **End-of-life base image** `node:14-alpine` | `Dockerfile` | Move to a maintained Node LTS image; `/health` still answers after the deployment |
| S4 | **Outdated GitHub Actions and Node version** in the CI | `.github/workflows/ci.yml` | Current actions, a maintained Node version, `npm ci` |
| S5 | **Sloppy CI**: lint errors are ignored (`continue-on-error`), `npm install` instead of `npm ci`, no cache | `.github/workflows/ci.yml` | Lint blocks, install is reproducible |
| S6 | **Code smells**: `var`, loose equality, a mutable global, an unused variable, the same filter written twice, deep nesting, `console.log` | `server.js`, `lib/items.js` | Lint is clean, behaviour unchanged, the duplicated filter is shared |
| S7 | **Container smells**: runs as root, no health check, `npm install` in the image | `Dockerfile` | Non-root user, `HEALTHCHECK`, `npm ci --omit=dev` |
| S8 | **A deployment that fails**: a version whose container starts but does not answer `/health` | to be added when the deploy vertical exists | The smoke test fails and the previous version is restored, with a report |

Not on purpose: there is no secret and no exploitable code here (no `eval`, no injection), because the container is reachable on the local network.
