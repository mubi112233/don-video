import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

const SUPPORTED_LANGS = ["en", "ge", "de"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const isDE = seg === "de";
  const title = isDE ? "Kontakt — Videoschnitt Service | DON Video" : "Contact — Video Editing Service | DON Video";
  const description = isDE
    ? "Kontaktieren Sie DON Video für professionellen Videoschnitt. YouTube, TikTok, Reels, Color Grading und mehr."
    : "Contact DON Video for professional video editing. YouTube, TikTok, Reels, color grading, and more.";
  const { languages } = hreflangAlternates("contact");
  const canonical = absoluteUrl(`/${seg}/contact`);

  return {
    title: { absolute: `${title}` },
    description,
    keywords: isDE
      ? ["Kontakt DON Video", "Videoschnitt anfrage", "Videoschnitt beratung", "DON Video"]
      : ["contact DON Video", "video editing inquiry", "video editing consultation", "DON Video"],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDE ? "de_DE" : "en_US",
      alternateLocale: isDE ? "en_US" : "de_DE",
      siteName: "DON Video",
      images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: "DON Video" }],
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!SUPPORTED_LANGS.includes(rawLang?.toLowerCase())) notFound();
  const lang = rawLang === "ge" || rawLang === "de" ? "ge" : "en";
  return <ContactClient lang={lang} />;
}
