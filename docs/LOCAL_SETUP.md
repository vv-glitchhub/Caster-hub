# Local Setup

## Caster-hub

```bash
cd Caster-hub
npm install
npm run dev
```

Open:

```text
http://localhost:3000/start
http://localhost:3000/quick-use
http://localhost:3000/runbook
http://localhost:3000/backup
```

## Scorecaster

```bash
cd scorecaster
npm install
npm run dev
```

Open:

```text
http://localhost:3000/quick-use
```

## Stockcaster

```bash
cd Stockcaster-
npm install
npm run dev
```

Open:

```text
http://localhost:3000/quick-use
```

## Env

Copy:

```bash
cp .env.example .env.local
```

Do not commit `.env.local`.

## Local data

Quick-use data is currently saved in browser localStorage.

Use:

```text
http://localhost:3000/backup
```
