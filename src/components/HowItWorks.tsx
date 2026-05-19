"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, UserCheck, Rocket, LineChart } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const steps = [
  { icon: Calendar, key: "step1" as const },
  { icon: UserCheck, key: "step2" as const },
  { icon: Rocket, key: "step3" as const },
  { icon: LineChart, key: "step4" as const },
];

function resolveLang(langProp: string | undefined, pathname: string | null): "en" | "ge" {
  if (langProp === "ge" || langProp === "de") return "ge";
  if (langProp === "en") return "en";
  const m = pathname?.match(/^\/(en|ge|de)\b/i);
  if (m && (m[1].toLowerCase() === "ge" || m[1].toLowerCase() === "de")) return "ge";
  return "en";
}

export function HowItWorks({ lang }: { lang?: string } = {}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const effectiveLang = useMemo(() => resolveLang(lang, pathname), [lang, pathname]);
  const copy = useMemo(() => getCopy(effectiveLang, "howItWorks"), [effectiveLang]);

  return (
    <motion.section
      id="how-it-works"
      className="relative py-8 sm:py-10 md:py-14 lg:py-16 text-foreground z-20 overflow-hidden min-h-[600px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: prefersReducedMotion ? 0.5 : 1.0, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, -20, 0], scale: [1, 1.15, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60"
          style={{ top: `${20 + i * 15}%`, left: `${10 + i * 12}%` }}
          animate={{ y: [0, -100, 0], x: [0, 50, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 relative z-10">
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 text-white text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4 shadow-[0_8px_24px_-6px_rgba(168,85,247,0.6)] border border-white/30 backdrop-blur-sm relative overflow-hidden animate-pulse"
            whileHover={{ scale: 1.05 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-30"></span>
            <span className="relative z-10">{copy.badge}</span>
          </motion.span>
          <h2
            className="section-heading"
            dangerouslySetInnerHTML={{ __html: copy.heading }}
          />
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed dark:text-white/90">
            {copy.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              className="relative mb-12 sm:mb-16 last:mb-0"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : (index % 2 === 0 ? -16 : 16) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: prefersReducedMotion ? 0.45 : 0.7, delay: index * 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <motion.div
                  className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white ring-2 ring-blue-400/50 shadow-[0_12px_30px_-12px_rgba(59,130,246,0.6)] relative group"
                  whileHover={prefersReducedMotion ? { scale: 1.02 } : { scale: 1.06, rotate: 6 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-indigo-600/30 blur-md group-hover:blur-lg transition-all duration-500" />
                  <step.icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white relative z-10" />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-white/50 shadow-lg">
                    {index + 1}
                  </div>
                </motion.div>

                <motion.div
                  className={[
                    "relative flex-1 bg-card/80 backdrop-blur-md border border-border rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-9 transition-all duration-300 group overflow-hidden",
                    "text-foreground dark:text-white",
                    "hover:border-[hsl(var(--brand-blue))]/40 dark:hover:border-[hsl(var(--brand-blue))]/40",
                    "hover:shadow-[0_20px_50px_-14px_hsl(217_91%_60%/0.15)] dark:hover:shadow-[0_20px_50px_-14px_rgba(59,130,246,0.15)]",
                    index % 2 === 1 ? "md:text-right" : "",
                  ].join(" ")}
                  whileHover={{ y: -6, scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-orange-400/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-sm uppercase tracking-wider mb-3 inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700/50">
                    {copy.steps[step.key].step}
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground dark:text-white transition-colors duration-300">
                    {copy.steps[step.key].title}
                  </h3>
                  <p className="text-muted-foreground dark:text-white/90 leading-relaxed text-base sm:text-base md:text-lg">
                    {copy.steps[step.key].description}
                  </p>
                  <div className={`absolute ${index % 2 === 1 ? "top-0 left-0 border-t-2 border-l-2 rounded-tl-xl sm:rounded-tl-2xl" : "bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl sm:rounded-br-2xl"} w-12 h-12 sm:w-16 sm:h-16 border-purple-400/0 group-hover:border-purple-400/50 transition-all duration-500`} />
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="mt-8 sm:mt-12 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 font-semibold shadow-lg shadow-purple-500/50">
              {copy.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
