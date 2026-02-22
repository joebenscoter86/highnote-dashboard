// /api/gcx - Fetches live project data from GuideCX API
// Uses a single workspace token (env: GCX_API_TOKEN) that has access to all projects

const GCX_BASE = "https://api.guidecx.com/api/v2";

async function gcxFetch(path) {
  const token = process.env.GCX_API_TOKEN;
  if (!token) throw new Error("GCX_API_TOKEN not configured");

  const res = await fetch(`${GCX_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GCX API error ${res.status}: ${text}`);
  }

  return res.json();
}

// Build a user lookup map: userId -> "FirstName L."
async function buildUserMap() {
  const map = {};
  let offset = 0;
  const limit = 100;

  // Paginate through all users
  while (true) {
    const data = await gcxFetch(`/users?limit=${limit}&offset=${offset}`);
    for (const u of data.users) {
      const last = (u.lastName || "").trim();
      map[u.id] = `${u.firstName} ${last ? last[0] + "." : ""}`.trim();
    }
    if (data.users.length < limit) break;
    offset += limit;
  }

  return map;
}

// Fetch all projects with ON_TIME, LATE, and ON_HOLD statuses
async function fetchProjects() {
  const statuses = ["ON_TIME", "LATE", "ON_HOLD"];
  const all = [];

  for (const status of statuses) {
    const data = await gcxFetch(`/projects?status=${status}&limit=50`);
    all.push(...data.projects);
  }

  return all;
}

// Fetch milestones for a project and return id->name map
async function fetchMilestones(projectId) {
  const data = await gcxFetch(`/projects/${projectId}/milestones?limit=50`);
  const map = {};
  for (const m of data.milestones) {
    map[m.id] = m.name;
  }
  return map;
}

// Fetch all tasks for a project (limit 200 covers most projects in one call)
async function fetchTasks(projectId) {
  const tasks = [];
  let offset = 0;
  const limit = 200;

  while (true) {
    const data = await gcxFetch(
      `/tasks?projectId=${projectId}&limit=${limit}&offset=${offset}`
    );
    tasks.push(...data.tasks);
    if (tasks.length >= data.metadata.total) break;
    offset += limit;
  }

  return tasks;
}

// Determine if a task was completed in the last 7 days
function isRecentlyDone(task) {
  if (!task.completedAt) return false;
  const completed = new Date(task.completedAt);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return completed >= sevenDaysAgo;
}

// Determine if a task is due within the next 7 days
function isDueNextWeek(task) {
  if (!task.dueDate) return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return due >= now && due <= nextWeek;
}

// Determine if a task is overdue
function isOverdue(task) {
  if (!task.dueDate || task.status === "DONE" || task.status === "NOT_APPLICABLE") return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (due < now) return true;
  // NOT_STARTED tasks due today are effectively at risk
  if (task.status === "NOT_STARTED" && due.getTime() === now.getTime()) return true;
  return false;
}

// Format a date as "Feb 19" style
function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

// Map responsibility codes
const RESP_MAP = {
  CUSTOMER: "CUSTOMER",
  INTERNAL: "INTERNAL",
  THIRD_PARTY: "THIRD_PARTY",
};

// Transform raw GCX data into the dashboard's expected format
function transformProject(project, tasks, milestoneMap, userMap) {
  const pm = project.projectManager;
  const pmName = `${pm.firstName} ${pm.lastName}`.trim();

  // Bucket tasks by dashboard category
  const done = [];
  const stuck = [];
  const risk = [];
  const wip = [];
  const up = [];

  for (const t of tasks) {
    // Skip hidden/not applicable tasks
    if (t.status === "NOT_APPLICABLE" || t.visibility === "HIDDEN") continue;

    const milestoneName = milestoneMap[t.milestoneId] || null;
    const assigneeName = t.assigneeId ? userMap[t.assigneeId] || null : null;
    const overdue = isOverdue(t);
    const resp = RESP_MAP[t.responsibility] || "INTERNAL";

    const taskObj = {
      n: t.name.trim(),
      r: resp,
      s: t.status,
      tid: t.id,
      m: milestoneName,
    };

    if (assigneeName) taskObj.a = assigneeName;

    if (t.status === "DONE") {
      // Only include recently completed tasks
      if (isRecentlyDone(t)) {
        taskObj.date = formatDate(t.completedAt);
        done.push(taskObj);
      }
    } else if (t.status === "STUCK") {
      stuck.push(taskObj);
    } else if (t.status === "WORKING_ON_IT") {
      if (overdue) {
        taskObj.due = formatDate(t.dueDate) + " !!";
        risk.push(taskObj);
      } else if (isDueNextWeek(t)) {
        taskObj.due = formatDate(t.dueDate);
        up.push(taskObj);
      } else {
        if (t.dueDate) taskObj.due = formatDate(t.dueDate);
        wip.push(taskObj);
      }
    } else if (t.status === "NOT_STARTED" || t.status === "NOT_SCHEDULED") {
      if (overdue) {
        taskObj.due = formatDate(t.dueDate) + " !!";
        risk.push(taskObj);
      } else if (isDueNextWeek(t)) {
        taskObj.due = formatDate(t.dueDate);
        up.push(taskObj);
      }
    }
  }

  // Build the milestone ID map for deep linking
  const msMap = {};
  for (const [id, name] of Object.entries(milestoneMap)) {
    msMap[name] = id;
  }

  return {
    id: project.id,
    name: project.name.replace(/ Implementation.*$| - .*$/, "").trim(),
    status: project.status,
    pm: pmName,
    pid: project.id,
    done,
    stuck,
    risk,
    wip,
    up,
    milestones: msMap,
  };
}

export async function GET() {
  try {
    // Fetch users first (needed for assignee name resolution)
    const userMap = await buildUserMap();

    // Fetch all active projects
    const projects = await fetchProjects();

    // For each project, fetch tasks and milestones in parallel
    const results = await Promise.all(
      projects.map(async (project) => {
        const [tasks, milestoneMap] = await Promise.all([
          fetchTasks(project.id),
          fetchMilestones(project.id),
        ]);
        return transformProject(project, tasks, milestoneMap, userMap);
      })
    );

    // Build a combined milestone map for deep linking
    const milestoneIndex = {};
    for (const p of results) {
      if (p.milestones && Object.keys(p.milestones).length > 0) {
        milestoneIndex[p.pid] = p.milestones;
      }
    }

    // Clean up: remove milestones from individual projects (it's in the index now)
    const cleanProjects = results.map(({ milestones, ...rest }) => rest);

    return new Response(JSON.stringify({
      projects: cleanProjects,
      milestones: milestoneIndex,
      fetchedAt: new Date().toISOString(),
    }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (err) {
    console.error("GCX API error:", err);
    return new Response(JSON.stringify(
      { error: err.message || "Failed to fetch GCX data" }
    ), {
      status: 500,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }
}

// Force dynamic rendering - every request fetches fresh data from GCX
export const dynamic = "force-dynamic";
