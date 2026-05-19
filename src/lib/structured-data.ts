import { SITE_URL, absoluteUrl } from "@/lib/site-url";

/** Coerce any date string to ISO 8601. Falls back to the raw string if parsing fails. */
function toISODate(date: string): string {
  if (!date) return new Date().toISOString();
  const d = new Date(date);
  return isNaN(d.getTime()) ? date : d.toISOString();
}

interface BlogStructuredDataProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  url: string;
}

export function generateBlogStructuredData({
  title,
  description,
  publishedAt,
  updatedAt,
  image,
  url,
}: BlogStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: "DON Video",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "DON Video",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og-image.jpg"),
      },
    },
    datePublished: toISODate(publishedAt),
    dateModified: toISODate(updatedAt || publishedAt),
    image: image,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

interface ServiceStructuredDataProps {
  serviceName: string;
  description: string;
  provider: string;
  areaServed: string;
  hasOfferCatalog: string;
}

export function generateServiceStructuredData({
  serviceName,
  description,
  provider,
  areaServed,
  hasOfferCatalog,
}: ServiceStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: SITE_URL,
    },
    areaServed: areaServed,
    hasOfferCatalog: hasOfferCatalog,
    serviceType: "Video Editing",
  };
}

interface LocalBusinessStructuredDataProps {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: string;
}

export function generateLocalBusinessStructuredData({
  name,
  description,
  url,
  telephone,
  email,
  address,
}: LocalBusinessStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: name,
    description: description,
    url: url,
    telephone: telephone,
    email: email,
    address: address
      ? {
          "@type": "PostalAddress",
          addressCountry: "DE",
          addressLocality: address,
        }
      : undefined,
    openingHours: "Mo-Fr 09:00-18:00",
    availableLanguage: ["English", "German"],
    serviceArea: "Worldwide",
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href.startsWith("/") ? item.href : `/${item.href}`}`,
    })),
  };
}

/** Video editing specific pricing schema */
export function generatePricingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DON Video Pricing Plans",
    description: "Professional video editing service pricing",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Offer",
          name: "Shortform Plan",
          description: "TikTok, Reels, Shorts editing — 4-8 videos/month",
          price: "399",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/en/book-meeting`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Offer",
          name: "Creator Plan",
          description: "YouTube longform + shortform editing — 8-12 videos/month",
          price: "799",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/en/book-meeting`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Offer",
          name: "Professional Plan",
          description: "Unlimited videos with dedicated editor, VFX & brand templates",
          price: "1499",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/en/book-meeting`,
        },
      },
    ],
  };
}
