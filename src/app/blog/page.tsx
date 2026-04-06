import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import { getAllBlogPosts } from "@/lib/markdown";
import { siteConfig } from "@/content";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.name}`,
  description: "Engineering deep-dives, product announcements, and release notes from the FormsIO team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {/* Header */}
      <div className="border-b border-border pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Blog
            </span>
            <h1 className="heading-display text-4xl font-bold text-foreground tracking-tight">
              Engineering & Updates
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Deep-dives into how we build FormsIO, product announcements, and release notes.
            </p>
          </div>
        </div>
      </div>

      {/* Post list */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-24">No posts yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col divide-y divide-border">
            {posts.map((post) => (
              <article key={post.slug} className="group py-10 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4">
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-3 h-3 text-muted-foreground" />
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold text-accent uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="heading-display text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{post.description}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span>{post.author}</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:underline transition-colors">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
