import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const highlights = [
  {
    title: "Ana Konuşmalar",
    description: "Dünyaca ünlü konuşmacılar liderlik, yenilik ve küresel trendler hakkında içgörü paylaşıyor.",
    icon: "🎤",
  },
  {
    title: "Yönetici Yuvarlak Masaları",
    description: "Sektörler arası C-suite liderleriyle samimi, davetiye ile sınırlı tartışmalar.",
    icon: "🤝",
  },
  {
    title: "Gala Yemeği",
    description: "Unutulmaz bir akşam yemeği, canlı eğlence ve premium ağ oluşturma deneyimi.",
    icon: "✨",
  },
  {
    title: "Yenilik Gösterisi",
    description: "İş dünyasının önümüzdeki on yılını şekillendirecek çığır açan teknolojileri ve fikirleri keşfedin.",
    icon: "💡",
  },
];

const HighlightsSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <SectionReveal>
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase block mb-4">
            Sizi Neler Bekliyor
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-16 leading-tight">
            <span className="italic">Deneyim</span>
          </h2>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 gap-8">
          {highlights.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-card p-8 md:p-10 rounded-lg border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-500 group"
              >
                <span className="text-3xl mb-6 block">{item.icon}</span>
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 group-hover:text-navy transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-body font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
