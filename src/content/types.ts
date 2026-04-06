// Domain layer — pure TypeScript interfaces only. No imports.

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  accent: string;
  iconColor: string;
  iconBg: string;
}

export interface QuestionType {
  type: string;
  label: string;
  icon: string;
  color: string;
}

export interface Step {
  number: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  border: string;
  bg: string;
}

export interface ConditionalRule {
  condition: string;
  action: string;
  icon: string;
  color: string;
  border: string;
}

export interface Template {
  title: string;
  description: string;
  slug: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  doodle: string;
  readTime: string;
}

export interface CTAData {
  headline: string;
  description: string;
  primaryCta: string;
  badge: string;
}

export interface SceneField {
  text: string;
  active?: boolean;
}

export interface SceneData {
  fields?: SceneField[];
  types?: string[];
  rules?: { cond: string; action: string }[];
  bars?: number[];
  slug?: string;
}
export interface HeroFeature {
  label: string;
}

export interface HeroData {
  eyebrow?: string;
  headline: string[];
  accentWord: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  features: HeroFeature[];
  productSteps: ProductStep[];
}

export interface ProductStep {
  id: number;
  label: string;
  color: string;
  duration: number;
  fields: { text: string; active?: boolean }[];
  cta: string;
}

export interface Chapter {
  id: number;
  time: string;
  title: string;
  icon: string;
  color: string;
  duration: number;
  scene: string;
  description: string;
  sceneData: SceneData;
}
