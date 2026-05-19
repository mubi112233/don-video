"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchBlog } from "@/lib/api";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";

const decodeHtml = (value: string) => {
  if (!value) return value;
  if (!value.includes("&")) return value;
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
};

const slugify = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

interface BlogPost {
  blogId: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  charts?: any;
  order?: number;
  id?: number | string;
  sections?: { heading: string; details: string }[];
}

export const Blog = () => {
  const pathname = usePathname();
  const currentLang = pathname.startsWith("/ge") || pathname.startsWith("/de") ? "ge" : "en";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const copy = getCopy(currentLang, "blog");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlog(currentLang);

        if (!data) throw new Error("Failed to fetch blogs");

        const fetchedBlogs = Array.isArray((data as any).blogs)
          ? (data as any).blogs.sort(
              (a: BlogPost, b: BlogPost) =>
                (a.order || 0) - (b.order || 0) || a.blogId - b.blogId
            )
          : [];

        setPosts(fetchedBlogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blogs");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentLang]);

  if (loading) {
    return (
      <motion.section
        id="blog"
        className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background overflow-hidden`}
      >
        <div className={`container mx-auto ${SPACING.container}`}>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        </div>
      </motion.section>
    );
  }

  if (error || posts.length === 0) {
    return (
      <motion.section
        id="blog"
        className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background overflow-hidden`}
      >
        <div className={`container mx-auto ${SPACING.container}`}>
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {error || (currentLang === "ge"
                ? "Keine Blog-Artikel verfügbar."
                : "No blog posts available.")}
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="blog"
      className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background overflow-hidden`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/5 rounded-full blur-[100px] md:blur-[150px]" />

      <div className={`container mx-auto ${SPACING.container} relative z-10`}>
        <div className="mb-12 sm:mb-16 lg:mb-20 text-left max-w-5xl">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 text-white text-sm font-bold rounded-full mb-4 shadow-[0_8px_24px_-6px_rgba(168,85,247,0.6)] border border-white/30">
            {copy.badge}
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-foreground leading-tight"
            dangerouslySetInnerHTML={{ __html: decodeHtml(copy.heading) }}
          />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {posts.map((post: BlogPost, index: number) => (
            <motion.div
              key={post.blogId || post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/${currentLang}/blog/${slugify(post.title)}-${post.blogId || post.id}`}
                className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-[hsl(var(--gold))]/60 dark:hover:border-[hsl(var(--gold))]/60 hover:shadow-[0_30px_80px_-20px_hsl(217_91%_60%/0.35)] dark:hover:shadow-[0_30px_80px_-20px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer w-full block h-full hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-44 sm:h-52 md:h-48 lg:h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 sm:px-3 backdrop-blur-[2px] bg-card text-card-foreground text-[10px] sm:text-xs font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-card-foreground group-hover:text-[hsl(var(--brand-blue))] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 line-clamp-3">
                    {post.excerpt?.trim() ||
                      post.content?.replace(/<[^>]*>/g, "").slice(0, 160).trim() ||
                      (post.sections?.[0]?.details ?? "")}
                  </p>

                  <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-border/50 mt-auto">
                    <span className="text-xs sm:text-sm text-muted-foreground truncate">
                      {copy.by} {post.author}
                    </span>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card dark:bg-white/10 text-card-foreground dark:text-white border border-card-foreground/30 dark:border-white/20 hover:bg-gradient-to-r hover:from-[hsl(var(--gold))] hover:to-[hsl(var(--brand-blue))] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm">
                        <span className="hidden sm:inline">{copy.readMore}</span>
                        <span className="sm:hidden">{copy.read}</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
