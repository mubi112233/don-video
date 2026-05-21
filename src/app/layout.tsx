import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "@/styles/main.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { DesignSystemProvider } from "@/components/DesignSystemProvider";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DON Video – Professional Video Editing Services | YouTube, TikTok & Reels",
    template: "%s | DON Video",
  },
  description:
    "Professional video editing services for creators and brands. Cinematic YouTube edits, viral TikTok & Reels cuts, color grading, motion graphics, and audio post-production. 24-48h turnaround.",
  keywords: [
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
  ],
  authors: [{ name: "DON Video", url: SITE_URL }],
  creator: "DON Video",
  publisher: "DON Video",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: "website",
    siteName: "DON Video",
    title: "DON Video – Professional Video Editing Services | YouTube, TikTok & Reels",
    description:
      "Cinematic video editing for creators and brands. YouTube, TikTok, Reels, color grading, motion graphics. 24-48h turnaround. 500+ clients. 98% satisfaction.",
    url: absoluteUrl("/en"),
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DON Video — Professional Video Editing Services" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@donvideo",
    title: "DON Video – Professional Video Editing Services | YouTube, TikTok & Reels",
    description:
      "Cinematic video editing for creators and brands. YouTube, TikTok, Reels, color grading, motion graphics. 24-48h turnaround.",
    images: [absoluteUrl("/og-image.jpg")],
  },
  alternates: {
    canonical: absoluteUrl("/en"),
    languages: {
      en: absoluteUrl("/en"),
      de: absoluteUrl("/de"),
      "x-default": absoluteUrl("/en"),
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DON Video",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/og-image.jpg"),
    width: 1200,
    height: 630,
  },
  description:
    "Professional video editing services for creators and brands — YouTube, TikTok, Reels, color grading, motion graphics, and audio post-production.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "German"],
  },
  areaServed: { "@type": "Place", name: "Worldwide" },
  sameAs: ["https://twitter.com/donvideo", "https://www.instagram.com/donvideo"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DON Video",
  url: SITE_URL,
  inLanguage: ["en-US", "de-DE"],
  publisher: { "@type": "Organization", name: "DON Video" },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/en/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const htmlLang = headersList.get("x-html-lang") || "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-site-verification" content="NilMqJxre6z_IfCF2MhSaELbgq16YxDG_WzE6e36ChU" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G7B48DKJTC" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-G7B48DKJTC');`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* JSON-LD structured data — must be in body, not head, to avoid hydration mismatches */}
        <script
          id="org-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          id="website-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <DesignSystemProvider defaultTheme="blue">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
