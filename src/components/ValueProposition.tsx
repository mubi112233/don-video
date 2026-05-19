import { Shield, Clock, Users, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SPACING } from "@/lib/constants";

const values = [
  { icon: Shield, key: "costReduction" },
  { icon: Users, key: "qualityControl" },
  { icon: Clock, key: "replacement" },
  { icon: Lock, key: "confidentiality" },
];

export const ValueProposition = () => {
  const { t } = useTranslation();
  
  return (
    <motion.section 
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-background z-10"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(199,89%,52%)] to-transparent" />
      
      <div className={`container mx-auto ${SPACING.container}`}>
        <motion.div 
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: t("valueProposition.heading") }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-[hsl(211,100%,45%)] via-[hsl(211,100%,50%)] to-[hsl(199,89%,48%)] text-white border-2 border-[hsl(211,100%,60%)]/50 hover:border-[hsl(211,100%,70%)] hover:shadow-[0_25px_70px_-15px_rgba(0,123,255,0.5)] transition-all duration-500 hover:-translate-y-4"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(211,100%,60%)]/30 via-[hsl(199,89%,52%)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-[hsl(199,89%,52%)] via-[hsl(211,100%,55%)] to-[hsl(211,100%,60%)] text-white ring-1 ring-[hsl(199,89%,52%)]/30 group-hover:scale-110 transition-all duration-500 shadow-[0_18px_40px_-12px_rgba(0,123,255,0.6)]">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white transition-colors duration-300">
                  {t(`valueProposition.items.${value.key}.title`)}
                </h3>
                <p className="text-blue-50 leading-relaxed">
                  {t(`valueProposition.items.${value.key}.description`)}
                </p>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[hsl(211,100%,70%)]/0 group-hover:border-[hsl(199,89%,60%)]/50 rounded-tr-2xl transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
