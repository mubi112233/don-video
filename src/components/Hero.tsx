"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Award,
  Loader2,
  TrendingUp,
  Search,
  BarChart3,
} from "lucide-react";
import { fetchHero, HeroData } from "@/lib/api";
import { useRouter } from "next/navigation";

import { siteConfig, localizedPath, type SiteLocale } from "@/lib/site-config";

export const Hero = ({ lang: langProp }: { lang?: string } = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const abortControllerRef = useRef<AbortController | null>(null);

  const getLangFromPath = () => {
    if (typeof window === "undefined") return langProp ?? "en";
    const match = window.location.pathname.match(/^\/(en|ge|de)\b/i);
    const raw = match?.[1]?.toLowerCase() || langProp || "en";
    return raw === "de" ? "ge" : raw;
  };

  const [currentLang, setCurrentLang] = useState<string>(langProp ?? "en");

  useEffect(() => {
    setCurrentLang(getLangFromPath());
  }, []);

  const isGe = currentLang === "ge";

  const fallbackData: HeroData = useMemo(() => isGe
    ? {
        title: "Professioneller Video-Schnitt für Creator & Marken",
        subtitle:
          "Cinematic Edits, schnelle Lieferung und unbegrenzte Revisionen. Wir schneiden Ihre YouTube-, TikTok- und Reels-Videos – damit Sie sich auf das Wachstum konzentrieren können.",
        tagline: "✨ Von 500+ Creators vertraut",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
        ctaPrimary: "Kostenlose Video-Beratung",
        urgency: "Begrenztes Angebot",
        stats: { clients: "10K+", costSaved: "24-48h", rating: "98%" },
      }
    : {
        title: "Professional Video Editing for Creators & Brands",
        subtitle:
          "Cinematic edits, fast turnaround, and unlimited revisions. We edit your YouTube, TikTok, and Reels videos — so you can focus on growing.",
        tagline: "✨ Trusted by 500+ Creators",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
        ctaPrimary: "Get Free Video Consultation",
        urgency: "Limited Offer",
        stats: { clients: "10K+", costSaved: "24-48h", rating: "98%" },
      }, [isGe]);

  // Use hardcoded fallback directly — no API call needed
  const loading = false;

  const title = fallbackData.title;
  const subtitle = fallbackData.subtitle;
  const tagline = fallbackData.tagline;
  const heroImage = fallbackData.image;
  const ctaPrimary = fallbackData.ctaPrimary;
  const urgency = fallbackData.urgency;
  const stats = fallbackData.stats;
  const statsLabels = isGe
    ? { clients: "Videos geschnitten", costSaved: "Lieferzeit", rating: "Zufriedenheit" }
    : { clients: "Videos Edited", costSaved: "Turnaround", rating: "Satisfaction" };

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center bg-background text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0"
      style={{ opacity }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] text-muted-foreground z-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden />
        </div>
      )}

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-pink-100/60 to-orange-100/60 dark:from-purple-950/40 dark:via-pink-950/40 dark:to-orange-950/40 z-0"
        style={{ y: springY }}
      />

      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brand/10 rounded-full blur-3xl z-0"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className="inline-block mb-3 sm:mb-4 md:mb-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-purple-500/50 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">{tagline}</span>
            </motion.div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] sm:leading-[1.12] md:leading-[1.1]">
              <span className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--brand-blue))] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-4 md:mb-5 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                variant="gold"
                size="lg"
                onClick={() => {
                  router.push(
                    localizedPath((currentLang === "ge" ? "ge" : "en") as SiteLocale, siteConfig.routes.bookMeeting)
                  );
                }}
                className="group relative w-full sm:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 h-auto font-bold transform hover:scale-[1.06] hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden rounded-xl border-2 border-white/20 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 dark:from-purple-500 dark:via-pink-400 dark:to-orange-400 text-white hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/60"
                aria-label="Get started with Don SEO professional SEO services"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.5,
                  }}
                  aria-hidden
                />
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--gold))] via-[hsl(var(--brand-blue))] to-[hsl(var(--gold))] rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden
                />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Calendar
                    className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                    aria-hidden
                  />
                  <span className="font-semibold group-hover:tracking-wide transition-all duration-300">{ctaPrimary}</span>
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300"
                    aria-hidden
                  />
                </span>
              </Button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-muted-foreground"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" aria-hidden />
                </motion.div>
                <span className="font-medium">{urgency}</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative lg:ml-auto mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20"
            >
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gradient-to-br from-[hsl(217,91%,65%)] via-[hsl(217,91%,60%)] to-[hsl(217,91%,55%)] dark:from-[hsl(217,91%,70%)] dark:via-[hsl(217,91%,65%)] dark:to-[hsl(217,91%,60%)] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-[0_10px_30px_-5px_rgba(59,130,246,0.4)] border border-white/20 flex items-center gap-1.5 sm:gap-2"
              >
                <Award className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden />
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">
                  {isGe ? "Top Bewertet" : "500+ Clients"}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative rounded-xl md:rounded-2xl overflow-hidden p-1 group shadow-[0_30px_120px_-30px_rgba(168,85,247,0.8)]"
              whileHover={{ rotateX: -6, rotateY: 10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ transformStyle: "preserve-3d", background: "linear-gradient(135deg, #a855f7, #ec4899, #f97316)", padding: "4px" }}
            >
              <motion.div style={{ transform: "translateZ(20px)" }}>
                <img
                  src={heroImage}
                  alt={isGe ? "Professioneller Video-Schnitt Arbeitsplatz" : "Professional video editing workspace with timeline and color grading"}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/hero-seo.jpg";
                  }}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-orange-500/30 pointer-events-none"
                style={{ transform: "translateZ(30px)" }}
                aria-hidden
              />

              <motion.div
                className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-br from-[hsl(var(--gold)/0.25)] to-[hsl(var(--brand-blue)/0.25)] blur-3xl pointer-events-none"
                style={{ transform: "translateZ(60px)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <motion.div
                className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-tr from-[hsl(var(--brand-blue)/0.2)] to-[hsl(var(--gold)/0.2)] blur-3xl pointer-events-none"
                style={{ transform: "translateZ(40px)" }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 backdrop-blur-xl bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-orange-900/90 dark:from-purple-900/80 dark:via-pink-900/80 dark:to-orange-900/80 border-2 border-purple-500/50 dark:border-purple-400/40 rounded-xl p-4 sm:p-5 shadow-2xl shadow-purple-500/50"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group/stat cursor-default"
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Search
                        className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-brand/80 group-hover/stat:text-brand transition-colors"
                        aria-hidden
                      />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--brand-blue))] bg-clip-text text-transparent">
                        {stats.clients}
                      </div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">
                        {statsLabels.clients}
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center border-x border-border/50 group/stat cursor-default"
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    >
                      <TrendingUp
                        className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-brand/80 group-hover/stat:text-brand transition-colors"
                        aria-hidden
                      />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--brand-blue))] bg-clip-text text-transparent">
                        {stats.costSaved}
                      </div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">
                        {statsLabels.costSaved}
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group/stat cursor-default"
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    >
                      <BarChart3
                        className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-brand/80 group-hover/stat:text-brand transition-colors"
                        aria-hidden
                      />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--brand-blue))] bg-clip-text text-transparent">
                        {stats.rating}
                      </div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">
                        {statsLabels.rating}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-brand/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <motion.div
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              aria-hidden
            />
            <motion.div
              className="absolute top-1/2 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400/10 rounded-full blur-2xl"
              animate={{ x: [-10, 10, -10], scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
