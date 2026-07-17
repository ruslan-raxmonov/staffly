export type DemoEmployeeStatus =
  | "Working"
  | "Replying"
  | "Writing"
  | "Searching"
  | "Planning"
  | "Idle";

export type DemoEmployee = {
  id: string;
  name: string;
  role: string;
  status: DemoEmployeeStatus;
  avatar: string;
  tasksToday: number;
  successRate: number;
  hoursSaved: number;
  prompt: string;
  memory: string[];
  knowledge: string[];
  permissions: string[];
  integrations: string[];
};

export type DemoTaskStatus = "todo" | "running" | "completed";

export type DemoTask = {
  id: string;
  title: string;
  employee: string;
  status: DemoTaskStatus;
  priority: "Low" | "Medium" | "High";
  eta: string;
};

export const demoKpis = [
  { label: "AI Employees", value: "8", delta: "+2 this week" },
  { label: "Running Tasks", value: "42", delta: "Live now" },
  { label: "Completed Today", value: "138", delta: "+18%" },
  { label: "Hours Saved", value: "94", delta: "This week" },
  { label: "Productivity", value: "98%", delta: "Peak efficiency" },
];

export const demoEmployees: DemoEmployee[] = [
  {
    id: "alex",
    name: "Alex",
    role: "Sales Agent",
    status: "Working",
    avatar: "/agents/sales.jpg",
    tasksToday: 24,
    successRate: 97,
    hoursSaved: 18,
    prompt:
      "You are Alex, a Staffly sales agent. Qualify leads, draft outreach, and update CRM with concise notes.",
    memory: [
      "Acme Corp prefers weekly demos on Tuesdays",
      "Northwind budget cycle closes end of quarter",
      "Always lead with ROI on hours saved",
    ],
    knowledge: ["Sales playbook v3", "Pricing FAQ", "Objection handling"],
    permissions: ["CRM read/write", "Email send", "Calendar"],
    integrations: ["HubSpot", "Gmail", "Slack"],
  },
  {
    id: "sophia",
    name: "Sophia",
    role: "Support Agent",
    status: "Replying",
    avatar: "/agents/support.jpg",
    tasksToday: 41,
    successRate: 99,
    hoursSaved: 22,
    prompt:
      "You are Sophia, a Staffly support agent. Resolve tickets empathetically with accurate knowledge base answers.",
    memory: [
      "VIP customers get same-day escalation",
      "Refund policy: 14 days for annual plans",
    ],
    knowledge: ["Support handbook", "Product changelog", "SLA matrix"],
    permissions: ["Tickets", "Knowledge base", "Refunds (draft)"],
    integrations: ["Zendesk", "Intercom", "Notion"],
  },
  {
    id: "emma",
    name: "Emma",
    role: "Content Agent",
    status: "Writing",
    avatar: "/agents/content.jpg",
    tasksToday: 12,
    successRate: 95,
    hoursSaved: 16,
    prompt:
      "You are Emma, a Staffly content agent. Produce on-brand drafts for blogs, social, and product updates.",
    memory: ["Brand voice: precise, calm, premium", "Avoid hype adjectives"],
    knowledge: ["Brand guidelines", "SEO checklist", "Case study templates"],
    permissions: ["CMS draft", "Asset library"],
    integrations: ["Notion", "Webflow", "Figma"],
  },
  {
    id: "noah",
    name: "Noah",
    role: "Research Agent",
    status: "Searching",
    avatar: "/agents/research.jpg",
    tasksToday: 9,
    successRate: 96,
    hoursSaved: 14,
    prompt:
      "You are Noah, a Staffly research agent. Gather sources, synthesize findings, and cite confidence levels.",
    memory: ["Prefer primary sources", "Flag outdated data > 12 months"],
    knowledge: ["Research protocol", "Competitor matrix"],
    permissions: ["Web browse", "Report write"],
    integrations: ["Perplexity", "Google Drive", "Notion"],
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Marketing Agent",
    status: "Planning",
    avatar: "/agents/marketing.jpg",
    tasksToday: 15,
    successRate: 94,
    hoursSaved: 12,
    prompt:
      "You are Lucas, a Staffly marketing agent. Plan campaigns, allocate budget, and report weekly performance.",
    memory: ["Q3 focus: enterprise expansion", "LinkedIn outperforms email for ICP"],
    knowledge: ["Campaign calendar", "Channel playbooks"],
    permissions: ["Ads draft", "Analytics read"],
    integrations: ["Meta Ads", "LinkedIn", "GA4"],
  },
];

export const demoTasks: DemoTask[] = [
  { id: "t1", title: "Qualify inbound lead — Meridian Labs", employee: "Alex", status: "running", priority: "High", eta: "12m" },
  { id: "t2", title: "Reply to ticket #4821 — SSO issue", employee: "Sophia", status: "running", priority: "High", eta: "4m" },
  { id: "t3", title: "Draft launch blog: AI Ops Center", employee: "Emma", status: "running", priority: "Medium", eta: "35m" },
  { id: "t4", title: "Competitor pricing scan — Q3", employee: "Noah", status: "todo", priority: "Medium", eta: "1h" },
  { id: "t5", title: "LinkedIn campaign brief — Enterprise", employee: "Lucas", status: "todo", priority: "High", eta: "2h" },
  { id: "t6", title: "Follow-up sequence: warm MQLs", employee: "Alex", status: "todo", priority: "Medium", eta: "45m" },
  { id: "t7", title: "Close ticket #4790 — billing FAQ", employee: "Sophia", status: "completed", priority: "Low", eta: "Done" },
  { id: "t8", title: "Social carousel: Hours Saved", employee: "Emma", status: "completed", priority: "Low", eta: "Done" },
  { id: "t9", title: "Market brief: APAC demand", employee: "Noah", status: "completed", priority: "Medium", eta: "Done" },
  { id: "t10", title: "Weekly performance digest", employee: "Lucas", status: "completed", priority: "Medium", eta: "Done" },
  { id: "t11", title: "Update CRM notes — Orbit Soft", employee: "Alex", status: "completed", priority: "Low", eta: "Done" },
  { id: "t12", title: "Escalate VIP chat — Nova Bank", employee: "Sophia", status: "running", priority: "High", eta: "8m" },
];

export const demoActivity = [
  { time: "2m ago", text: "Alex booked a demo with Meridian Labs", type: "sales" },
  { time: "5m ago", text: "Sophia resolved ticket #4790", type: "support" },
  { time: "9m ago", text: "Emma published draft to CMS", type: "content" },
  { time: "14m ago", text: "Noah updated competitor matrix", type: "research" },
  { time: "22m ago", text: "Lucas scheduled LinkedIn ads for review", type: "marketing" },
  { time: "31m ago", text: "Memory updated: Acme prefers Tuesday demos", type: "memory" },
  { time: "48m ago", text: "Knowledge synced: Pricing FAQ v4", type: "knowledge" },
];

export const opsLogTemplates = [
  "Thinking… analyzing request context",
  "Searching knowledge base for SSO policies",
  "Reading Knowledge… Support handbook §4",
  "Writing Email… draft ready for review",
  "Task Completed… ticket #4790 closed",
  "Memory Updated… preference stored",
  "Calling integration HubSpot.updateDeal",
  "Planning next steps for campaign brief",
  "Validating output against brand guidelines",
  "Queueing follow-up for human approval",
];

export const marketplaceAgents = [
  { name: "Finance Analyst", role: "Finance", avatar: "/agents/finance.jpg", installs: "12.4k" },
  { name: "HR Partner", role: "People", avatar: "/agents/hr.jpg", installs: "8.1k" },
  { name: "Custom Builder", role: "Builder", avatar: "/agents/custom.jpg", installs: "21k" },
  { name: "Developer Copilot", role: "Engineering", avatar: "/agents/developer.jpg", installs: "19.2k" },
  ...demoEmployees.map((e) => ({
    name: e.name,
    role: e.role,
    avatar: e.avatar,
    installs: `${(8 + e.tasksToday / 2).toFixed(1)}k`,
  })),
];

export const knowledgeDocs = [
  { name: "Company Handbook.pdf", status: "Indexed", vectors: 1240, updated: "2h ago" },
  { name: "Sales Playbook v3.md", status: "Indexed", vectors: 842, updated: "5h ago" },
  { name: "Product Changelog.docx", status: "Syncing", vectors: 310, updated: "Just now" },
  { name: "Pricing FAQ.pdf", status: "Indexed", vectors: 196, updated: "1d ago" },
  { name: "Brand Guidelines.pdf", status: "Indexed", vectors: 520, updated: "3d ago" },
];

export const analyticsSeries = {
  hoursSaved: [42, 48, 55, 61, 70, 82, 94],
  tasksCompleted: [88, 102, 97, 115, 121, 130, 138],
  roi: [1.2, 1.4, 1.6, 1.9, 2.2, 2.6, 3.1],
};

export const settingsSections = [
  { id: "workspace", title: "Workspace", desc: "Name, timezone, default language" },
  { id: "members", title: "Members", desc: "Invite teammates and manage access" },
  { id: "roles", title: "Roles", desc: "Owner, Admin, Operator, Viewer" },
  { id: "security", title: "Security", desc: "SSO, session policies, audit logs" },
  { id: "notifications", title: "Notifications", desc: "Email, Slack, in-app alerts" },
  { id: "branding", title: "Branding", desc: "Logo, accent color, email templates" },
];
