"use client";

import { Video, Scissors, Palette, Sparkles, Film, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { SPACING } from "@/lib/constants";
import { usePathname } from "next/navigation";

const servicesConfig = [
  {
    icon: Scissors,
    en: { title: "Video Cutting & Editing", description: "Professional cuts, pacing, and story assembly for YouTube, TikTok, Reels, and more.", benefit: "Fast 24-48h Delivery" },
    ge: { title: "Video-Schnitt & Bearbeitung", description: "Professionelle Schnitte, Pacing und Story-Montage für YouTube, TikTok, Reels und mehr.", benefit: "Schnelle 24-48h Lieferung" },
  },
  {
    icon: Film,
    en: { title: "Longform YouTube Editing", description: "Full-length video production with B-roll, titles, motion graphics, and audio mixing.", benefit: "Cinematic Quality" },
    ge: { title: "Longform YouTube-Schnitt", description: "Vollständige Videoproduktion mit B-Roll, Titeln, Motion Graphics und Audio-Mixing.", benefit: "Kinematische Qualität" },
  },
  {
    icon: Video,
    en: { title: "Shortform & Reels", description: "Fast-paced TikTok, Instagram Reels, and YouTube Shorts optimized for retention and virality.", benefit: "Viral-Ready Edits" },
    ge: { title: "Shortform & Reels", description: "Schnelle TikTok-, Instagram-Reels- und YouTube-Shorts-Schnitte für maximale Retention.", benefit: "Viral-optimierte Edits" },
  },
  {
    icon: Palette,
    en: { title: "Color Grading", description: "Professional color correction and cinematic grading using DaVinci Resolve and Premiere Pro.", benefit: "Cinematic Look" },
    ge: { title: "Color Grading", description: "Professionelle Farbkorrektur und cinematisches Grading mit DaVinci Resolve und Premiere Pro.", benefit: "Cinematischer Look" },
  },
  {
    icon: Zap,
    en: { title: "Motion Graphics & VFX", description: "Custom animated titles, lower thirds, transitions, and visual effects for your brand.", benefit: "Brand-Consistent Design" },
    ge: { title: "Motion Graphics & VFX", description: "Animierte Titel, Lower Thirds, Übergänge und visuelle Effekte für Ihre Marke.", benefit: "Marken-konsistentes Design" },
  },
  {
    icon: Sparkles,
    en: { title: "Audio Post-Production", description: "Noise reduction, EQ, compression, and loudness normalization for professional sound.", benefit: "Crystal Clear Audio" },
    ge: { title: "Audio-Postproduktion", description: "Rauschunterdrückung, EQ, Kompression und Lautstärkenormalisierung für professionellen Sound.", benefit: "Kristallklarer Sound" },
  },
];

export const Services = () => {
  const pathname = usePathname();
  const isGe = pathname.startsWith("/ge") || pathname.startsWith("/de");

  const badge = isGe ? "🎬 Unsere Leistungen" : "🎬 Our Services";
  const heading = isGe ? "Professionelle Video-Editing-Services" : "Professional Video Editing Services";
  const description = isGe
    ? "Von schnellen Shortform-Clips bis hin zu cineastischen Longform-Videos – wir liefern alles, was Ihr Content braucht."
    : "From fast shortform clips to cinematic longform videos — we deliver everything your content needs to stand out.";

  return (
    <motion.section
      id="services"
      className="relative py-8 sm:py-10 md:py-14 lg:py-16 bg-background text-foreground z-30 overflow-hidden min-h-[500px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <motion.div
        className="absolute top-10 right-5 w-64 h-64 sm:top-16 sm:right-8 sm:w-80 sm:h-80 md:top-20 md:right-10 md:w-96 md:h-96 bg-gold/5 rounded-full blur-[100px] md:blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-5 w-56 h-56 sm:bottom-16 sm:left-8 sm:w-72 sm:h-72 md:bottom-20 md:left-10 md:w-80 md:h-80 bg-gold/5 rounded-full blur-[100px] md:blur-[120px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className={`container mx-auto ${SPACING.container}`}>
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 relative z-10 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full mb-3 sm:mb-4 shadow-[0_8px_24px_-6px_rgba(168,85,247,0.6)] border border-white/30 backdrop-blur-sm relative overflow-hidden animate-pulse">
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-50"></span>
            <span className="relative z-10">{badge}</span>
          </span>
          <h2 className="section-heading">{heading}</h2>
          <p className="text-base sm:text-lg md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed px-2 dark:text-white/90">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8 max-w-7xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {servicesConfig.map((service, index) => {
            const copy = isGe ? service.ge : service.en;
            return (
              <motion.div
                key={index}
                className="relative bg-card/80 backdrop-blur-sm text-foreground dark:text-white border border-border p-5 sm:p-6 md:p-7 lg:p-9 xl:p-10 rounded-xl sm:rounded-2xl hover:border-[hsl(var(--brand-blue))]/40 dark:hover:border-[hsl(var(--brand-blue))]/40 hover:shadow-[0_25px_80px_-20px_hsl(217_91%_60%/0.2)] dark:hover:shadow-[0_25px_80px_-20px_rgba(59,130,246,0.25)] transition-all duration-700 group overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], type: "spring", stiffness: 100, damping: 20 },
                  },
                }}
                whileHover={{ y: -12, scale: 1.03, rotateY: 5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-400/10 to-purple-400/10 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-4 sm:gap-5 md:gap-5 lg:gap-6 relative z-10">
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white ring-2 ring-purple-400/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_18px_40px_-12px_rgba(168,85,247,0.6)] group-hover:shadow-[0_20px_50px_-12px_rgba(236,72,153,0.8)] relative overflow-hidden"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    animate={{ y: [0, -5, 0] }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, delay: index * 0.2 }}
                    />
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-8 lg:h-8 relative z-10" />
                  </motion.div>

                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-3 text-foreground dark:text-white transition-colors duration-300">
                      {copy.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4 md:mb-4 leading-relaxed dark:text-white/90">
                      {copy.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-3.5 md:py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 border border-cyan-300 dark:border-cyan-600/50 rounded-full text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm md:text-xs lg:text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 mr-1.5 sm:mr-2 md:mr-1.5 lg:mr-2" />
                      <span className="leading-none">{copy.benefit}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 border-t-2 border-r-2 border-[hsl(var(--gold))]/0 group-hover:border-[hsl(var(--gold))]/50 rounded-tr-xl sm:rounded-tr-2xl transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 border-b-2 border-l-2 border-[hsl(var(--gold))]/0 group-hover:border-[hsl(var(--gold))]/50 rounded-bl-xl sm:rounded-bl-2xl transition-all duration-700" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
