import SectionReveal from "./SectionReveal";

const AboutSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <SectionReveal>
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase block mb-4">
            Etkinlik Hakkında
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-12 leading-tight">
            Vizyonun Mükemmellikle <span className="italic">Buluşması</span>
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-16">
          <SectionReveal delay={0.1}>
            <p className="text-muted-foreground font-body leading-relaxed text-lg font-light">
              Küresel Liderlik Zirvesi, dünya çapından 300'den fazla özenle seçilmiş yönetici,
              girişimci ve düşünce liderini üç gün boyunca dönüştürücü diyalog, dünya standartlarında
              ağ oluşturma ve stratejik içgörü için bir araya getiriyor.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed text-lg font-light mt-6">
              İkonik Hilton Istanbul Bosphorus'ta gerçekleşen bu davetiye ile sınırlı etkinlik,
              sektörleri yeniden tanımlayan ve anlamlı değişimi yönlendiren meslektaşlarla
              bağlantı kurmak için nadir bir fırsat sunuyor.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="space-y-8">
              {[
                { number: "300+", label: "Küresel Lider" },
                { number: "40+", label: "Temsil Edilen Ülke" },
                { number: "25+", label: "Ana Konuşma Oturumu" },
                { number: "3", label: "Etkili Gün" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-6 border-b border-border pb-4">
                  <span className="font-heading text-3xl md:text-4xl text-navy">{stat.number}</span>
                  <span className="text-muted-foreground font-body text-sm tracking-wider uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
