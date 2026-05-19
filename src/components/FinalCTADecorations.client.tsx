"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function FinalCTADecorations() {
  return (
    <>
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 bg-[hsl(217,91%,65%)]/20 rounded-full mix-blend-overlay filter blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-60 h-60 bg-[hsl(220,90%,60%)]/25 rounded-full mix-blend-overlay filter blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/25 rounded-lg"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-16 right-16 w-12 h-12 sm:w-16 sm:h-16 border-2 border-white/25 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export function AnimatedSparkles() {
  return (
    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
    </motion.div>
  );
}

export function AnimatedHeadline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {children}
    </motion.h2>
  );
}
