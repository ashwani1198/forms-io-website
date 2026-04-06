import type { HeroData } from "@/content/types";

export const heroData: HeroData = {
  headline: ["Build forms that feel", "like conversations"],
  accentWord: "conversations",
  description:
    "A full-stack form builder with conditional branching, real-time webhooks, file uploads, and a clean admin UI. No code needed.",
  primaryCta: "Start building free",
  secondaryCta: "See how it works",
  features: [
    { label: "18+ question types including file upload & ratings" },
    { label: "Conditional logic with jump, show & hide rules" },
    { label: "Webhooks with custom key mapping & retry logic" },
  ],
  productSteps: [
    {
      id: 0,
      label: "Pick a template",
      color: "#acacb3",
      duration: 3500,
      fields: [
        { text: "Customer Name", active: false },
        { text: "Work email", active: false },
        { text: "Primary goal?", active: true },
      ],
      cta: "Use this template →",
    },
    {
      id: 1,
      label: "Configure logic",
      color: "#acacb3",
      duration: 3500,
      fields: [
        { text: "If goal = Lead Gen", active: true },
        { text: "→ Show budget field", active: false },
        { text: "→ Skip to section 3", active: false },
      ],
      cta: "Save logic →",
    },
    {
      id: 2,
      label: "Publish via slug",
      color: "#acacb3",
      duration: 3500,
      fields: [
        { text: "formsio.io/customer-survey", active: true },
        { text: "Embed on any site", active: false },
        { text: "Share via QR code", active: false },
      ],
      cta: "Publish now →",
    },
    {
      id: 3,
      label: "Analyze responses",
      color: "#acacb3",
      duration: 3500,
      fields: [
        { text: "127 responses · 94% complete", active: true },
        { text: "Webhook → Slack · Salesforce", active: false },
        { text: "Export CSV / JSON", active: false },
      ],
      cta: "View dashboard →",
    },
  ],
};
