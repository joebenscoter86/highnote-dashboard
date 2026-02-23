// Temporary debug endpoint - dumps raw GuideCX tasks for a project
// Usage: /api/debug?pid=PROJECT_ID
// Remove this file after debugging is complete

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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid") || "9e2b0067-dfc2-430a-8318-a6b0f7567bb2"; // default to coverd

  try {
    // Fetch raw tasks for this project
    const tasks = [];
    let offset = 0;
    const limit = 200;

    while (true) {
      const data = await gcxFetch(`/tasks?projectId=${pid}&limit=${limit}&offset=${offset}`);
      tasks.push(...data.tasks);
      if (tasks.length >= data.metadata.total) break;
      offset += limit;
    }

    // Return raw task data with just the fields we care about
    const summary = tasks.map(t => ({
      name: t.name,
      status: t.status,
      visibility: t.visibility,
      dueDate: t.dueDate,
      completedAt: t.completedAt,
      id: t.id,
      parentId: t.parentId || t.parentTaskId || null,
      milestoneId: t.milestoneId,
    }));

    return new Response(JSON.stringify({
      projectId: pid,
      totalTasks: tasks.length,
      tasks: summary,
    }, null, 2), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const dynamic = "force-dynamic";
