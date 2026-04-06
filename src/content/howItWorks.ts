import type { Step, Chapter } from "@/content/types";

export const steps: Step[] = [
  {
    number: "01",
    icon: "PlusCircle",
    title: "Create your form",
    description:
      "Add sections and questions from 18+ types. Configure display mode, custom slug, and branding in seconds.",
    color: "text-accent",
    border: "border-violet-600/30",
    bg: "bg-violet-600/10",
  },
  {
    number: "02",
    icon: "GitBranch",
    title: "Add conditional logic",
    description:
      "Build branching rules that skip, show, or hide questions based on previous answers — personalizing every response path.",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/10",
  },
  {
    number: "03",
    icon: "Share2",
    title: "Publish via slug URL",
    description:
      "Get a public URL instantly via your custom slug. Embed it anywhere, or share via QR code with one click.",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/10",
  },
  {
    number: "04",
    icon: "BarChart3",
    title: "Collect & analyze",
    description:
      "View responses in the admin dashboard. Export to CSV/JSON or let webhooks push data to your CRM, Slack, or any API.",
    color: "text-accent",
    border: "border-violet-600/30",
    bg: "bg-violet-600/10",
  },
];

const ACCENT = "#8b5cf6"; // Electric Violet

export const chapters: Chapter[] = [
  {
    id: 0,
    time: "0:00",
    title: "Create form",
    icon: "PlusCircle",
    color: ACCENT,
    duration: 4500,
    scene: "create",
    description: "Start with a blank canvas or choose from 50+ templates. Add sections and questions in seconds.",
    sceneData: {
      fields: [
        { text: "Customer Name" },
        { text: "Work email" },
        { text: "Primary goal?", active: true },
        { text: "Department" },
      ],
    },
  },
  {
    id: 1,
    time: "0:30",
    title: "Configure questions",
    icon: "Settings2",
    color: ACCENT,
    duration: 4500,
    scene: "configure",
    description: "Set question types, required fields, placeholders, and type-specific config like rating scales or dropdowns.",
    sceneData: {
      types: ["Short text", "Email", "Dropdown", "Rating (1\u20135)", "File upload", "Yes / No"],
    },
  },
  {
    id: 2,
    time: "1:05",
    title: "Add logic rules",
    icon: "GitBranch",
    color: ACCENT,
    duration: 4500,
    scene: "logic",
    description: "Define branching rules \u2014 skip sections, show/hide questions, jump to specific steps based on answers.",
    sceneData: {
      rules: [
        { cond: "If goal = Lead Gen", action: "\u2192 Show budget field" },
        { cond: "If goal = Support",  action: "\u2192 Jump to section 3" },
        { cond: "Otherwise",          action: "\u2192 End survey" },
      ],
    },
  },
  {
    id: 3,
    time: "1:40",
    title: "Publish & share",
    icon: "Share2",
    color: ACCENT,
    duration: 4500,
    scene: "publish",
    description: "Set your slug, go live, and share via link, embed code, or QR. One-at-a-time or section mode.",
    sceneData: {
      slug: "formsio.io/customer-survey",
    },
  },
  {
    id: 4,
    time: "2:10",
    title: "Analyze responses",
    icon: "BarChart3",
    color: ACCENT,
    duration: 4500,
    scene: "analyze",
    description: "View response dashboard, export CSV/JSON, or trigger webhooks to push data to your stack.",
    sceneData: {
      bars: [58, 74, 42, 90, 66, 52, 84, 78],
    },
  },
];
