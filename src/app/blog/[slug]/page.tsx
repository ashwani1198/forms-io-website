import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getBlogPost, getAllBlogPosts } from "@/lib/markdown";
import { siteConfig } from "@/content";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-background/80 backdrop-blur-xl pt-16">
        <div className="max-w-4xl mx-auto px-6 h-12 flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            All posts
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">{post.title}</span>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16 flex-1">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-3 h-3 text-muted-foreground" />
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <h1 className="heading-display text-4xl font-bold text-foreground tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed mb-8 border-l-2 border-accent pl-4">
          {post.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pb-10 border-b border-border mb-10">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{post.author}</span>
        </div>

        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-4 py-2 hover:border-border-hover"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>
      </div>
      <Footer />
    </div>
  );
}
