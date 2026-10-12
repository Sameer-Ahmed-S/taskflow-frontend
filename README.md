# taskflow-frontend

TaskFlow UI — React (Vite). **Consumes** the API contract only; never talks to the DB (ADR-001).

| Repo | Role |
|------|------|
| [taskflow-db](https://github.com/Sameer-Ahmed-S/taskflow-db) | Postgres schema + migrations |
| [taskflow-backend](https://github.com/Sameer-Ahmed-S/taskflow-backend) | Express API implementing the contract |
| **taskflow-frontend** (this) | React SPA |

The authoritative spec is **not in GitHub** — it lives locally at `..\spec\` (relative to this repo, i.e. `taskflow-demo\spec\`). The contract this app implements against: `..\spec\contracts\tasks-api.yaml`.

## Run locally

```sh
cp .env.example .env   # points at the backend on :4000
npm install
npm run dev            # http://localhost:5173
```

Requires `taskflow-db` and `taskflow-backend` running.

## Change process (SDD)

UI behavior derives from the spec. Contract changes land in the backend repo first (ADR-002); this repo only updates `src/api.js` and the affected components afterward.
