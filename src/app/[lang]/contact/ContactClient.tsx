"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import {
  Mail,
  Send,
  CheckCircle2,
  Film,
  MessageSquare,
  Loader2,
  Star,
  Zap,
  Shield,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";

type FormValues = {
  email: string;
  phone: string;
  channelName: string;
  videoType: string;
  videoDuration: string;
  numberOfVideos: string;
  deadline: string;
  projectDescription: string;
  additionalNotes?: string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    badge: "Get In Touch",
    title: "Your Videos, Professionally Edited",
    subtitle: "Share your vision and let us bring it to life. Custom video editing with unlimited revisions and 24-48h turnaround.",
    email: "Email Address",
    phone: "Phone Number",
    channelNameLabel: "Channel/Brand Name",
    channelNamePlaceholder: "e.g., My Gaming Channel",
    videoTypeLabel: "What Type of Videos?",
    videoTypePlaceholder: "Select video type",
    videoDurationLabel: "Average Video Duration",
    videoDurationPlaceholder: "e.g., 10-15 minutes",
    numberOfVideosLabel: "How Many Videos per Month?",
    numberOfVideosPlaceholder: "e.g., 4",
    deadlineLabel: "Project Deadline",
    deadlinePlaceholder: "e.g., 2 weeks",
    projectDescriptionLabel: "Describe Your Project",
    projectDescriptionPlaceholder: "Tell us about your videos, style, tone, and any special requirements...",
    additionalNotesLabel: "Additional Notes",
    additionalNotesPlaceholder: "Color grading? Motion graphics? Music preferences? Let us know!",
    submit: "Send Inquiry",
    submitSending: "Sending...",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    phoneRequired: "Phone is required",
    phoneInvalid: "Enter a valid phone number",
    channelNameRequired: "Channel/brand name is required",
    videoTypeRequired: "Please select a video type",
    videoDurationRequired: "Please specify video duration",
    numberOfVideosRequired: "Please specify number of videos",
    deadlineRequired: "Please specify your deadline",
    projectDescriptionRequired: "Please describe your project",
    sideTitle: "Why Choose DON Video?",
    stat1Value: "500+",
    stat1Label: "Videos Edited",
    stat2Value: "24-48h",
    stat2Label: "Fast Turnaround",
    stat3Value: "4.9/5",
    stat3Label: "Client Rating",
    feature1: "Cinematic color grading & effects",
    feature2: "Unlimited revisions included",
    feature3: "Fast, reliable turnaround",
    feature4: "Dedicated video editor for consistency",
    responseTime: "We typically respond within 2 hours",
  },
  ge: {
    badge: "Kontakt aufnehmen",
    title: "Ihre Videos, professionell geschnitten",
    subtitle: "Teilen Sie Ihre Vision und lassen Sie uns sie zum Leben erwecken. Professioneller Videoschnitt mit unbegrenzten Revisionen und 24-48h Lieferzeit.",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    channelNameLabel: "Kanal-/Markenname",
    channelNamePlaceholder: "z.B. Mein Gaming-Kanal",
    videoTypeLabel: "Welche Art von Videos?",
    videoTypePlaceholder: "Videotyp auswählen",
    videoDurationLabel: "Durchschnittliche Videodauer",
    videoDurationPlaceholder: "z.B. 10-15 Minuten",
    numberOfVideosLabel: "Wie viele Videos pro Monat?",
    numberOfVideosPlaceholder: "z.B. 4",
    deadlineLabel: "Projektfrist",
    deadlinePlaceholder: "z.B. 2 Wochen",
    projectDescriptionLabel: "Beschreiben Sie Ihr Projekt",
    projectDescriptionPlaceholder: "Erzählen Sie uns von Ihren Videos, dem Stil, Ton und besonderen Anforderungen...",
    additionalNotesLabel: "Zusätzliche Notizen",
    additionalNotesPlaceholder: "Farbkorrektur? Motion Graphics? Musikeinstellungen? Lassen Sie es uns wissen!",
    submit: "Anfrage senden",
    submitSending: "Wird gesendet...",
    emailRequired: "E-Mail ist erforderlich",
    emailInvalid: "Gültige E-Mail eingeben",
    phoneRequired: "Telefon ist erforderlich",
    phoneInvalid: "Gültige Telefonnummer eingeben",
    channelNameRequired: "Kanal-/Markenname erforderlich",
    videoTypeRequired: "Bitte wählen Sie einen Videotyp",
    videoDurationRequired: "Bitte geben Sie die Videodauer an",
    numberOfVideosRequired: "Bitte geben Sie die Anzahl der Videos an",
    deadlineRequired: "Bitte geben Sie Ihre Frist an",
    projectDescriptionRequired: "Bitte beschreiben Sie Ihr Projekt",
    sideTitle: "Warum DON Video wählen?",
    stat1Value: "500+",
    stat1Label: "Videos geschnitten",
    stat2Value: "24-48h",
    stat2Label: "Schnelle Lieferung",
    stat3Value: "4.9/5",
    stat3Label: "Kundenbewertung",
    feature1: "Cinematische Farbkorrektur & Effekte",
    feature2: "Unbegrenzte Revisionen enthalten",
    feature3: "Schnelle, zuverlässige Lieferung",
    feature4: "Dedizierter Video-Editor für Konsistenz",
    responseTime: "Wir antworten normalerweise innerhalb von 2 Stunden",
  },
};

const videoTypeOptions = [
  { value: "youtube", label: "YouTube Videos" },
  { value: "tiktok", label: "TikTok Videos" },
  { value: "reels", label: "Instagram Reels" },
  { value: "shorts", label: "YouTube Shorts" },
  { value: "longform", label: "Long-form Content" },
  { value: "commercials", label: "Commercials & Ads" },
  { value: "vlogs", label: "Vlogs" },
  { value: "tutorials", label: "Tutorials" },
  { value: "mixed", label: "Mixed Content" },
  { value: "other", label: "Other" },
];

function FormSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border/50">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs font-medium text-destructive mt-1">{message}</p> : null;
}

export default function ContactClient({ lang }: { lang: string }) {
  const c = translations[lang] ?? translations.en;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "", phone: "", channelName: "", videoType: "",
      videoDuration: "", numberOfVideos: "", deadline: "",
      projectDescription: "", additionalNotes: "",
    },
    mode: "onBlur",
  });

  const videoTypeValue = useWatch({ control, name: "videoType" });

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const phonePattern = useMemo(() => /^[0-9+\-()\s]{7,20}$/i, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const videoTypeLabel = videoTypeOptions.find((o) => o.value === data.videoType)?.label ?? data.videoType;

    const row = (label: string, value?: string) =>
      value?.trim()
        ? `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap;border-bottom:1px solid #eee">${label}</td><td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee">${value.trim()}</td></tr>`
        : "";

    const message = `
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
        ${row("Email", data.email)}
        ${row("Phone", data.phone)}
        ${row("Channel/Brand Name", data.channelName)}
        ${row("Video Type", videoTypeLabel)}
        ${row("Video Duration", data.videoDuration)}
        ${row("Number of Videos/Month", data.numberOfVideos)}
        ${row("Deadline", data.deadline)}
        ${row("Project Description", data.projectDescription)}
        ${row("Additional Notes", data.additionalNotes)}
      </table>
    `;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "8aff1902-6795-4608-ad79-be6702aa7f3a",
          to: "contact@donvideo.com",
          subject: `New Video Editing Inquiry from ${data.email}`,
          from_name: data.email,
          email: data.email,
          message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast({ title: "Success!", description: "Your inquiry has been sent. We'll be in touch soon!" });
        reset();
      } else {
        toast({ title: "Error", description: json.message || "Please try again." });
      }
    } catch {
      toast({ title: "Network error", description: "Please try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            {c.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {c.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {c.subtitle}
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
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: c.stat1Value, label: c.stat1Label, icon: Film },
                { value: c.stat2Value, label: c.stat2Label, icon: Zap },
                { value: c.stat3Value, label: c.stat3Label, icon: Star },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center p-4 bg-card border border-border/50 rounded-xl hover:border-primary/40 transition-colors">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-card border border-border/50 rounded-xl space-y-4">
              <h3 className="font-bold text-foreground text-base">{c.sideTitle}</h3>
              <ul className="space-y-3">
                {[c.feature1, c.feature2, c.feature3, c.feature4].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{c.responseTime}</p>
            </div>

            <div className="p-5 bg-card border border-border/50 rounded-xl space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />)}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;DON Video transformed my YouTube channel. My videos look cinematic, and the turnaround time is incredible. Highly recommend!&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">MC</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Maya Chen</div>
                  <div className="text-xs text-muted-foreground">YouTube Creator, 500K+ subscribers</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>Your information is 100% secure and never shared.</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border/50 rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                <h2 className="font-bold text-foreground text-lg">Tell us about your project</h2>
                <p className="text-sm text-muted-foreground mt-0.5">All fields marked with * are required</p>
              </div>

              <form className="px-6 sm:px-8 py-7 space-y-8" onSubmit={handleSubmit(onSubmit)}>

                {/* Contact Info */}
                <FormSection icon={Mail} title="Contact Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">{c.email} <span className="text-primary">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="border-border/60 focus:border-primary/60 transition-colors"
                        {...register("email", {
                          required: c.emailRequired,
                          pattern: { value: emailPattern, message: c.emailInvalid },
                        })}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">{c.phone} <span className="text-primary">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 555 123 4567"
                        className="border-border/60 focus:border-primary/60 transition-colors"
                        {...register("phone", {
                          required: c.phoneRequired,
                          pattern: { value: phonePattern, message: c.phoneInvalid },
                        })}
                      />
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Channel Info */}
                <FormSection icon={Play} title="Your Channel / Brand">
                  <div className="space-y-1.5">
                    <Label htmlFor="channelName" className="text-sm">{c.channelNameLabel} <span className="text-primary">*</span></Label>
                    <Input
                      id="channelName"
                      type="text"
                      placeholder={c.channelNamePlaceholder}
                      className="border-border/60 focus:border-primary/60 transition-colors"
                      {...register("channelName", { required: c.channelNameRequired })}
                    />
                    <FieldError message={errors.channelName?.message} />
                  </div>
                </FormSection>

                {/* Video Details */}
                <FormSection icon={Film} title="Video Details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.videoTypeLabel} <span className="text-primary">*</span></Label>
                      <Select onValueChange={(v) => setValue("videoType", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-primary/60">
                          <SelectValue placeholder={c.videoTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {videoTypeOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("videoType", { required: c.videoTypeRequired })} />
                      <FieldError message={errors.videoType?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="videoDuration" className="text-sm">{c.videoDurationLabel} <span className="text-primary">*</span></Label>
                      <Input
                        id="videoDuration"
                        type="text"
                        placeholder={c.videoDurationPlaceholder}
                        className="border-border/60 focus:border-primary/60 transition-colors"
                        {...register("videoDuration", { required: c.videoDurationRequired })}
                      />
                      <FieldError message={errors.videoDuration?.message} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="numberOfVideos" className="text-sm">{c.numberOfVideosLabel} <span className="text-primary">*</span></Label>
                      <Input
                        id="numberOfVideos"
                        type="text"
                        placeholder={c.numberOfVideosPlaceholder}
                        className="border-border/60 focus:border-primary/60 transition-colors"
                        {...register("numberOfVideos", { required: c.numberOfVideosRequired })}
                      />
                      <FieldError message={errors.numberOfVideos?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="deadline" className="text-sm">{c.deadlineLabel} <span className="text-primary">*</span></Label>
                      <Input
                        id="deadline"
                        type="text"
                        placeholder={c.deadlinePlaceholder}
                        className="border-border/60 focus:border-primary/60 transition-colors"
                        {...register("deadline", { required: c.deadlineRequired })}
                      />
                      <FieldError message={errors.deadline?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Project Description */}
                <FormSection icon={MessageSquare} title="Project Details">
                  <div className="space-y-1.5">
                    <Label htmlFor="projectDescription" className="text-sm">{c.projectDescriptionLabel} <span className="text-primary">*</span></Label>
                    <Textarea
                      id="projectDescription"
                      rows={4}
                      placeholder={c.projectDescriptionPlaceholder}
                      className="border-border/60 focus:border-primary/60 resize-none"
                      {...register("projectDescription", { required: c.projectDescriptionRequired })}
                    />
                    <FieldError message={errors.projectDescription?.message} />
                  </div>
                </FormSection>

                {/* Additional Notes */}
                <FormSection icon={Zap} title="Additional Notes">
                  <div className="space-y-1.5">
                    <Label htmlFor="additionalNotes" className="text-sm">{c.additionalNotesLabel}</Label>
                    <Textarea
                      id="additionalNotes"
                      rows={3}
                      placeholder={c.additionalNotesPlaceholder}
                      className="border-border/60 focus:border-primary/60 resize-none"
                      {...register("additionalNotes")}
                    />
                  </div>
                </FormSection>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {c.submitSending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {c.submit}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
