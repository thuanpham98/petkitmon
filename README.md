### Architecture : Domain driven design.

## How to run dev?

### Step 1 : copy this into .env

```
ENV_PREFIX=PETKITMON_
PETKITMON_HOST=http://localhost:8000/petkitmon
PETKITMON_BASE_PATH=/petkitmon/
PETKITMON_MODE=production
```

### Step 2 : run script `pnpm run dev`

## How to run production?

### Step 1 : copy this into .env

```
ENV_PREFIX=PETKITMON_
PETKITMON_HOST=http://localhost:8000/petkitmon
PETKITMON_BASE_PATH=/petkitmon/
PETKITMON_MODE=production
```

### Step 2 : run script `pnpm run build`

### Step 3 : run script `cp .env dist`.

