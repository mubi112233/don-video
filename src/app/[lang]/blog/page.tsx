import type { Metadata } from "next";
import { BlogListingClient } from "./BlogListingClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const { languages } = hreflangAlternates("blog");
  const canonical = absoluteUrl(`/${seg}/blog`);

  const isDe = seg === "de";
  const title = isDe
    ? "Blog — Video Editing Tipps & Tutorials | DON Video"
    : "Blog — Video Editing Tips & Tutorials | DON Video";
  const description = isDe
    ? "Tipps, Workflows und Best Practices für Videoschnitt, Color Grading, Motion Graphics und Shortform-Content — von DON Video."
    : "Tips, workflows, and best practices for video editing, color grading, motion graphics, and shortform content — by DON Video.";

  return {
    title,
    description,
    keywords: isDe
      ? [
          "Videoschnitt Blog",
          "Videoschnitt Tipps",
          "Color Grading Tutorial",
          "Motion Graphics",
          "TikTok Schnitt",
          "YouTube Editing",
          "DON Video",
        ]
      : [
          "video editing blog",
          "video editing tips",
          "color grading tutorial",
          "motion graphics",
          "TikTok editing",
          "YouTube editing tips",
          "DON Video",
        ],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDe ? "de_DE" : "en_US",
      alternateLocale: isDe ? "en_US" : "de_DE",
      siteName: "DON Video",
      images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: "DON Video Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@donvideo",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: { index: true, follow: true },
  };
}

export default function BlogPage() {
  return <BlogListingClient />;
}
