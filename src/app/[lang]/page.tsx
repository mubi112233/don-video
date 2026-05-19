import { HeroServer } from "@/components/HeroServer";
import { Navbar } from "@/components/Navbar";
import { HomeBelowFold } from "@/components/HomeBelowFold.hybrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

export const revalidate = 3600;

const SUPPORTED_LANGS = ["en", "ge", "de"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === "de" || rawLang === "ge" ? "ge" : "en";

  const title =
    lang === "ge"
      ? "DON Video – Professioneller Videoschnitt | YouTube, TikTok & Reels"
      : "DON Video – Professional Video Editing Services | YouTube, TikTok & Reels";

  const description =
    lang === "ge"
      ? "Professioneller Videoschnitt für Creator und Marken. Cineastische YouTube-Edits, virale TikTok- & Reels-Schnitte, Color Grading, Motion Graphics und Audio-Postproduktion. 24-48h Lieferzeit."
      : "Professional video editing for creators and brands. Cinematic YouTube edits, viral TikTok & Reels cuts, color grading, motion graphics, and audio post-production. 24-48h turnaround. 500+ clients.";

  const keywords =
    lang === "ge"
      ? [
          "Videoschnitt Service",
          "professioneller Videoschnitt",
          "YouTube Videoschnitt",
          "TikTok Videoschnitt",
          "Instagram Reels Schnitt",
          "Color Grading",
          "Motion Graphics",
          "Videobearbeitung",
          "DON Video",
          "Videoschnitt für Creator",
          "Videoschnitt für Marken",
          "24 Stunden Videoschnitt",
        ]
      : [
          "video editing service",
          "professional video editing",
          "YouTube video editing",
          "TikTok video editing",
          "Instagram Reels editing",
          "shortform video editing",
          "longform video editing",
          "color grading service",
          "motion graphics",
          "video editor for hire",
          "DON Video",
          "don-video.com",
          "video editing for creators",
          "video editing for brands",
          "24 hour video editing",
          "cinematic video editing",
        ];

  const pathSeg = publicLocalePathSegment(lang);
  const canonical = absoluteUrl(`/${pathSeg}`);
  const { languages } = hreflangAlternates("");

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "DON Video",
      locale: lang === "ge" ? "de_DE" : "en_US",
      alternateLocale: lang === "ge" ? "en_US" : "de_DE",
      images: [
        {
          url: absoluteUrl("/og-image.jpg"),
          width: 1200,
          height: 630,
          alt:
            lang === "ge"
              ? "DON Video — Professioneller Videoschnitt"
              : "DON Video — Professional Video Editing Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@donvideo",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

const pageJsonLd = (baseUrl: string, lang: "en" | "ge") => {
  if (lang === "ge") {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "DON Video – Professioneller Videoschnitt",
      provider: {
        "@type": "Organization",
        name: "DON Video",
        url: baseUrl,
      },
      description:
        "Professioneller Videoschnitt für Creator und Marken — YouTube, TikTok, Reels, Color Grading, Motion Graphics und Audio-Postproduktion.",
      serviceType: "Video Editing",
      areaServed: { "@type": "Place", name: "Worldwide" },
      availableLanguage: ["Deutsch", "Englisch"],
      url: `${baseUrl}/de`,
      inLanguage: "de-DE",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "399",
        highPrice: "1499",
        offerCount: "3",
      },
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DON Video – Professional Video Editing Services",
    provider: {
      "@type": "Organization",
      name: "DON Video",
      url: baseUrl,
    },
    description:
      "Professional video editing for creators and brands — YouTube, TikTok, Reels, color grading, motion graphics, and audio post-production. 24-48h turnaround.",
    serviceType: "Video Editing",
    areaServed: { "@type": "Place", name: "Worldwide" },
    availableLanguage: ["English", "German"],
    url: `${baseUrl}/en`,
    inLanguage: "en-US",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "399",
      highPrice: "1499",
      offerCount: "3",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  };
};

export default async function HomeLangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLangValue } = await params;
  const rawLang = rawLangValue?.toLowerCase();

  if (!SUPPORTED_LANGS.includes(rawLang)) {
    notFound();
  }

  const lang = rawLang === "de" || rawLang === "ge" ? "ge" : "en";
  const jsonLd = pageJsonLd(SITE_URL, lang);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">
        <HeroServer lang={lang} />
        <HomeBelowFold lang={lang} />
      </main>
    </div>
  );
}
