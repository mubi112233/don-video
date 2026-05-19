import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";
import { siteConfig, localizedPath } from "@/lib/site-config";

// TypeScript Interface
interface PricingPlan {
  id: 'starter' | 'professional' | 'enterprise';
  name: string;
  hours: string;
  price: number;
  setupFee: number;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: "Starter",
    hours: "10h / week",
    price: 369,
    setupFee: 149,
    features: [
      "Dedicated SEO Specialist",
      "Native Quality Control", 
      "24h Replacement Guarantee",
      "Slack/Email Support",
      "14 Days Money-Back Warranty"
    ],
    highlighted: false,
    badge: "Perfect for small businesses"
  },
  {
    id: 'professional',
    name: "Professional",
    hours: "20h / week",
    price: 629,
    setupFee: 0,
    features: [
      "Everything in Starter",
      "No Setup Fee",
      "Priority Support",
      "Bi-weekly Progress Reports",
      "Flexible Hour Rollover"
    ],
    highlighted: true,
    badge: undefined
  },
  {
    id: 'enterprise',
    name: "Enterprise",
    hours: "40h / week",
    price: 1169,
    setupFee: 0,
    highlighted: false,
    badge: "Best Value",
    features: [
      "Everything in Professional",
      "No Setup Fee",
      "Dedicated Account Manager",
      "Weekly Strategy Calls",
      "Custom Workflow Integration"
    ]
  }
];

export async function Pricing({ lang }: { lang: string }) {
  const copy = getCopy(lang, 'pricing');
  
  // Calculate average price per month
  const avgHoursPerWeek = 20; // Professional plan baseline
  const avgPricePerPlan = plans[1].price; // Professional plan price

  return (
    <section 
      id="pricing"
      className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background text-foreground z-10 overflow-hidden`}
    >
      {/* Animated background gradients */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/10 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/10 rounded-full blur-[100px] md:blur-[150px]" />
      <div className={`container mx-auto ${SPACING.container} relative z-10`}>
        {/* Free Trial Banner */}
        <div className="mb-8 sm:mb-10 md:mb-12 max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold via-yellow-400 to-amber-500 p-1 max-w-sm mx-auto md:max-w-none shadow-xl">
            {/* Animated shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <div className="relative bg-background rounded-xl p-6 sm:p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    <span className="text-gold font-bold text-sm sm:text-base uppercase tracking-wide">{copy.bannerBadge}</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    {copy.bannerTitle}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground mb-4">
                    {copy.bannerSubtitle}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                      <span className="text-muted-foreground">{copy.bannerPoints.noCommitment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                      <span className="text-muted-foreground">{copy.bannerPoints.cancelAnytime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                      <span className="text-muted-foreground">{copy.bannerPoints.fullAccess}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <a
                    href={localizedPath(lang as "en" | "ge", siteConfig.routes.bookMeeting)}
                    className="group relative text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 h-auto font-bold shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 whitespace-nowrap inline-flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      {copy.bannerTitle}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gold text-foreground text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4 shadow-md">
            {copy.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
            {copy.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {copy.sectionDescription}
          </p>
        </div>

        {/* Price indicator */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gold/10 text-foreground text-xs sm:text-sm font-semibold rounded-full border border-gold/30 shadow-sm">
            {copy.startingFrom.replace('{price}', avgPricePerPlan.toString()).replace('{hourly}', Math.round(avgPricePerPlan / (avgHoursPerWeek * 4)).toString())}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const localizedName = copy.plans[plan.id].name || plan.name;
            const localizedHours = copy.plans[plan.id].hours || plan.hours;
            const localizedFeatures = copy.plans[plan.id].features || plan.features;
            
            return (
            <div 
              key={index}
              className="relative"
            >
              {/* Animated gradient border for highlighted plan */}
              {plan.highlighted && (
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary/90 to-primary rounded-2xl"
                  style={{ backgroundSize: "200% 200%" }}
                />
              )}
              
              <div className={`relative rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-500 group h-full ${
                plan.highlighted 
                  ? 'bg-gradient-to-br from-primary/95 via-primary/98 to-primary text-foreground shadow-[0_25px_70px_-15px_hsl(220_100%_50%/0.5)]' 
                  : 'bg-card border-2 border-border/60 hover:border-primary/80 hover:shadow-[0_25px_70px_-15px_hsl(220_100%_50%/0.4)]'
              }`}>
                {/* Top accent line with animation */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${
                    plan.highlighted ? 'bg-foreground/20' : 'bg-gradient-to-r from-transparent via-primary to-transparent'
                  }`}
                />
                
                {(plan as any).badge && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-foreground to-foreground/95 text-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 border border-primary/20">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {(plan as any).badge}
                  </div>
                )}
                
                {/* Header */}
                <div className="mb-6 relative z-10">
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300 ${
                    plan.highlighted ? 'text-foreground' : 'text-foreground'
                  }`}>
                    {localizedName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${
                      plan.highlighted ? 'text-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {localizedHours}
                    </p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      plan.highlighted ? 'bg-foreground/20 text-foreground' : 'bg-gold/10 text-gold'
                    }`}>
                      {parseInt(plan.hours)} {copy.hoursUnit}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-current/10 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl sm:text-6xl font-bold tracking-tight ${
                      plan.highlighted ? 'text-foreground' : 'text-gold'
                    }`}>
                      €{plan.price}
                    </span>
                    <span className={`text-base ml-1 ${
                      plan.highlighted ? 'text-foreground/60' : 'text-muted-foreground'
                    }`}>
                      {copy.perMonth}
                    </span>
                  </div>
                  {plan.setupFee > 0 ? (
                    <p className={`text-xs mt-2 ${
                      plan.highlighted ? 'text-foreground/60' : 'text-muted-foreground'
                    }`}>
                      {copy.planSetupFee.replace('{fee}', plan.setupFee.toString())}
                    </p>
                  ) : (
                    <p className={`text-xs mt-2 font-semibold flex items-center gap-1 ${
                      plan.highlighted ? 'text-foreground' : 'text-gold'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                      {copy.planNoSetupFee}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 relative z-10">
                  {localizedFeatures.map((feature: string, fIndex: number) => (
                    <li 
                      key={fIndex} 
                      className="flex items-start gap-2.5"
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110 ${
                        plan.highlighted ? 'bg-foreground/20' : 'bg-gold/10 group-hover:bg-gold/20'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.highlighted ? 'text-foreground' : 'text-gold'
                        }`} />
                      </div>
                      <span className={`text-sm leading-relaxed ${
                        plan.highlighted ? 'text-foreground/85' : 'text-muted-foreground'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a 
                  href={localizedPath(lang as "en" | "ge", siteConfig.routes.bookMeeting)}
                  className={`w-full relative z-10 font-bold text-base py-6 sm:py-7 rounded-xl transition-all duration-300 group/btn overflow-hidden min-h-[44px] inline-flex items-center justify-center ${
                    plan.highlighted 
                      ? 'bg-foreground text-gold hover:bg-foreground/95 shadow-lg hover:shadow-xl hover:scale-105' 
                      : 'border-2 border-gold text-gold hover:bg-gold hover:text-foreground hover:scale-105'
                  }`}
                  aria-label={`Get started with ${localizedName} plan - ${localizedHours} at €${plan.price} ${copy.perMonth}`}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" aria-hidden="true" />
                  <span className="relative">{copy.button}</span>
                </a>
              </div>
            </div>
          )})}
        </div>

        <p className="text-center text-muted-foreground mt-10 sm:mt-12 md:mt-16 lg:mt-20 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-4">
          {copy.disclaimer}
        </p>
      </div>
    </section>
  );
}
