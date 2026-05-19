import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BookMeetingClient from "./BookMeetingClient";
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
  const title = isDE
    ? "Termin buchen — Kostenlose Video-Beratung | DON Video"
    : "Book a Meeting — Free Video Editing Consultation | DON Video";
  const description = isDE
    ? "Vereinbaren Sie eine kostenlose Beratung mit DON Video und erhalten Sie professionellen Videoschnitt für YouTube, TikTok und Reels."
    : "Schedule a free consultation with DON Video and get professional video editing for YouTube, TikTok, and Reels.";
  const { languages } = hreflangAlternates("book-meeting");
  const canonical = absoluteUrl(`/${seg}/book-meeting`);

  return {
    title,
    description,
    keywords: isDE
      ? ["Videoschnitt Beratung", "Videoschnitt Termin", "DON Video buchen", "kostenlose Beratung"]
      : ["video editing consultation", "book video editor", "DON Video meeting", "free video consultation"],
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

export default async function BookMeetingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!SUPPORTED_LANGS.includes(rawLang?.toLowerCase())) notFound();
  return <BookMeetingClient />;
}
