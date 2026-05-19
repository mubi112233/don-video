import { Hero } from "@/components/Hero";

export function HeroServer({ lang }: { lang: string }) {
  return <Hero lang={lang} />;
}
