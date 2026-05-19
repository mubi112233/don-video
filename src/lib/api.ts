/**
 * API Utility Functions for Next.js Application
 * 
 * This utility provides consistent API fetching with proper headers
 * including the X-Tenant-ID header for multi-tenancy support.
 */

// API Configuration
const getApiBase = () =>
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://api.don-va.com';

const getTenantId = () =>
  process.env.NEXT_PUBLIC_TENANT_ID ||
  'video-editing';

/**
 * Creates fetch options with proper headers including X-Tenant-ID
 */
export function createFetchOptions(options: RequestInit = {}): RequestInit {
  const headers = new Headers(options.headers || {});

  // Inject X-Tenant-ID if it's not already there
  if (!headers.has('X-Tenant-ID')) {
    headers.set('X-Tenant-ID', getTenantId());
  }

  // Set default content-type if not present and body exists
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return {
    ...options,
    headers,
  };
}

/**
 * Server-side API fetch function with proper headers
 * Use this in server components and API routes
 */
export async function fetchAPI(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${getApiBase()}${endpoint}`;
  const fetchOptions = createFetchOptions(options);

  return fetch(url, fetchOptions);
}

/**
 * Client-side API fetch function with proper headers
 * Use this in client components
 */
export async function fetchAPIClient(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${getApiBase()}${endpoint}`;
  const fetchOptions = createFetchOptions(options);

  return fetch(url, fetchOptions);
}

/**
 * Common API endpoints used across the application
 */
export const API_ENDPOINTS = {
  HERO: '/api/hero',
  WHY_CHOOSE_US: '/api/why-choose-us',
  SERVICES: '/api/services',
  TESTIMONIALS: '/api/testimonials',
  FAQ: '/api/faq',
  CASE_STUDIES: '/api/case-studies',
  BLOGS: '/api/blogs',
  PRICING: '/api/pricing',
  HOW_IT_WORKS: '/api/how-it-works',
  FINAL_CTA: '/api/final-cta',
} as const;

/**
 * Helper function to build API URLs with language parameter
 */
export function buildApiUrl(endpoint: string, lang: string): string {
  const separator = endpoint.includes('?') ? '&' : '?';
  return `${endpoint}${separator}lang=${lang}`;
}

const sanitizeLog = (val: unknown): string =>
  String(val).replace(/[\r\n\t]/g, " ").slice(0, 200);

/**
 * Generic API fetcher for data with language support
 */
export async function fetchApiData<T>(
  endpoint: string,
  lang: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = buildApiUrl(endpoint, lang);
  const maxRetries = 0; // No retries — fall back to static data immediately
  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

      const response = await fetchAPI(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Silently fall back — API may not be configured yet
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      lastError = error;
      // Only warn on unexpected errors, not on network/abort (API not configured)
      if (error.name !== 'AbortError' && error.name !== 'TypeError') {
        console.warn(`[DON Video] API unavailable, using fallback data.`);
      }
    }
  }

  return null;
}

/**
 * Generic API fetcher for client-side data with language support
 */
export async function fetchApiDataClient<T>(
  endpoint: string,
  lang: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = buildApiUrl(endpoint, lang);
  const maxRetries = 0; // No retries — fall back to static data immediately
  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

      const response = await fetchAPIClient(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Silently fall back — API may not be configured yet
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      lastError = error;
      // Only warn on unexpected errors, not on network/abort (API not configured)
      if (error.name !== 'AbortError' && error.name !== 'TypeError') {
        console.warn(`[DON Video] API unavailable, using fallback data.`);
      }
    }
  }

  return null;
}

// Language normalization — API stores German data as 'de', not 'ge'
export const normalizeLanguage = (lang: string): string => {
  const normalized = lang.toLowerCase();
  if (normalized.startsWith('de') || normalized.startsWith('ge')) return 'de';
  return 'en';
};

// Hero API
export interface HeroData {
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  ctaPrimary: string;
  urgency: string;
  stats: {
    clients: string;
    costSaved: string;
    rating: string;
  };
}

const HERO_FALLBACK_EN: HeroData = {
  title: "Professional Video Editing for Creators & Brands",
  subtitle: "Cinematic edits, fast turnaround, and unlimited revisions. We edit your YouTube, TikTok, and Reels videos — so you can focus on growing.",
  tagline: "✨ Trusted by 500+ Creators",
  image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
  ctaPrimary: "Get Free Video Consultation",
  urgency: "Limited Offer",
  stats: { clients: "10K+", costSaved: "24-48h", rating: "98%" },
};

const HERO_FALLBACK_DE: HeroData = {
  title: "Professioneller Video-Schnitt für Creator & Marken",
  subtitle: "Cinematic Edits, schnelle Lieferung und unbegrenzte Revisionen. Wir schneiden Ihre YouTube-, TikTok- und Reels-Videos – damit Sie sich auf das Wachstum konzentrieren können.",
  tagline: "✨ Von 500+ Creators vertraut",
  image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
  ctaPrimary: "Kostenlose Video-Beratung",
  urgency: "Begrenztes Angebot",
  stats: { clients: "10K+", costSaved: "24-48h", rating: "98%" },
};

export const fetchHero = (lang: string = 'en') => 
  fetchApiDataClient<{ hero: HeroData }>(API_ENDPOINTS.HERO, normalizeLanguage(lang))
    .then(data => data?.hero || (normalizeLanguage(lang) === 'de' ? HERO_FALLBACK_DE : HERO_FALLBACK_EN));

// Services API
export interface Service {
  _id?: string;
  order: number;
  title: string;
  description: string;
  benefit: string;
  icon: string;
}

export interface ServicesResponse {
  services: Service[];
}

const SERVICES_FALLBACK: ServicesResponse = {
  services: [
    { order: 1, title: "Video Cutting & Editing", description: "Professional cuts, pacing, and story assembly for YouTube, TikTok, Reels, and more.", benefit: "Fast 24-48h Delivery", icon: "Scissors" },
    { order: 2, title: "Longform YouTube Editing", description: "Full-length video production with B-roll, titles, motion graphics, and audio mixing.", benefit: "Cinematic Quality", icon: "Film" },
    { order: 3, title: "Shortform & Reels", description: "Fast-paced TikTok, Instagram Reels, and YouTube Shorts optimized for retention and virality.", benefit: "Viral-Ready Edits", icon: "Video" },
    { order: 4, title: "Color Grading", description: "Professional color correction and cinematic grading using DaVinci Resolve and Premiere Pro.", benefit: "Cinematic Look", icon: "Palette" },
  ],
};

export const fetchServices = (lang: string = 'en') => 
  fetchApiDataClient<ServicesResponse>(API_ENDPOINTS.SERVICES, normalizeLanguage(lang))
    .then(data => data || SERVICES_FALLBACK);

// Why Choose Us API
export interface WhyChooseUsData {
  badge: string;
  heading: string;
  description: string;
  items: Array<{ icon: string; title: string; description: string }>;
}

const WHY_CHOOSE_US_FALLBACK: WhyChooseUsData = {
  badge: "Why Choose Us",
  heading: "The Perfect Video Editing Solution",
  description: "Experience the difference with our professional video editors who deliver cinematic results on time, every time.",
  items: [
    { icon: "Target", title: "Expertly Vetted Editors", description: "Every editor is carefully screened and tested to ensure they meet our high standards of excellence." },
    { icon: "Shield", title: "Secure & Confidential", description: "Your footage and business information are protected with enterprise-grade security measures." },
    { icon: "Zap", title: "Lightning Fast Delivery", description: "Get your edited videos within 24-48 hours. Our streamlined process ensures you never miss a deadline." },
    { icon: "HeartHandshake", title: "Unlimited Revisions", description: "We revise until you're 100% satisfied — no extra charges, no questions asked." },
    { icon: "TrendingUp", title: "Scalable Output", description: "Easily scale from 4 to 40+ videos per month based on your content needs." },
    { icon: "Award", title: "Proven Track Record", description: "Trusted by 500+ creators and brands with a 98% client satisfaction rate." },
  ],
};

export const fetchWhyChooseUs = (lang: string = 'en') => 
  fetchApiDataClient<{ whyChooseUs: WhyChooseUsData }>(API_ENDPOINTS.WHY_CHOOSE_US, normalizeLanguage(lang))
    .then(data => data?.whyChooseUs || WHY_CHOOSE_US_FALLBACK);

// Pricing API
export interface PricingPlan {
  planKey: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface PricingResponse {
  plans: PricingPlan[];
}

// Fallback data for Pricing when API is down
const PRICING_FALLBACK: PricingResponse = {
  plans: [
    {
      planKey: "starter",
      name: "Starter",
      price: 499,
      features: ["Technical SEO Audit", "Keyword Research", "10 Pages Optimized", "Monthly Reporting"],
      popular: false,
    },
    {
      planKey: "professional",
      name: "Professional",
      price: 999,
      features: ["Everything in Starter", "Content Strategy", "Link Building", "25 Pages Optimized", "Weekly Updates"],
      popular: true,
    },
    {
      planKey: "enterprise",
      name: "Enterprise",
      price: 2499,
      features: ["Everything in Professional", "Custom Solutions", "Dedicated Account Manager", "Unlimited Pages", "Priority Support"],
      popular: false,
    },
  ],
};

export const fetchPricing = (lang: string = 'en') => 
  fetchApiDataClient<PricingResponse>(API_ENDPOINTS.PRICING, normalizeLanguage(lang))
    .then(data => data || PRICING_FALLBACK);

// Testimonials API
export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface TestimonialsResponse {
  testimonials: Testimonial[];
}

// Fallback data for Testimonials when API is down
const TESTIMONIALS_FALLBACK: TestimonialsResponse = {
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc",
      content: "The SEO improvements were remarkable. Our organic traffic increased by 150% in just 3 months.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "Growth Solutions",
      content: "Professional team, excellent results. They understood our business goals perfectly.",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      role: "Operations Manager",
      company: "Digital Agency",
      content: "Great service and communication throughout the entire process. Highly recommended!",
      rating: 5,
    },
  ],
};

export const fetchTestimonials = (lang: string = 'en') => 
  fetchApiDataClient<TestimonialsResponse>(API_ENDPOINTS.TESTIMONIALS, normalizeLanguage(lang))
    .then(data => data || TESTIMONIALS_FALLBACK);

// How It Works API
export interface Step {
  _id?: string;
  lang: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  stepLabel: string;
  createdAt?: string;
  updatedAt?: string;
  metaTitle?: string;
}

export interface HowItWorksData {
  lang: string;
  steps: Step[];
}

// Fallback data for How It Works when API is down
const HOW_IT_WORKS_FALLBACK: HowItWorksData = {
  lang: 'en',
  steps: [
    {
      lang: 'en',
      stepNumber: 1,
      title: "SEO Audit",
      description: "We conduct a comprehensive analysis of your website to identify opportunities and issues.",
      icon: "Search",
      stepLabel: "Step 1",
    },
    {
      lang: 'en',
      stepNumber: 2,
      title: "Strategy Development",
      description: "We create a customized SEO strategy tailored to your business goals and target audience.",
      icon: "Target",
      stepLabel: "Step 2",
    },
    {
      lang: 'en',
      stepNumber: 3,
      title: "Implementation",
      description: "Our team implements the strategy with technical optimization, content creation, and link building.",
      icon: "Wrench",
      stepLabel: "Step 3",
    },
    {
      lang: 'en',
      stepNumber: 4,
      title: "Monitoring & Reporting",
      description: "We continuously monitor performance and provide detailed reports on progress and ROI.",
      icon: "BarChart",
      stepLabel: "Step 4",
    },
  ],
};

export const fetchHowItWorks = (lang: string = 'en') => 
  fetchApiDataClient<HowItWorksData>(API_ENDPOINTS.HOW_IT_WORKS, normalizeLanguage(lang))
    .then(data => data || { lang: normalizeLanguage(lang), steps: HOW_IT_WORKS_FALLBACK.steps });

// Final CTA API
export interface FinalCTAData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
}

// Fallback data for Final CTA when API is down
const FINAL_CTA_FALLBACK: FinalCTAData = {
  title: "Ready to Grow Your Organic Traffic?",
  subtitle: "Start your SEO journey today with our proven strategies.",
  ctaText: "Get Started Now",
  ctaUrl: "/contact",
};

export const fetchFinalCTA = (lang: string = 'en') => 
  fetchApiDataClient<FinalCTAData>(API_ENDPOINTS.FINAL_CTA, normalizeLanguage(lang))
    .then(data => data || FINAL_CTA_FALLBACK);

// FAQ API
export interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface FAQResponse {
  faqs: FAQItem[];
}

// Fallback data for FAQ when API is down
const FAQ_FALLBACK: FAQResponse = {
  faqs: [
    {
      question: "How long does SEO take to show results?",
      answer: "SEO typically takes 3-6 months to show significant results. However, initial improvements can be seen within 4-8 weeks. We provide regular progress reports.",
      category: "Timeline",
      order: 1,
    },
    {
      question: "What's included in your SEO services?",
      answer: "Our services include technical SEO, keyword research, content optimization, link building, and monthly reporting with actionable insights.",
      category: "Services",
      order: 2,
    },
    {
      question: "Do you guarantee first page rankings?",
      answer: "No legitimate SEO company can guarantee rankings. However, our proven strategies have achieved first-page results for over 200+ clients.",
      category: "Results",
      order: 3,
    },
    {
      question: "How do you measure SEO success?",
      answer: "We track organic traffic, keyword rankings, conversions, and ROI through detailed monthly reports and Google Analytics dashboards.",
      category: "Reporting",
      order: 4,
    },
  ],
};

export const fetchFAQ = (lang: string = 'en') => 
  fetchApiDataClient<FAQResponse>(API_ENDPOINTS.FAQ, normalizeLanguage(lang))
    .then(data => data || FAQ_FALLBACK);

// Case Studies API
export interface CaseStudy {
  _id?: string;
  title: string;
  description: string;
  image: string;
  results: string;
  link?: string;
  order: number;
}

export interface CaseStudiesResponse {
  caseStudies: CaseStudy[];
}

// Fallback data for Case Studies when API is down
const CASE_STUDIES_FALLBACK: CaseStudiesResponse = {
  caseStudies: [
    {
      title: "E-commerce Site Growth",
      description: "Increased organic traffic for an online retailer by 300%",
      image: "/case-study-1.jpg",
      results: "+300% Organic Traffic, +150% Sales",
      order: 1,
    },
    {
      title: "B2B Lead Generation",
      description: "Generated 200+ qualified leads per month for a software company",
      image: "/case-study-2.jpg",
      results: "200+ Leads/Month, 45% Cost Reduction",
      order: 2,
    },
    {
      title: "Local Business Domination",
      description: "Achieved #1 rankings for 15+ competitive local keywords",
      image: "/case-study-3.jpg",
      results: "#1 Rankings for 15 Keywords, 5x Phone Calls",
      order: 3,
    },
  ],
};

export const fetchCaseStudies = (lang: string = 'en') => 
  fetchApiDataClient<CaseStudiesResponse>(API_ENDPOINTS.CASE_STUDIES, normalizeLanguage(lang))
    .then(data => data || CASE_STUDIES_FALLBACK);

export const fetchCaseStudiesServer = (lang: string = 'en') =>
  fetchApiData<CaseStudiesResponse>(API_ENDPOINTS.CASE_STUDIES, normalizeLanguage(lang))
    .then(data => data || CASE_STUDIES_FALLBACK);

// Blog API
export interface BlogPost {
  blogId: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  slug: string;
}

export interface BlogResponse {
  posts: BlogPost[];
}

// Fallback data for Blogs when API is down
const BLOG_FALLBACK: BlogResponse = {
  posts: [
    {
      blogId: 1,
      title: "10 Essential SEO Tips for 2024",
      excerpt: "Learn the most important SEO strategies that will dominate in 2024 and beyond.",
      content: "Content about SEO tips for 2024...",
      image: "/blog-1.jpg",
      author: "John Smith",
      publishedAt: "2024-01-15",
      slug: "10-essential-seo-tips-2024",
    },
    {
      blogId: 2,
      title: "How to Conduct an SEO Audit",
      excerpt: "A step-by-step guide to auditing your website for SEO issues.",
      content: "Content about SEO audit process...",
      image: "/blog-2.jpg",
      author: "Sarah Johnson",
      publishedAt: "2024-01-10",
      slug: "how-to-conduct-seo-audit",
    },
    {
      blogId: 3,
      title: "Link Building Strategies That Work",
      excerpt: "Proven link building tactics that improve your domain authority.",
      content: "Content about link building...",
      image: "/blog-3.jpg",
      author: "Michael Chen",
      publishedAt: "2024-01-05",
      slug: "link-building-strategies-that-work",
    },
  ],
};

export const fetchBlog = (lang: string = 'en') => 
  fetchApiDataClient<BlogResponse>(API_ENDPOINTS.BLOGS, normalizeLanguage(lang))
    .then(data => data || BLOG_FALLBACK);
