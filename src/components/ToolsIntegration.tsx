"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SPACING } from "@/lib/constants";

const tools = [
  { name: "Adobe Premiere Pro", category: "Editing" },
  { name: "DaVinci Resolve", category: "Color" },
  { name: "After Effects", category: "Motion" },
  { name: "Final Cut Pro", category: "Editing" },
  { name: "Audition", category: "Audio" },
  { name: "Logic Pro", category: "Audio" },
  { name: "CapCut", category: "Shortform" },
  { name: "Canva", category: "Design" },
  { name: "Frame.io", category: "Review" },
  { name: "Dropbox", category: "Delivery" },
  { name: "Google Drive", category: "Delivery" },
  { name: "WeTransfer", category: "Delivery" },
  { name: "YouTube Studio", category: "Platform" },
  { name: "TikTok Creator", category: "Platform" },
  { name: "Instagram", category: "Platform" },
  { name: "Notion", category: "Workflow" },
  { name: "Slack", category: "Communication" },
  { name: "Trello", category: "Workflow" },
];

const categoryLabels: Record<string, { en: string; ge: string }> = {
  Editing:       { en: "Editing",       ge: "Schnitt" },
  Color:         { en: "Color",         ge: "Farbe" },
  Motion:        { en: "Motion",        ge: "Motion" },
  Audio:         { en: "Audio",         ge: "Audio" },
  Shortform:     { en: "Shortform",     ge: "Shortform" },
  Design:        { en: "Design",        ge: "Design" },
  Review:        { en: "Review",        ge: "Review" },
  Delivery:      { en: "Delivery",      ge: "Lieferung" },
  Platform:      { en: "Platform",      ge: "Plattform" },
  Workflow:      { en: "Workflow",      ge: "Workflow" },
  Communication: { en: "Communication", ge: "Kommunikation" },
};

export const ToolsIntegration = () => {
  const pathname = usePathname();
  const isGe = pathname.startsWith("/ge") || pathname.startsWith("/de");

  const getCategory = (category: string) =>
    categoryLabels[category]?.[isGe ? "ge" : "en"] ?? category;

  return (
    <motion.section
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className={`container mx-auto ${SPACING.container}`}>
        {/* Header */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="section-heading mb-3 sm:mb-4">
            {isGe ? (
              <>Wir arbeiten mit Ihren <span className="gradient-heading">bevorzugten Tools</span></>
            ) : (
              <>We Work With Your <span className="gradient-heading">Favorite Tools</span></>
            )}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
            {isGe
              ? "Unsere Editoren sind in allen gängigen Bearbeitungs- und Liefertools geschult und passen sich Ihrem Workflow an."
              : "Our editors are trained in all major editing and delivery tools and adapt seamlessly to your existing workflow."}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tools grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 text-center hover:border-[hsl(var(--brand-blue))]/40 dark:hover:border-[hsl(var(--brand-blue))]/40 hover:shadow-[0_12px_35px_-10px_hsl(217_91%_60%/0.15)] dark:hover:shadow-[0_12px_35px_-10px_rgba(59,130,246,0.15)] transition-all duration-300 group overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-blue))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-sm sm:text-base font-bold text-foreground dark:text-white transition-colors relative z-10">
                  {tool.name}
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-[hsl(var(--brand-blue))]/10 to-[hsl(var(--brand-blue))]/10 text-[hsl(var(--brand-blue))] rounded-full border border-[hsl(var(--brand-blue))]/20 relative z-10">
                  {getCategory(tool.category)}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Callout */}
          <motion.div
            className="relative bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 sm:p-8 md:p-10 text-center overflow-hidden group hover:border-[hsl(var(--brand-blue))]/40 dark:hover:border-[hsl(var(--brand-blue))]/40 hover:shadow-[0_20px_50px_-15px_hsl(217_91%_60%/0.15)] dark:hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-blue))]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--brand-blue))]/30 to-transparent"></div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-foreground dark:text-white mb-3 sm:mb-4 relative z-10">
              <span className="bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-blue))] bg-clip-text text-transparent">
                {isGe ? "Benötigen Sie ein bestimmtes Tool?" : "Need a specific tool?"}
              </span>{" "}
              {isGe ? "Einfach fragen." : "Just ask."}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-white/90 leading-relaxed relative z-10">
              {isGe
                ? "Wir schulen unsere VAs in jedem Tool, das Sie benötigen – ohne zusätzliche Kosten."
                : "We train our VAs on any tool you need — at no extra cost."}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
