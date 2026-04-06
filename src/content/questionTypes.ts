import type { QuestionType } from "@/content/types";

export const questionTypes: QuestionType[] = [
  { type: "short_text",   label: "Short Text",         icon: "Type",             color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  { type: "long_text",    label: "Long Text",          icon: "AlignLeft",        color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { type: "email",        label: "Email",              icon: "Mail",             color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { type: "number",       label: "Number",             icon: "Hash",             color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { type: "phone",        label: "Phone",              icon: "Phone",            color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { type: "dropdown",     label: "Dropdown",           icon: "ChevronDown",      color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { type: "select",       label: "Multi-select",       icon: "List",             color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { type: "yes_no",       label: "Yes / No",           icon: "ToggleLeft",       color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  { type: "rating",       label: "Rating",             icon: "Star",             color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { type: "scale",        label: "Scale",              icon: "SlidersHorizontal",color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  { type: "date",         label: "Date",               icon: "Calendar",         color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { type: "time",         label: "Time",               icon: "Clock",            color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
  { type: "currency",     label: "Currency",           icon: "DollarSign",       color: "text-green-400 bg-green-500/10 border-green-500/20" },
  { type: "percentage",   label: "Percentage",         icon: "Percent",          color: "text-lime-400 bg-lime-500/10 border-lime-500/20" },
  { type: "address",      label: "Address",            icon: "MapPin",           color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { type: "file_upload",  label: "File Upload",        icon: "FileUp",           color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20" },
  { type: "terms",        label: "Terms & Conditions", icon: "ScrollText",       color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20" },
  { type: "image_notes",  label: "Image Notes",        icon: "Image",            color: "text-violet-300 bg-violet-400/10 border-violet-400/20" },
];
