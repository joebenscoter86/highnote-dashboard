# Highnote Implementation Dashboard

Internal status dashboard for the Highnote implementation PM team. Shows project status, task breakdowns, at-risk items, and meeting notes across all active implementations.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import in [Vercel](https://vercel.com/new)
3. Add environment variables (see below)
4. Deploy

## Environment Variables

Set these in Vercel dashboard under Settings > Environment Variables:

```
# GuideCX API (single key for all projects)
GCX_API_TOKEN=your_guidecx_v2_api_token

# Fathom API (one per PM)
FATHOM_KEY_JOE_BENSCOTER=key_here
FATHOM_KEY_KATE_MURPHEY=key_here
FATHOM_KEY_KATIE_HAMM=key_here
FATHOM_KEY_MARY_BOOMSMA=key_here
```

## Architecture

```
src/
  app/
    layout.js          # Next.js root layout
    page.js            # Main page (imports Dashboard)
  components/
    Dashboard.jsx      # Full dashboard UI (client component)
    HNMark.jsx         # Highnote logo mark
  data/
    projects.js        # Static data (Phase 1), replaced by API in Phase 2
  theme.js             # Highnote brand design tokens
  utils/
    urls.js            # GCX deep link URL builders
```

## Roadmap

- **Phase 1** (current): Static data, deployed on Vercel
- **Phase 2**: Live GCX data via `/api/gcx` route
- **Phase 3**: Live Fathom data via `/api/fathom` route (per-PM keys)
- **Phase 4**: Auto-refresh on interval
