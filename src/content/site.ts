import type { SiteConfig, NavLink, FooterColumn } from "@/content/types";

export const siteConfig: SiteConfig = {
  name: "FormsIO",
  tagline: "Build Beautiful Forms Without Code",
  description:
    "FormsIO is an AI powered no code drag-and-drop form builder that helps you create stunning, responsive forms with advanced features in minutes, not hours.",
  url: "https://formsio.io",
};

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Templates", href: "#templates" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Support", href: "#" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];
