import type { ConditionalRule } from "@/content/types";

export const conditionalRules: ConditionalRule[] = [
  {
    condition: 'If "Budget" is greater than $10,000',
    action: "Show enterprise pricing section",
    icon: "Eye",
    color: "text-emerald-400",
    border: "border-emerald-600/30 bg-emerald-600/5",
  },
  {
    condition: 'If "Team size" equals 1',
    action: "Hide team collaboration questions",
    icon: "EyeOff",
    color: "text-amber-400",
    border: "border-amber-600/30 bg-amber-600/5",
  },
  {
    condition: 'If "Role" contains "engineer"',
    action: "Jump to technical requirements section",
    icon: "MoveRight",
    color: "text-cyan-400",
    border: "border-cyan-600/30 bg-cyan-600/5",
  },
];
