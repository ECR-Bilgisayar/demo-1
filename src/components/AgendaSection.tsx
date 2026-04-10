import SectionReveal from "./SectionReveal";

const agenda = [
  {
    day: "1. Gün — 15 Eylül",
    items: [
      { time: "09:00", title: "Kayıt ve Hoş Geldiniz Kahvesi" },
      { time: "10:30", title: "Açılış Ana Konuşması: Liderliğin Geleceği" },
      { time: "13:00", title: "Ağ Oluşturma Öğle Yemeği" },
      { time: "14:30", title: "Yönetici Yuvarlak Masaları" },
      { time: "19:00", title: "Hoş Geldiniz Kokteyli ve Akşam Yemeği" },
    ],
  },
  {
    day: "2. Gün — 16 Eylül",
    items: [
      { time: "09:00", title: "Kahvaltı ve Ağ Oluşturma" },
      { time: "10:00", title: "Panel: Değişen Dünyada Yenilik" },
      { time: "12:00", title: "Paralel Oturumlar" },
      { time: "14:00", title: "Atölye: Stratejik Ortaklıklar" },
      { time: "20:00", title: "Boğaz Terasında Gala Yemeği" },
    ],
  },
  {
    day: "3. Gün — 17 Eylül",
    items: [
      { time: "09:00", title: "Sabah Wellness ve Yoga" },
      { time: "10:30", title: "Kapanış Ana Konuşması: Amaçla Liderlik" },
      { time: "12:30", title: "Vedalaşma Brunch'ı" },
    ],
  },
];

const AgendaSection = () => {
  return (
    <section className="section-padding bg-navy text-primary-foreground">
      <div className="container-narrow">
        <SectionReveal>
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase block mb-4">
            Program
          </span>
          <h2 className="font-heading text-3xl md:text-5xl mb-16 leading-tight">
            Etkinlik <span className="italic">Programı</span>
          </h2>
        </SectionReveal>

        <div className="space-y-16">
          {agenda.map((day, di) => (
            <SectionReveal key={day.day} delay={di * 0.1}>
              <h3 className="font-heading text-xl md:text-2xl text-gold-light mb-8">{day.day}</h3>
              <div className="space-y-0">
                {day.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-6 md:gap-12 py-4 border-b border-primary-foreground/10 last:border-0"
                  >
                    <span className="font-body text-sm text-primary-foreground/40 w-16 shrink-0 pt-0.5">
                      {item.time}
                    </span>
                    <span className="font-body font-light text-primary-foreground/80">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
