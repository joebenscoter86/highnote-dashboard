# CLAUDE.md

## Project Overview

Internal implementation dashboard for Highnote Platform Inc. Gives PMs (project managers) a single view across all active client implementations, pulling live data from GuideCX (project management) and Fathom (meeting recordings). Deployed on Vercel.

**Owner:** Joe Benscoter, Senior Implementation Manager at Highnote
**Purpose:** Replace the need to click into 15+ individual GuideCX projects to understand team-wide status. Show what's at risk, what's done, what's coming up, and what was discussed in recent calls.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18, no component library, inline styles only
- **Deployment:** Vercel
- **APIs:** GuideCX v2, Fathom v1
- **Dependencies:** Minimal. Only next, react, react-dom. No Tailwind, no CSS modules, no UI frameworks.

## File Structure

```
src/
  app/
    layout.js              # Root layout, minimal
    page.js                # Renders <Dashboard />
    api/
      gcx/route.js         # GuideCX API proxy (~269 lines)
      fathom/route.js      # Fathom API proxy (~204 lines)
  components/
    Dashboard.jsx          # THE file. All UI lives here (~185 lines)
    HNMark.jsx             # Highnote logo SVG component
  data/
    projects.js            # Not actively used (static seed data)
  theme.js                 # Color/font constants (not heavily referenced yet)
  utils/
    urls.js                # URL builder helpers
```

**Dashboard.jsx is the monolith.** All UI, state, filtering, and rendering logic lives in this single file. No seed data; projects and milestones initialize empty and populate from `/api/gcx` on load. Only remaining seed data is `FT` (Fathom meetings placeholder). Components are defined inline (PCard, TLine, FCard, PMRow, Metric, etc.).

## Environment Variables (Vercel)

| Var | Description |
|-----|-------------|
| `GCX_API_TOKEN` | GuideCX v2 legacy workspace token. Scoped to the production workspace with all real projects. |
| `FATHOM_KEYS` | JSON object mapping PM emails to their Fathom API keys. Format: `{"jbenscoter@highnote.com":"key1","mboomsma@highnote.com":"key2"}`. PMs add keys incrementally. |

## API Routes

### GET /api/gcx

Fetches all active projects from GuideCX, retrieves tasks for each, and transforms them into the dashboard's data model.

**Data flow:**
1. `GET /projects?status=ON_TIME&LATE&ON_HOLD` (paginated, 50 per page per status)
2. For each project: `GET /projects/{id}/tasks` and `/projects/{id}/milestones` (in parallel, with per-project error handling)
3. Also fetches: all users (paginated, for assignee name resolution)
4. Transforms each project into: `{ id, name, status, pm, pid, done[], stuck[], risk[], wip[], up[], milestones{} }`

**Error resilience:** Each project's task/milestone fetch is wrapped in its own try/catch. If one project's API call fails (e.g., GuideCX returns 400 "Invalid dependency type"), that project is skipped and logged. The rest of the dashboard still loads.

**Task bucketing logic (critical to understand):**
- `done[]` = status DONE, completed within last 7 days
- `stuck[]` = status STUCK
- `risk[]` = overdue tasks regardless of status (WORKING_ON_IT or NOT_STARTED/NOT_SCHEDULED). Due date string gets `!!` suffix.
- `wip[]` = status WORKING_ON_IT, not overdue, not due within 7 days. These are in-progress tasks with no immediate deadline pressure.
- `up[]` = (WORKING_ON_IT or NOT_STARTED/NOT_SCHEDULED) with due date within the next 7 days. This is the "Next Week" view.

**Key functions:**
- `isOverdue(task)` - Compares due date to today (midnight). Flags NOT_STARTED tasks due today as overdue.
- `isDueNextWeek(task)` - Due date falls between now and 7 days from now. Used for both NOT_STARTED and WORKING_ON_IT tasks.
- `isRecentlyDone(task)` - Completed within last 7 days.
- `transformProject()` - Buckets all tasks for a project into done/stuck/risk/wip/up.

**Caching note:** Vercel edge can cache responses aggressively. The route uses `export const dynamic = "force-dynamic"`. Responses need `Cache-Control: no-store, no-cache, must-revalidate` headers and fetch calls need `cache: "no-store"` to fully bypass caching. This has been a recurring issue.

### GET /api/fathom

Fetches recent meetings from Fathom for all PMs who have provided API keys.

**Data flow:**
1. Parses `FATHOM_KEYS` env var (JSON)
2. For each PM email/key pair: `GET /external/v1/meetings?include_summary=true&recorded_by[]={email}` (last 14 days)
3. Merges results, deduplicates by recording ID, sorts by date descending
4. Parses markdown summaries into structured takeaways/nextSteps arrays

**Returns per meeting:** id, title, date, subscriber (parsed from "HN / Subscriber: sync" title pattern), pm, shareUrl, takeaways[], nextSteps[], attendees, durationMin

## Dashboard UI (Dashboard.jsx)

### Filtering

**PM filter:** Dropdown in header. Filters projects by project manager name. Changing PM resets the project filter to "all."

**Project filter:** Second dropdown in header, populated from PM-filtered projects (`fp`). Selecting a specific project switches to a single-project snapshot view.

**Filter cascade:** `projects` -> `fp` (PM-filtered) -> `sp` (project-filtered) -> all downstream calculations (risk, withDone, withUp, tD, tS, tR, tU, metrics, tab content). `fp` is preserved only for populating the project dropdown options. `byPM` stays derived from the full `projects` array so PM metrics remain consistent.

### Tabs
| Tab | Shows | Filter Logic |
|-----|-------|-------------|
| Team Overview | Per-PM metrics cards | Groups projects by PM, counts at-risk/stuck/done/upcoming (task counts, not project counts) |
| At Risk | Projects with problems | `status=LATE \|\| ON_HOLD \|\| stuck.length>0 \|\| risk.length>0` (project-level status OR task-level issues) |
| Last 7 Days | Recently completed tasks | Projects with `done.length > 0` |
| Next Week | Upcoming tasks (due within 7 days) | Projects with `up.length > 0`. Includes both NOT_STARTED and WORKING_ON_IT tasks. |
| Meetings | Fathom call summaries | From `/api/fathom` (currently showing hardcoded seed data pending deployment) |
| All Projects | Full project list | Expandable cards with sub-tabs |

### Single-Project Snapshot View

When a specific project is selected in the project filter, the tab bar is replaced with a stacked section view designed to be screenshot-friendly for customer sharing. The snapshot shows:

1. **Project header card** with name (linked to GuideCX), status badge, and PM
2. **At Risk** section: stuck + overdue tasks (color: `#dc2626`)
3. **Next Week** section: tasks due within 7 days (color: `#1a1a1a`)
4. **Last 7 Days** section: recently completed tasks (color: `#16a34a`)

Empty sections are hidden. If no tasks exist, a "No tasks to display" message appears. Metrics at the top update to reflect the single project.

### Key UI Functions
- `isOD(task)` - Client-side overdue check. Looks for `!!` suffix or "overdue" in the `due` field string. Used by `TLine` to color overdue task rows based on the `!!` suffix the API route appends to due dates.
- `PCard` - Project card component. Has a `mode` prop: "full" (all sub-tabs), "risk" (stuck + risk tasks), "done", "up". In full mode, sub-tabs are: All, Stuck, At Risk, In Progress, Done (7d), Upcoming. Tabs with zero tasks are hidden.
- `TLine` - Single task row. Links to GuideCX task if pid/tid available.
- `FCard` - Meeting card with expandable takeaways/next steps.

### Deep Linking
Tasks link directly to GuideCX: `https://highnote.guidecx.com/app/projects/{pid}/plan?edit-task=true&task-id={tid}&milestone-id={mid}&task-tab=details`

Milestone IDs are returned dynamically from the GCX API route in `data.milestones` and stored in `_activeMsMap`. The map is keyed by project ID, then milestone name to milestone ID. Starts empty; populates on first API load.

## Design System

- **Brand colors:** Highnote green `#55F5A3`, teal accent `#00FFF0`
- **Background:** Warm cream `#F5F3EB`
- **Cards:** White `#ffffff` with `1px solid #E2E0D6` border, `border-radius: 16px`
- **Status colors:** On Time `#16a34a`, Late `#dc2626`, On Hold `#d97706`
- **Responsibility colors:** Internal `#0d9488`, Customer/Subscriber `#16a34a`, 3rd Party `#d97706`
- **Typography:** Helvetica Neue, system-ui fallback. Monospace for numbers/counts.
- **No external CSS.** All styles are inline via React style objects.

## Known Issues / Backlog

1. **Fathom integration not fully deployed.** Route file exists, FATHOM_KEYS env var is set. Dashboard.jsx still uses hardcoded `FT` array for meetings. Remaining: replace FCard component to use live data, update loadData() to fetch /api/fathom in parallel, wire fathomMeetings state.

2. **GCX caching.** `gcxFetch()` needs `cache: "no-store"` on the fetch call. Success and error Response objects need `Cache-Control: no-store, no-cache, must-revalidate` headers. Without these, Vercel edge serves stale data even after task updates in GuideCX.

## Resolved Issues

1. **NOT_STARTED tasks due today are invisible in At Risk.** Fixed by routing overdue NOT_STARTED tasks into the `risk[]` bucket in the API route, and updating PCard risk mode to render `p.stuck.concat(p.risk)`.

2. **Overdue WIP tasks mixed with healthy WIP tasks.** Fixed by introducing the `risk[]` bucket. Overdue WORKING_ON_IT tasks now land in `risk[]` instead of `wip[]`, giving clear separation between tasks that need attention and tasks progressing normally.

3. **At Risk filter was purely task-based.** Restored project-level status checks (`LATE`, `ON_HOLD`) to the At Risk tab filter so projects surface even without stuck/overdue tasks. This distinguishes between project-level risk (GuideCX status) and task-level risk (overdue/stuck tasks).

4. **Seed data removed.** Deleted static milestone map (`MS`), task builder (`T`), and seed project array (`P`). Dashboard now initializes empty and loads entirely from `/api/gcx`. Eliminates stale data risk and reduces page bundle by ~50%. Fathom seed data (`FT`) retained until live integration is complete.

5. **At Risk metric showed project count instead of task count.** The At Risk metric card, tab badge, and PM breakdown were all incrementing by 1 per project with at-risk tasks instead of summing actual task counts (stuck + overdue). Fixed by adding `tR` variable (`sp.reduce` over `stuck.length + risk.length`) and updating all three locations.

6. **Single bad GuideCX project took down entire dashboard.** `Promise.all` in the GCX route failed fast when any project returned an API error (e.g., 400 "Invalid dependency type"). Wrapped each project's fetch in its own try/catch, logging failures and returning null, then filtering nulls from results.

## Working with Joe

### Technical Level
Joe is not a software engineer but is highly technical for a non-dev. He understands APIs, JSON, environment variables, git basics, and can read code well enough to follow logic. He's been debugging this dashboard alongside Claude for weeks and understands the data flow end to end. Don't over-explain fundamentals; do explain architectural decisions and tradeoffs.

### Workflow Preferences
- **Plan first, then build.** For anything beyond a trivial fix, explain the approach and get a go-ahead before writing code. For small/obvious fixes, just do it.
- **Git:** Commit and push when Joe asks. He may commit himself or ask Claude to do it.
- **Be direct.** No filler, no hedging, no corporate tone. Say what the problem is, what the fix is, and what the tradeoff is.
- **Never use em dashes (--) or double dashes** in any writing. Use commas, periods, semicolons, or restructure. This is a hard rule across all output.
- **Flag unknowns.** If something is ambiguous, say so. Don't guess and hope it works.

### How Joe Uses This Project
This dashboard is a tool Joe built for his own team. He runs 3-5 concurrent client implementations at Highnote and manages a team of PMs (Mary Boomsma, Katie Hamm, Kate Murphey). The dashboard gives him visibility across all projects without clicking into each one individually in GuideCX. Speed and accuracy matter; this is checked daily.

### Conversation Style
Joe communicates in short, direct messages. He'll describe a bug or feature in plain language ("tasks that are not started aren't showing up in the next week tab"). Translate that into the technical context yourself using this file. Don't ask him to look up function names or line numbers.

## Commands

```bash
npm run dev          # Local dev server (localhost:3000)
npm run build        # Production build
vercel --prod        # Deploy to production (if Vercel CLI installed)
```

## Recurring Patterns

**When debugging task visibility issues:** The problem is almost always in the chain: API route bucketing logic -> Dashboard filter -> PCard mode rendering. Check all three layers.

**When adding features to Dashboard.jsx:** The file is large but follows a consistent pattern. UI components are defined as functions at the top, the main Dashboard component is at the bottom. State lives in the Dashboard component. Data transforms happen in useMemo hooks.

**When touching API routes:** Always verify caching behavior. Add `cache: "no-store"` to fetch calls and `Cache-Control` headers to responses. Test by making a change in GuideCX, hitting refresh, and confirming the dashboard reflects it.
