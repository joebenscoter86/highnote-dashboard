// GCX base URL for deep links
export const GCX_BASE = "https://highnote.guidecx.com/app/projects/";

// Milestone ID map for deep linking into GCX task views
// Structure: { projectId: { milestoneName: milestoneId } }
export const MILESTONE_MAP = {
  "7cfa08d5-1dea-41aa-8425-b1c2ed032a83": {
    "MC Preparation": "c6206138-1fc6-46ba-a5ac-05b981723c97",
    "Mastercard Preparation": "c6206138-1fc6-46ba-a5ac-05b981723c97",
    "NEX Preparation": "bbcb3110-b06b-43d8-8280-70612f125699",
    "Ops Prep": "6dfe98b2-a3b2-4114-8b2e-09d16d7a08f2",
    "Phase 1": "41a7a34a-ec59-43e7-a0e1-2b5c64778dc9",
  },
  "e99c8ce5-ad35-4a8a-92ea-41d9414ba7c1": {
    "Digital Wallet Cards": "f23f4a1f-f775-452a-b8d1-c5483a4dc784",
    "Collateral and Policies": "9e049149-cd3b-408a-a3ef-358f4c17d4ac",
    "System Configuration": "589625a4-f584-4236-b609-b4ba4a614667",
    "Testing": "375703d8-9a04-4aad-94df-bc8f7962a704",
    "Launch Readiness": "6705c818-b2cc-42d5-a995-de16ca6c0a20",
    "CRB": "98d799d2-2aed-4f52-ae8a-8bbadc6e0b19",
  },
  "48cfccd4-15fc-42b0-bc19-ea05970be555": {
    "CRB": "ceafbdfc-ea04-4b3a-b460-25d712abf312",
    "Testing": "6ff4a881-f3c1-41a2-a350-0dcd6332d079",
    "Launch Readiness": "7dcac8b6-183a-483e-89f3-6826d8f9ad27",
    "Policies and Procedures": "cb7686dc-d91d-4279-8f67-ad9430f402fd",
  },
  "86e695c2-855b-4ebf-be32-ba789f10ac70": {
    "Policies and Procedures": "65cc0dda-bcfa-49c6-9234-2cdfbe8c4ed0",
    "Program Collateral": "bf8d4ea4-0afd-4646-b620-3ae0c50d1eaf",
    "Technical Implementation": "71657126-3471-415b-b028-28ca23533adc",
    "Transpecos Bank": "ecb1a3c4-50c2-440f-9b1c-9d2dca00a7dc",
    "Due Diligence": "1de9b13d-08ff-45f4-9ca5-36a6f4c3bd3e",
    "System Configuration": "3d6dafc8-7413-434d-a46e-18cb62aad5cd",
    "Testing": "7f5e8a7d-7a45-4379-aa40-bfe434e2acf4",
    "Launch Readiness": "d90e4c7f-9ab2-4a1d-bb2d-9f85c39ecab3",
  },
  "69d2416f-7537-4062-80d8-b937f204c4bc": {
    "Post Sales": "0f87e88a-48ff-474c-a3e9-5f64e3e0e7b3",
    "Kickoff": "37a6b5a2-45d3-412b-bc3e-7d56f8c9a1e4",
    "Due Diligence": "8c4d2e1f-6b3a-49c7-85d2-1e7f4a9b3c6d",
    "Onboarding": "a2b4c6d8-1e3f-5a7b-9c0d-2e4f6a8b0c1d",
  },
  "9e2b0067-dfc2-430a-8318-a6b0f7567bb2": {
    "Post Sales": "b3c5d7e9-2f4a-6b8c-0d1e-3f5a7b9c1d2e",
    "Due Diligence": "c4d6e8f0-3a5b-7c9d-1e2f-4a6b8c0d2e3f",
    "CRB": "d5e7f9a1-4b6c-8d0e-2f3a-5b7c9d1e3f4a",
    "Technical Implementation": "e6f8a0b2-5c7d-9e1f-3a4b-6c8d0e2f4a5b",
    "System Configuration": "f7a9b1c3-6d8e-0f2a-4b5c-7d9e1f3a5b6c",
    "Policies and Procedures": "a8b0c2d4-7e9f-1a3b-5c6d-8e0f2a4b6c7d",
    "Testing": "b9c1d3e5-8f0a-2b4c-6d7e-9f1a3b5c7d8e",
    "Launch Readiness": "c0d2e4f6-9a1b-3c5d-7e8f-0a2b4c6d8e9f",
  },
};

// Task builder helper
function T(n, r, s, x) {
  return Object.assign(
    {
      n: n,
      r: { I: "INTERNAL", C: "CUSTOMER", T: "THIRD_PARTY", M: "MIXED" }[r || "I"] || "INTERNAL",
      s: s,
    },
    x || {}
  );
}

// ============================================================
// STATIC PROJECT DATA (Phase 1)
// In Phase 2, this will be replaced by /api/gcx endpoint
// ============================================================
export const PROJECTS = [
  {
    id: "mc",
    name: "Mastercard Cloud Edge",
    status: "LATE",
    pm: "Katie Hamm",
    pid: "7cfa08d5-1dea-41aa-8425-b1c2ed032a83",
    done: [],
    stuck: [],
    wip: [
      T("Request additional MC resources", "I", "WORKING_ON_IT", { m: "MC Preparation", due: "overdue", tid: "8568b7a3-dc2b-4eb1-8a3f-9443bce809c5" }),
      T("Communicate Scope", "I", "WORKING_ON_IT", { m: "MC Preparation", due: "overdue", tid: "0c742736-6eed-44d8-bb02-581a9163949a" }),
      T("Coordination with NEX", "I", "WORKING_ON_IT", { m: "MC Preparation", due: "overdue", tid: "8760f214-990b-4c24-b81b-a076612e7800" }),
      T("Coordination with MC", "I", "WORKING_ON_IT", { m: "NEX Preparation", due: "overdue", tid: "7e4ab5b1-f332-4438-9550-44e74689bd3e" }),
      T("Communicate Scope", "I", "WORKING_ON_IT", { m: "NEX Preparation", due: "overdue", tid: "ce3b8ab4-d429-449e-95dc-183a26736c90" }),
      T("Request additional NEX resources", "I", "WORKING_ON_IT", { m: "NEX Preparation", due: "overdue", tid: "f31d9a9a-518d-4637-b37c-500f48e5a279" }),
      T("HN Project Plan sign off", "I", "WORKING_ON_IT", { m: "NEX Preparation", due: "overdue", tid: "6eac4495-c155-4c46-8669-363acc5cf051" }),
      T("Ensure NGOM/MCOM access", "I", "WORKING_ON_IT", { m: "Ops Prep", due: "overdue", tid: "9e48a176-58b8-4621-a978-4cb6c3c22f88" }),
    ],
    up: [
      T("Cut Over ICA 32216", "I", "NOT_STARTED", { m: "Phase 1", due: "Feb 19", tid: "7a654233-c7b2-4ee2-a19a-f71b4343ccdc" }),
      T("Cut Over ICA 33097", "I", "NOT_STARTED", { m: "Phase 1", due: "Feb 19", tid: "236e5bea-5ee0-4507-9486-5bb508e97e66" }),
      T("Cut Over ICA 33291", "I", "NOT_STARTED", { m: "Phase 1", due: "Feb 19", tid: "cc3ece7b-3b8f-4bc2-8037-c80f2f8cf1d4" }),
      T("Cut Over ICA 33290", "I", "NOT_STARTED", { m: "Phase 1", due: "Feb 19", tid: "fbe86e37-f2b6-4721-85c8-cb43224a2562" }),
      T("Cut Over ICA 33289", "I", "NOT_STARTED", { m: "Phase 1", due: "Feb 19", tid: "d394bf39-31fe-41ca-8d57-e4cce5bfd3c0" }),
    ],
  },
  {
    id: "roadflex",
    name: "Roadflex",
    status: "LATE",
    pm: "Kate Murphey",
    pid: "e99c8ce5-ad35-4a8a-92ea-41d9414ba7c1",
    done: [],
    stuck: [],
    wip: [
      T("Submit Digital Wallet Items", "I", "WORKING_ON_IT", { m: "Digital Wallet Cards", a: "Kate M.", tid: "551eddb5-7ed7-409b-a35e-c160d4d20aca" }),
      T("Collateral Review", "I", "WORKING_ON_IT", { m: "Collateral and Policies", a: "Kate M.", tid: "92ef5ad5-5f13-4fac-8cf9-b1611639ca7a" }),
    ],
    up: [
      T("Create Card Profile", "I", "NOT_STARTED", { m: "System Configuration", a: "Kate M.", due: "Feb 25", tid: "4d65fdc9-1cb3-46c6-b665-2fe6fcfe8a1c" }),
      T("Configure Product", "I", "NOT_STARTED", { m: "System Configuration", a: "Kate M.", due: "Feb 24", tid: "73bb3494-6023-483b-9b65-8e496560ae5e" }),
      T("System Config Complete", "I", "NOT_STARTED", { m: "System Configuration", a: "Jody S.", due: "Feb 25", tid: "306ac612-f678-45f0-acfb-d4e85b7d35ce" }),
      T("Testing approval", "I", "NOT_STARTED", { m: "Testing", a: "Kate M.", due: "Feb 24", tid: "bdcb82d7-fb9e-414b-8e24-b07df8a2eaba" }),
      T("Request test funds", "I", "NOT_STARTED", { m: "Testing", a: "Kate M.", due: "Feb 26", tid: "91b011b8-1bac-43fa-85af-dc3d76b738ef" }),
      T("Final Collateral filed", "I", "NOT_STARTED", { m: "Launch Readiness", a: "Kate M.", due: "Feb 23", tid: "208974a3-ab85-4139-8057-bb9ebf11d889" }),
      T("Final Policies filed", "I", "NOT_STARTED", { m: "Launch Readiness", a: "Kate M.", due: "Feb 23", tid: "00019c84-5af5-4420-b877-145b8c817dfe" }),
      T("CRB Board Approval", "I", "NOT_STARTED", { m: "CRB", a: "Kate M.", due: "Feb 23", tid: "8101ab1d-2ff5-4ae2-8d82-be8612da1b2a" }),
      T("CRB Monday Board", "I", "NOT_STARTED", { m: "CRB", a: "Kate M.", due: "Feb 23", tid: "4da48d69-72f9-4bcd-bc2c-afa5ac026b82" }),
      T("Bank Funds Flow", "I", "NOT_STARTED", { m: "CRB", a: "Kate M.", due: "Feb 25", tid: "7ff0d1d8-f724-4720-80cc-90f183335bfe" }),
      T("Account Opening CRB", "I", "NOT_STARTED", { m: "CRB", a: "Kate M.", due: "Feb 23", tid: "66f29713-6eba-4e97-a922-1bb4c0ed4106" }),
      T("PayOps Bank accts", "I", "NOT_STARTED", { m: "CRB", a: "Kate M.", due: "Feb 25", tid: "f545b943-4be4-4e13-8d5d-c736ab0c23c9" }),
    ],
  },
  { id: "paysurge", name: "PaySurge", status: "LATE", pm: "Mary Boomsma", pid: "", done: [T("PayOps funding", "I", "DONE", { date: "Jan 27" }), T("System Config", "I", "DONE", { date: "Feb 17" }), T("Testing Funds", "I", "DONE", { date: "Feb 17" })], stuck: [], wip: [T("5 in progress", "M", "WORKING_ON_IT")], up: [] },
  { id: "mtl", name: "MTL Project", status: "LATE", pm: "Katie Hamm", pid: "", done: [], stuck: [], wip: [T("4 tasks (all overdue)", "I", "WORKING_ON_IT", { due: "overdue" })], up: [] },
  { id: "runa", name: "Runa", status: "LATE", pm: "Joe Benscoter", pid: "", done: [T("Testing wind down", "I", "DONE", { date: "Feb 17" }), T("Rewards Approval", "I", "DONE", { date: "Feb 17" }), T("CHA update", "I", "DONE", { date: "Feb 17" })], stuck: [], wip: [T("4 in progress (1 overdue)", "I", "WORKING_ON_IT", { due: "1 overdue" })], up: [] },
  { id: "svb", name: "SVB Implementation", status: "LATE", pm: "Katie Hamm", pid: "", done: [], stuck: [], wip: [T("3 tasks (2 overdue)", "I", "WORKING_ON_IT", { due: "overdue" })], up: [] },
  { id: "ferry", name: "Ferry - CRB Issuing", status: "LATE", pm: "Kate Murphey", pid: "", done: [], stuck: [], wip: [], up: [] },
  { id: "skux", name: "SKUx Disaster CR", status: "LATE", pm: "Kate Murphey", pid: "", done: [], stuck: [], wip: [T("2 overdue", "I", "WORKING_ON_IT", { due: "overdue" })], up: [] },
  { id: "splitit", name: "SplitIt - Acquiring", status: "LATE", pm: "Kate Murphey", pid: "", done: [], stuck: [], wip: [T("1 overdue", "I", "WORKING_ON_IT", { due: "overdue" })], up: [] },
  {
    id: "fillip",
    name: "Fillip Fleet",
    status: "LATE",
    pm: "Kate Murphey",
    pid: "48cfccd4-15fc-42b0-bc19-ea05970be555",
    done: [
      T("Assign BIN Range", "I", "DONE", { m: "CRB", date: "Feb 18", tid: "5ac589c2-44c4-4968-9bc7-1e1ac7234d9c" }),
      T("Card Proof Approved", "C", "DONE", { m: "CRB", date: "Feb 13", tid: "abe3d6cd-eada-4e77-8750-d4b713462bc2" }),
      T("Arroweye BIN Setup", "I", "DONE", { m: "CRB", date: "Feb 17", tid: "75f8a5b7-8399-44e1-86e3-a7bb70f5b2fc" }),
      T("DW Testing", "C", "DONE", { m: "Testing", date: "Feb 17", tid: "2fb69839-ab1a-47ee-94f6-21493325ef28" }),
      T("DW Live", "I", "DONE", { m: "Testing", date: "Feb 17", tid: "5776fffe-c6ae-41f7-bbea-71b95ad91688" }),
    ],
    stuck: [],
    wip: [
      T("Funds Reserves", "C", "WORKING_ON_IT", { m: "Testing", due: "Feb 10 !!", tid: "06593427-ac5c-4d20-91f6-94c813646704" }),
      T("Card Vendor Setup", "I", "WORKING_ON_IT", { m: "CRB", a: "Kate M.", due: "Feb 18 !!", tid: "aa9f62c2-0a91-4018-acad-0f2f4f0fde89" }),
      T("Spend/Velocity Rules", "I", "WORKING_ON_IT", { m: "Launch Readiness", a: "Kate M.", due: "Feb 19 !!", tid: "89ed0c8b-878b-4157-a088-76ec45c37b65" }),
      T("Finalize Collateral", "I", "WORKING_ON_IT", { m: "Policies and Procedures", a: "Garrett A.", due: "Feb 13 !!", tid: "3dcc9e7f-9712-4f28-a0a3-ce237ca90fc6" }),
      T("Fast-Track Approval", "I", "WORKING_ON_IT", { m: "CRB", a: "Kate M.", due: "Feb 5 !!", tid: "74d103a0-030c-4c47-b65c-ba07c39f389d" }),
    ],
    up: [
      T("Configure ZD", "I", "NOT_STARTED", { m: "Launch Readiness", a: "Marlo K.", due: "Feb 25", tid: "9099843a-8bd0-4d66-8fd8-2a1de696ee3f" }),
      T("Review Disputes", "I", "NOT_STARTED", { m: "Launch Readiness", a: "Kate M.", due: "Feb 20", tid: "209c1dd8-b96b-479c-89f7-e4db3f878e69" }),
      T("Disputes Email", "I", "NOT_STARTED", { m: "Launch Readiness", due: "Feb 25", tid: "3e7816fe-97d2-42b5-afe8-c499bcabe6eb" }),
      T("Physical Cards Testing", "C", "NOT_STARTED", { m: "Testing", due: "Feb 25", tid: "b644a99f-13b6-4702-bc37-3a9ecf4dbd2f" }),
    ],
  },
  { id: "accessfares", name: "AccessFares (Zyzza)", status: "ON_TIME", pm: "Kate Murphey", pid: "", done: [], stuck: [], wip: [T("7 in progress (1 overdue)", "M", "WORKING_ON_IT", { due: "1 overdue" })], up: [T("Statements/Txn", "C", "NOT_STARTED", { a: "Mike B.", due: "Feb 20" })] },
  {
    id: "apmex",
    name: "APMEX",
    status: "ON_TIME",
    pm: "Joe Benscoter",
    pid: "86e695c2-855b-4ebf-be32-ba789f10ac70",
    done: [
      T("Impl Kickoff", "I", "DONE", { m: "Technical Implementation", date: "Feb 17", tid: "46594e0c-946a-4dc0-b360-c0a708e14508" }),
      T("Physical Card", "I", "DONE", { m: "Technical Implementation", date: "Feb 17", tid: "ca602e58-872d-434e-b949-13c4f5aec462" }),
    ],
    stuck: [T("BIN Request", "I", "STUCK", { m: "Transpecos Bank", a: "Aditya A.", tid: "f05d7873-1913-4e27-bc8c-65df2ca986e2" })],
    wip: [
      T("Bank Deck", "I", "WORKING_ON_IT", { m: "Due Diligence", a: "Joe B.", due: "Feb 11 !!", tid: "0d68bf3e-be8e-4e03-a8c7-5f6d9e2b1a4c" }),
      T("12 Policies Outstanding", "C", "WORKING_ON_IT", { m: "Policies and Procedures", due: "Feb 19 !!", tid: "d17e6f2a-8c4b-4a3d-9e5f-1b7c2d8a4e6f" }),
    ],
    up: [
      T("Finalize Policies", "C", "NOT_STARTED", { m: "Policies and Procedures", due: "Feb 23", tid: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d" }),
      T("Bank Package Submit", "I", "NOT_STARTED", { m: "Transpecos Bank", a: "Joe B.", due: "Feb 25", tid: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e" }),
      T("Card Art Review", "C", "NOT_STARTED", { m: "Program Collateral", due: "Feb 21", tid: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f" }),
      T("System Config Start", "I", "NOT_STARTED", { m: "System Configuration", a: "Jody S.", due: "Feb 25", tid: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a" }),
    ],
  },
  {
    id: "aidtech",
    name: "Aidtech",
    status: "ON_TIME",
    pm: "Joe Benscoter",
    pid: "",
    done: [T("System Config", "I", "DONE", { date: "Feb 17" })],
    stuck: [],
    wip: [T("3 in progress", "M", "WORKING_ON_IT")],
    up: [],
  },
  {
    id: "remodel",
    name: "Remodel Health",
    status: "ON_TIME",
    pm: "Joe Benscoter",
    pid: "",
    done: [],
    stuck: [],
    wip: [T("3 in progress", "M", "WORKING_ON_IT")],
    up: [T("Policy Submissions", "C", "NOT_STARTED", { due: "Feb 20" }), T("API Integration Review", "C", "NOT_STARTED", { due: "Feb 25" })],
  },
  { id: "fluz", name: "Fluz", status: "ON_TIME", pm: "Mary Boomsma", pid: "", done: [], stuck: [], wip: [T("2 in progress", "I", "WORKING_ON_IT")], up: [] },
  { id: "fluz-token", name: "Fluz Tokenization", status: "ON_TIME", pm: "Mary Boomsma", pid: "", done: [], stuck: [], wip: [T("2 in progress", "I", "WORKING_ON_IT")], up: [] },
  {
    id: "workwhile",
    name: "WorkWhile",
    status: "ON_TIME",
    pm: "Mary Boomsma",
    pid: "69d2416f-7537-4062-80d8-b937f204c4bc",
    done: [
      T("Themis Setup", "I", "DONE", { m: "Due Diligence", date: "Feb 17", tid: "368434ad-a37f-4285-bdbb-0ea1a1585f80" }),
      T("Solution Review", "I", "DONE", { m: "Post Sales", date: "Feb 18", tid: "c36082a6-2619-46c3-81cb-d6587f665a6b" }),
      T("Impl Invoice", "I", "DONE", { m: "Post Sales", date: "Feb 19", tid: "4732dd15-24ed-4f45-8780-7d5b51c7cc53" }),
      T("Host Kickoff", "I", "DONE", { m: "Post Sales", date: "Feb 19", tid: "1a0fcf41-2590-4828-8ced-89b6c486bba6" }),
      T("Schedule Kickoff", "I", "DONE", { m: "Kickoff", date: "Feb 19", tid: "81ea54f6-601f-4a6e-b49c-bb37eee2b631" }),
    ],
    stuck: [],
    wip: [T("Pay Impl Fee", "C", "WORKING_ON_IT", { m: "Post Sales", tid: "7135f879-797d-4ca2-85a0-72f39d9da9c5" })],
    up: [
      T("Review sign off", "I", "NOT_STARTED", { m: "Post Sales", a: "Mary B.", due: "Feb 20", tid: "492e4581-a1d8-4ab8-8162-ad3f278f4005" }),
      T("W-9/ACH", "C", "NOT_STARTED", { m: "Post Sales", due: "Feb 23", tid: "49e98c80-b397-48db-a768-f467d5bc0102" }),
      T("Onboarding Q", "C", "NOT_STARTED", { m: "Due Diligence", due: "Feb 26", tid: "37a06bd2-0a69-467f-8ff5-008f921d9a6b" }),
      T("Themis Guide", "C", "NOT_STARTED", { m: "Due Diligence", due: "Feb 19", tid: "4465fb8b-b7a0-421c-993c-0983e594261e" }),
      T("Fee Paid", "I", "NOT_STARTED", { m: "Kickoff", a: "PayOps", due: "Feb 24", tid: "abab8123-fbea-424d-94b5-ba2c303e1169" }),
      T("Themis Intake", "I", "NOT_STARTED", { m: "Kickoff", due: "Feb 19", tid: "bfda5f64-aeef-40bf-a3dd-b9f9481b5f2b" }),
      T("Document Scope", "I", "NOT_STARTED", { m: "Onboarding", due: "Feb 19", tid: "e1abc4cb-27c0-45de-9632-aaa09367ce78" }),
      T("Custom Fields", "I", "NOT_STARTED", { m: "Onboarding", due: "Feb 23", tid: "602cad8a-40ed-437e-9a79-49466276180c" }),
    ],
  },
  {
    id: "coverd",
    name: "Coverd",
    status: "ON_TIME",
    pm: "Joe Benscoter",
    pid: "9e2b0067-dfc2-430a-8318-a6b0f7567bb2",
    done: [
      T("W-9/ACH", "C", "DONE", { m: "Post Sales", date: "Feb 17", tid: "9c373225-2a24-4e6f-b0f5-36c82088a49c" }),
      T("Solution Review", "I", "DONE", { m: "Post Sales", date: "Feb 17", tid: "236615ac-369e-4979-a864-78977f26dadc" }),
      T("Weekly meetings", "I", "DONE", { m: "Post Sales", date: "Feb 17", tid: "b981e4cf-c443-4d1b-95cf-0ae092b61f65" }),
      T("Host Kickoff", "I", "DONE", { m: "Post Sales", date: "Feb 17", tid: "4a913c58-c113-483e-a346-b1cec9832310" }),
    ],
    stuck: [],
    wip: [
      T("Prepare Bank Deck", "I", "WORKING_ON_IT", { m: "Due Diligence", a: "Joe B.", due: "Feb 11 !!", tid: "b8e91e81-67c0-4b49-a98c-de090f9b29a5" }),
      T("Pay Impl Fee", "C", "WORKING_ON_IT", { m: "Post Sales", tid: "c7ab7dbb-2087-4292-bb99-1b130b86a3f9" }),
    ],
    up: [
      T("Scope sign off", "C", "NOT_STARTED", { m: "Post Sales", due: "Feb 20", tid: "c73f3afb-15bf-4698-a56b-431626ec3a7a" }),
      T("Onboarding Q", "C", "NOT_STARTED", { m: "Due Diligence", due: "Feb 26", tid: "38300fab-ab95-4f33-ae16-a0bf6beeeb6e" }),
      T("Open Bank Accts", "T", "NOT_STARTED", { m: "CRB", due: "Feb 23", tid: "f8b3be87-2756-4581-bc9c-8836c850d15b" }),
      T("Risk SDK", "I", "NOT_STARTED", { m: "Technical Implementation", a: "Joe B.", due: "Feb 19", tid: "3558a264-d752-4ca3-ac69-7d5f3fb66106" }),
      T("Disputes", "C", "NOT_STARTED", { m: "Technical Implementation", due: "Feb 19", tid: "74e12deb-a14e-4632-a3b8-ab3c5273eb4f" }),
      T("Onboarding", "C", "NOT_STARTED", { m: "Technical Implementation", due: "Feb 19", tid: "2be0d956-852d-4f8f-9503-f768a9410dce" }),
      T("Card Issuance", "C", "NOT_STARTED", { m: "Technical Implementation", due: "Feb 19", tid: "719defad-9d9c-4a8a-be58-acc8143ced95" }),
      T("Statements/Txn", "C", "NOT_STARTED", { m: "Technical Implementation", due: "Feb 19", tid: "e7a56fe7-9523-445c-9630-587e617ad5eb" }),
      T("Funding", "C", "NOT_STARTED", { m: "Technical Implementation", due: "Feb 19", tid: "32910ccf-93e3-490b-b7a9-698845bc580c" }),
      T("Sub Hub", "I", "NOT_STARTED", { m: "Launch Readiness", a: "Joe B.", due: "Feb 23", tid: "633be779-2d69-4b93-8cbd-39cde5af6a47" }),
      T("Policies Themis", "I", "NOT_STARTED", { m: "Launch Readiness", a: "Joe B.", due: "Feb 23", tid: "5e614b15-ea68-47d0-8a1d-1ca3495eef81" }),
      T("Policy Module", "I", "NOT_STARTED", { m: "Policies and Procedures", a: "Joe B.", due: "Feb 20", tid: "cbdd4d32-c0c2-4d24-9086-2314735ec992" }),
      T("Verification WF ID", "I", "NOT_STARTED", { m: "System Configuration", a: "Joe B.", due: "Feb 20", tid: "c3450e77-ab39-4f5c-9f49-d0e4560f0d6d" }),
      T("Subscriber Testing", "C", "NOT_STARTED", { m: "Testing", due: "Feb 23", tid: "93f353f6-f92f-4fbb-b8f7-70f55c0e74f4" }),
    ],
  },
];

// ============================================================
// STATIC FATHOM DATA (Phase 1)
// In Phase 3, this will be replaced by /api/fathom endpoint
// ============================================================
export const FATHOM_MEETINGS = [
  { id: "f1", title: "HN / Remodel: Sync", date: "Feb 17", pm: "Joe Benscoter", actions: ["Joe: build pitch deck, submit to CRB by EOW", "Remodel: begin policy submissions by Feb 20", "Kevin Ruan: start API integration review"] },
  { id: "f2", title: "HN / Runa: Sync", date: "Feb 17", pm: "Joe Benscoter", actions: ["Joe: confirm go-live date with sponsor bank", "Runa: complete final UAT sign-off"] },
  { id: "f3", title: "HN / Remodel: Sync", date: "Feb 10", pm: "Joe Benscoter", actions: ["Joe: send scope doc for sign-off", "Remodel: review Themis getting started guide"] },
  { id: "f4", title: "HN / Runa: Sync", date: "Feb 10", pm: "Joe Benscoter", actions: ["Highnote: complete testing wind down by Feb 17", "Runa: confirm reward tiers"] },
  { id: "f5", title: "HN / APMEX: Sync", date: "Feb 9", pm: "Joe Benscoter", actions: ["APMEX: prioritize 12 outstanding policies", "Joe: follow up on BIN request", "Bank package target: Feb 11"] },
];
