import type { BlogPost } from "@/content/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-formsio",
    title: "Introducing FormsIO — Forms That Feel Like Conversations",
    description:
      "We built FormsIO because form builders shouldn't feel like spreadsheets. Here's what we shipped in v1 and what's coming next.",
    date: "2026-04-06",
    author: "FormsIO Team",
    tags: ["announcement"],
    doodle: "pencil",
    readTime: "4 min read",
    content: "",
  },
  {
    slug: "conditional-logic-deep-dive",
    title: "How Conditional Logic Works Under the Hood",
    description:
      "A deep dive into our rules engine — client-side evaluation for instant UX, server-side re-validation to prevent bypass.",
    date: "2026-04-01",
    author: "FormsIO Team",
    tags: ["engineering"],
    doodle: "chart",
    readTime: "6 min read",
    content: "",
  },
  {
    slug: "webhook-key-mapping",
    title: "Webhook Key Mapping — Stop Sending UUID Payloads",
    description:
      "Nobody wants to receive {\"3f7a2b1c-...\": \"user@example.com\"} in their Slack alerts. Here's how FormsIO fixes that.",
    date: "2026-03-20",
    author: "FormsIO Team",
    tags: ["engineering"],
    doodle: "link",
    readTime: "5 min read",
    content: "",
  },
];
