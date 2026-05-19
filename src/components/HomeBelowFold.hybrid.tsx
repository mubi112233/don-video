import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { ToolsIntegration } from "@/components/ToolsIntegration";
import { CaseStudies } from "@/components/CaseStudies.server";
import { Blog } from "@/components/Blog";
import { FAQInteractive } from "@/components/FAQInteractive.client";
import { FinalCTA } from "@/components/FinalCTA.server";
import { SPACING } from "@/lib/constants";
import { fetchFAQ } from "@/lib/api";

export async function HomeBelowFold({ lang }: { lang: string }) {
  const faqs = await fetchFAQ(lang);
  const faqData = faqs?.faqs || [];

  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks />
        <Services />
        <Pricing />
        <ToolsIntegration />
        <Testimonials />
        <Blog />
        <CaseStudies lang={lang} />
        <FAQInteractive faqs={faqData} lang={lang} />
      </div>
      <FinalCTA lang={lang} />
    </>
  );
}
