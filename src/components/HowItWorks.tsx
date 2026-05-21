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

  const sectionTransition = prefersReducedMotion ? 0.5 : 1.0;

  return (
    <motion.section
      id="how-it-works"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-background z-20 min-h-[600px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: sectionTransition, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16">
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 bg-foreground text-gold text-sm font-semibold rounded-full mb-4">
            {copy.badge}
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            dangerouslySetInnerHTML={{ __html: copy.heading }}
          />
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {copy.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              className="relative mb-12 sm:mb-16 last:mb-0"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: 0 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div
                className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gold via-primary to-gold flex items-center justify-center shadow-[0_20px_60px_-15px_hsl(220_100%_50%/0.6)] relative group"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <step.icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-black relative z-10" />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-foreground text-gold rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {index + 1}
                  </div>
                </motion.div>

                <motion.div
                  className={`relative flex-1 bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:shadow-[0_20px_60px_-15px_hsl(220_100%_50%/0.25)] transition-all duration-500 group overflow-hidden ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.02 }}
                >
                  <p className="text-gold font-bold text-sm uppercase tracking-wider mb-3 inline-block px-3 py-1 bg-gold/10 rounded-full">
                    {copy.steps[step.key].step}
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-gold transition-colors duration-300">
                    {copy.steps[step.key].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                    {copy.steps[step.key].description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
