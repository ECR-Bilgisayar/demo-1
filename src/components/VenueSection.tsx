import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "./SectionReveal";
import venueLobby from "@/assets/venue-lobby.jpg";
import venueSuite from "@/assets/venue-suite.jpg";

const VenueSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} className="section-padding bg-background overflow-hidden">
      <div className="container-narrow">
        <SectionReveal>
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase block mb-4">
            Mekan
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6 leading-tight">
            Hilton Istanbul <span className="italic">Bosphorus</span>
          </h2>
          <p className="text-muted-foreground font-body font-light text-lg max-w-2xl mb-16">
            Osmanlı mirasının zarafeti ile çağdaş sofistikasyonun buluştuğu İstanbul'un en prestijli adreslerinden birinde eşsiz lüksü deneyimleyin.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <SectionReveal delay={0.1}>
            <motion.div style={{ y: y1 }} className="rounded-lg overflow-hidden">
              <img
                src={venueLobby}
                alt="Hilton Istanbul Bosphorus büyük lobisi"
                className="w-full h-80 md:h-[500px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <motion.div style={{ y: y2 }} className="rounded-lg overflow-hidden md:mt-20">
              <img
                src={venueSuite}
                alt="Boğaz manzaralı lüks süit"
                className="w-full h-80 md:h-[500px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </SectionReveal>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mt-16">
          {[
            { label: "5 Yıldızlı Lüks", detail: "Dünya standartlarında konaklama ve hizmet" },
            { label: "Boğaz Manzarası", detail: "Nefes kesici sahil konumu" },
            { label: "Miras & Modern", detail: "Osmanlı zarafeti çağdaş tasarımla buluşuyor" },
          ].map((item, i) => (
            <SectionReveal key={item.label} delay={0.1 * i}>
              <div className="text-center">
                <h4 className="font-heading text-xl text-foreground mb-2">{item.label}</h4>
                <p className="text-muted-foreground font-body text-sm font-light">{item.detail}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
