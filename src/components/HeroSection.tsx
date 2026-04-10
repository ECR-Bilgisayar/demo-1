import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 section-padding text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block text-gold font-body text-sm tracking-[0.3em] uppercase">
            Hilton Hotels & Resorts Sunar
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6"
        >
          Küresel
          <br />
          <span className="italic text-gold-light">Liderlik</span> Zirvesi
          <br />
          2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-4 font-light"
        >
          Sektör liderleri, vizyonerler ve yenilikçilerin küresel işin geleceğini şekillendirdiği özel bir buluşma.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-primary-foreground/60 font-body text-sm tracking-wider mb-10"
        >
          <span>15–17 Eylül, 2026</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gold" />
          <span>Hilton Istanbul Bosphorus</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gold" />
          <span>İstanbul, Türkiye</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="#register"
            className="inline-block bg-gold hover:bg-gold-light text-navy-dark font-body font-semibold text-sm tracking-wider uppercase px-10 py-4 rounded transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            Şimdi Başvur
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-primary-foreground/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
