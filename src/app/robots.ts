import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  process.env.SITE_URL?.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  if (!siteUrl) {
    return {
      rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl.replace(/^https?:\/\//, ""),
  };
}
