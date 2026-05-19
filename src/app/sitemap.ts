import type { MetadataRoute } from "next";
import { fetchBlog, fetchCaseStudies, normalizeLanguage } from "@/lib/api";
import { SITE_URL } from "@/lib/site-url";

const base = SITE_URL;

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

const href = (path: string) => ({
  en: `${base}/en${path}`,
  de: `${base}/de${path}`,
  "x-default": `${base}/en${path}`,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: href("") },
    },
    {
      url: `${base}/de`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: href("") },
    },
    {
      url: `${base}/en/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: { languages: href("/blog") },
    },
    {
      url: `${base}/de/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: { languages: href("/blog") },
    },
    {
      url: `${base}/en/book-meeting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: href("/book-meeting") },
    },
    {
      url: `${base}/de/book-meeting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: href("/book-meeting") },
    },
    {
      url: `${base}/en/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: href("/contact") },
    },
    {
      url: `${base}/de/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: href("/contact") },
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const [enData, geData] = await Promise.all([
      fetchBlog(normalizeLanguage("en")),
      fetchBlog(normalizeLanguage("ge")),
    ]);
    const enPosts = Array.isArray((enData as any)?.posts) ? (enData as any).posts : [];
    const gePosts = Array.isArray((geData as any)?.posts) ? (geData as any).posts : [];
    blogRoutes = [
      ...enPosts.map((p: any) => ({
        url: `${base}/en/blog/${p.slug || `${slugify(p.title)}-${p.blogId}`}`,
        lastModified: p.publishedAt || p.updatedAt ? new Date(p.publishedAt || p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...gePosts.map((p: any) => ({
        url: `${base}/de/blog/${p.slug || `${slugify(p.title)}-${p.blogId}`}`,
        lastModified: p.publishedAt || p.updatedAt ? new Date(p.publishedAt || p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {}

  let caseRoutes: MetadataRoute.Sitemap = [];
  try {
    const [enData, geData] = await Promise.all([
      fetchCaseStudies(normalizeLanguage("en")),
      fetchCaseStudies(normalizeLanguage("ge")),
    ]);
    const enStudies = Array.isArray((enData as any)?.caseStudies) ? (enData as any).caseStudies : [];
    const geStudies = Array.isArray((geData as any)?.caseStudies) ? (geData as any).caseStudies : [];
    caseRoutes = [
      ...enStudies.map((s: any) => ({
        url: `${base}/en/case-study/${slugify(s.title)}-${s.caseStudyId}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...geStudies.map((s: any) => ({
        url: `${base}/de/case-study/${slugify(s.title)}-${s.caseStudyId}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {}

  return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}
