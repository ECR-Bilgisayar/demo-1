import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionReveal from "./SectionReveal";

const faqs = [
  {
    q: "Kimler katılabilir?",
    a: "Küresel Liderlik Zirvesi, üst düzey yöneticiler, kurucular ve karar vericiler için davetiye ile sınırlı bir etkinliktir. Başvurular seçim komitemiz tarafından incelenir.",
  },
  {
    q: "Kayıt ücreti neyi kapsıyor?",
    a: "Kayıt ücreti tüm konferans oturumlarını, yemekleri, ağ oluşturma etkinliklerini, gala yemeğini ve özel yönetici salonlarına erişimi kapsar. Konaklama ayrı olarak tercihli fiyattan düzenlenir.",
  },
  {
    q: "Kıyafet kuralı var mı?",
    a: "Günlük oturumlar için iş kıyafeti, gala yemeği için siyah kravat isteğe bağlı. Ağ oluşturma kahvaltıları ve wellness aktiviteleri için akıllı günlük kıyafet kabul edilir.",
  },
  {
    q: "Misafir veya iş arkadaşımı getirebilir miyim?",
    a: "Ek katılımcılar kendi başvurularını yapmalıdır. Ancak partnerler için İstanbul deneyimleri içeren bir refakatçi programı sunuyoruz.",
  },
  {
    q: "İptal politikası nedir?",
    a: "Etkinlikten 30 gün öncesine kadar tam geri ödeme yapılır. Bundan sonra %50 geri ödeme uygulanır. Değişiklikler her zaman kabul edilir.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-narrow max-w-3xl">
        <SectionReveal>
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase block mb-4 text-center">
            Sorular
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-12 leading-tight text-center">
            Sıkça Sorulan <span className="italic">Sorular</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="font-body text-foreground font-medium text-left py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground font-light leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
};

export default FAQSection;
