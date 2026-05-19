"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Video, CheckCircle2, Shield, Star, Scissors, Film, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function BookMeetingClient() {
  const pathname = usePathname();
  const isDE = pathname.startsWith("/ge") || pathname.startsWith("/de");

  return (
    <div className="min-h-screen hero-section-bg relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">
        <motion.div
          className="text-left mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 text-white text-xs font-semibold rounded-full mb-4 tracking-wide uppercase shadow-lg shadow-purple-500/30">
            {isDE ? "🎬 Termin buchen" : "🎬 Book a Meeting"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {isDE ? "Kostenlose Video-Beratung buchen" : "Book Your Free Video Consultation"}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {isDE
              ? "Vereinbaren Sie ein kostenloses 15-minütiges Gespräch und erfahren Sie, wie wir Ihre Videos professionell schneiden können."
              : "Schedule a free 15-minute call to discuss how we can edit your videos and help your channel grow."}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — Info Panel */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "500+", label: isDE ? "Videos geschnitten" : "Videos Edited" },
                { value: "24-48h", label: isDE ? "Lieferzeit" : "Turnaround" },
                { value: "98%", label: isDE ? "Zufriedenheit" : "Satisfaction" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl hover:border-[hsl(var(--brand-blue))]/40 hover:shadow-[0_12px_35px_-10px_hsl(217_91%_60%/0.15)] transition-all duration-300">
                  <div className="text-xl font-bold bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--brand-blue))] bg-clip-text text-transparent">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* What to Expect */}
            <div className="p-6 bg-card/80 backdrop-blur-sm border border-border rounded-xl space-y-4 hover:border-[hsl(var(--brand-blue))]/40 transition-all duration-300">
              <h3 className="font-bold text-foreground text-base">
                {isDE ? "Was Sie erwartet" : "What to Expect"}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: isDE ? "15-Minuten-Gespräch" : "15-Minute Session",
                    desc: isDE ? "Kurze, fokussierte Diskussion über Ihre Video-Bedürfnisse" : "Quick, focused discussion about your video needs",
                  },
                  {
                    icon: Video,
                    title: isDE ? "Virtuelles Meeting" : "Virtual Meeting",
                    desc: isDE ? "Via Google Meet oder Zoom" : "Join via Google Meet or Zoom",
                  },
                  {
                    icon: CheckCircle2,
                    title: isDE ? "Keine Verpflichtung" : "No Commitment",
                    desc: isDE ? "Kostenlose Beratung ohne Verpflichtungen" : "Free consultation with no obligations",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[hsl(var(--brand-blue))]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-0.5">{title}</h4>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* We'll Discuss */}
            <div className="p-6 bg-gradient-to-br from-[hsl(var(--brand-blue))]/5 to-transparent border border-[hsl(var(--brand-blue))]/20 rounded-xl space-y-3">
              <h3 className="font-bold text-foreground text-base">
                {isDE ? "Wir besprechen" : "We'll Discuss"}
              </h3>
              <ul className="space-y-2.5">
                {(isDE
                  ? [
                      "Ihren YouTube-, TikTok- oder Reels-Kanal",
                      "Videostil, Ton und Branding",
                      "Anzahl der Videos pro Monat",
                      "Lieferzeit & unbegrenzte Revisionen",
                      "Preise & nächste Schritte",
                    ]
                  : [
                      "Your YouTube, TikTok, or Reels channel",
                      "Video style, tone, and branding",
                      "Number of videos per month",
                      "Turnaround time & unlimited revisions",
                      "Pricing & next steps",
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--brand-blue))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Edit */}
            <div className="p-5 bg-card/80 backdrop-blur-sm border border-border rounded-xl space-y-3 hover:border-[hsl(var(--brand-blue))]/40 transition-all duration-300">
              <h3 className="font-bold text-foreground text-sm">
                {isDE ? "Unsere Leistungen" : "What We Edit"}
              </h3>
              <div className="space-y-2.5">
                {[
                  { icon: Film, label: isDE ? "Longform YouTube Videos" : "Longform YouTube Videos" },
                  { icon: Scissors, label: isDE ? "TikTok & Instagram Reels" : "TikTok & Instagram Reels" },
                  { icon: Zap, label: isDE ? "Motion Graphics & Color Grading" : "Motion Graphics & Color Grading" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_-4px_rgba(168,85,247,0.5)]">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-5 bg-card/80 backdrop-blur-sm border border-border rounded-xl space-y-3 hover:border-[hsl(var(--brand-blue))]/40 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;{isDE
                  ? "DON Video hat meinen YouTube-Kanal transformiert. Meine Videos sehen cinematisch aus und die Lieferzeit ist unglaublich. Sehr empfehlenswert!"
                  : "DON Video transformed my YouTube channel. My videos look cinematic, and the turnaround time is incredible. Highly recommend!"}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">MC</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Maya Chen</div>
                  <div className="text-xs text-muted-foreground">
                    {isDE ? "YouTube Creator, 500K+ Abonnenten" : "YouTube Creator, 500K+ subscribers"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-[hsl(var(--brand-blue))] flex-shrink-0" />
              <span>{isDE ? "100% sicher & vertraulich." : "100% Secure & Confidential."}</span>
            </div>
          </motion.div>

          {/* Right — Calendly */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="lg:sticky lg:top-28">
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-[0_25px_80px_-20px_hsl(217_91%_60%/0.15)] overflow-hidden hover:border-[hsl(var(--brand-blue))]/40 transition-all duration-300">
                <div className="px-6 py-5 border-b border-border/50 bg-gradient-to-r from-[hsl(var(--brand-blue))]/5 to-transparent">
                  <h2 className="font-bold text-foreground text-lg">
                    {isDE ? "Termin auswählen" : "Select a Time"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {isDE ? "Wählen Sie einen passenden Termin aus dem Kalender" : "Pick a slot that works best for you"}
                  </p>
                </div>
                <div className="p-2">
                  <iframe
                    src="https://calendly.com/mmubasharshahzad40/new-meeting?embed_domain=don-video.com&embed_type=Inline"
                    className="rounded-xl w-full"
                    style={{ height: "660px", border: "none" }}
                    title="Book a meeting"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-[hsl(var(--brand-blue))]/5 to-transparent border border-[hsl(var(--brand-blue))]/20 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {isDE ? "Wir antworten normalerweise innerhalb von 2 Stunden" : "We typically respond within 2 hours"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
