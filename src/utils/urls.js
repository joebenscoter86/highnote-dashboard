import { GCX_BASE, MILESTONE_MAP } from "../data/projects";

export function taskUrl(pid, tid, milestoneName) {
  if (!pid || !tid) return null;
  const mid = MILESTONE_MAP[pid]?.[milestoneName] || "";
  return (
    GCX_BASE + pid + "/plan?edit-task=true&task-id=" + tid +
    (mid ? "&milestone-id=" + mid : "") + "&task-tab=details"
  );
}

export function projectUrl(pid) {
  return pid ? GCX_BASE + pid + "/overview" : null;
}
