// Use-case layer — markdown parsing for blogs/ directory.
// Pages import blog data from here, never directly from blogs/.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { codeToHtml } from "shiki";
import type { BlogPost } from "@/content/types";

const BLOGS_DIR = path.join(process.cwd(), "blogs");

async function parseBlogFile(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const wordCount = content.trim().split(/\s+/).length;
  const readTime = data.readTime ?? `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const renderedContent = await renderMarkdown(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "FormsIO Team",
    tags: data.tags ?? [],
    content: renderedContent,
    doodle: data.doodle ?? "",
    readTime,
  };
}

async function renderMarkdown(content: string): Promise<string> {
  // Extract and highlight code blocks first, replace with placeholders
  const codeBlocks: string[] = [];

  const withPlaceholders = await replaceAsync(
    content,
    /```(\w+)?\n([\s\S]*?)```/g,
    async (_, lang, code) => {
      const language = lang?.trim() || "text";
      try {
        const html = await codeToHtml(code.trim(), {
          lang: language,
          theme: "github-dark",
        });
        const idx = codeBlocks.length;
        codeBlocks.push(`<div class="code-block">${html}</div>`);
        return `%%CODE_BLOCK_${idx}%%`;
      } catch {
        const idx = codeBlocks.length;
        codeBlocks.push(`<div class="code-block"><pre><code>${escapeHtml(code.trim())}</code></pre></div>`);
        return `%%CODE_BLOCK_${idx}%%`;
      }
    }
  );

  // Process remaining markdown
  let html = withPlaceholders
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`\n]+)`/g, "<code>$1</code>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<(h[1-3]|ul|pre|li|div)/.test(trimmed)) return trimmed;
      if (trimmed.startsWith("%%CODE_BLOCK_")) return trimmed;
      return `<p>${trimmed.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  // Restore code blocks
  codeBlocks.forEach((block, idx) => {
    html = html.replace(`%%CODE_BLOCK_${idx}%%`, block);
  });

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function replaceAsync(
  str: string,
  regex: RegExp,
  asyncFn: (match: string, ...args: string[]) => Promise<string>
): Promise<string> {
  const matches: Array<{ match: string; args: string[]; index: number }> = [];
  str.replace(regex, (match, ...args) => {
    matches.push({ match, args: args.slice(0, -2) as string[], index: args[args.length - 2] as number });
    return match;
  });
  const results = await Promise.all(matches.map(({ match, args }) => asyncFn(match, ...args)));
  let result = str;
  // Replace from end to start to preserve indices
  for (let i = matches.length - 1; i >= 0; i--) {
    const { index, match } = matches[i];
    result = result.slice(0, index) + results[i] + result.slice(index + match.length);
  }
  return result;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map((file) => parseBlogFile(file.replace(/\.md$/, "")))
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await parseBlogFile(slug);
  } catch {
    return null;
  }
}
