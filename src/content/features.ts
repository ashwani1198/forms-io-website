import type { Feature } from "@/content/types";

export const features: Feature[] = [
  {
    title: "Conditional Branching",
    description:
      "Build smart logic that shows or hides questions based on previous answers. Guide each respondent through a personalized path.",
    icon: "GitBranch",
    accent: "from-violet-600/20 to-violet-600/5",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "Real-time Webhooks",
    description:
      "Trigger HTTP webhooks on every submission with custom key mapping, headers, and retry logic with exponential backoff.",
    icon: "Webhook",
    accent: "from-indigo-600/20 to-indigo-600/5",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "File Uploads via S3",
    description:
      "Accept image, PDF, and document uploads. Files are stored securely in AWS S3 via presigned URLs with per-question size limits.",
    icon: "Upload",
    accent: "from-cyan-600/20 to-cyan-600/5",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    title: "Form Theming",
    description:
      "Customize colors, fonts, logos, and background per form. Apply custom CSS for pixel-perfect branding that matches your product.",
    icon: "Palette",
    accent: "from-pink-600/20 to-pink-600/5",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    title: "Public Slug URLs",
    description:
      "Share forms via clean, memorable slugs like /f/customer-survey. Supports both one-at-a-time and section display modes.",
    icon: "Globe",
    accent: "from-emerald-600/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Section-based Structure",
    description:
      "Organize questions into logical sections with drag-and-drop reordering. Keep long forms manageable for both admins and respondents.",
    icon: "Layers",
    accent: "from-amber-600/20 to-amber-600/5",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
];
