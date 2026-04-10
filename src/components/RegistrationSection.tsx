import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { toast } from "sonner";

const RegistrationSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Başvuru başarıyla gönderildi. Kısa süre içinde sizinle iletişime geçeceğiz.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border focus:border-navy outline-none py-3 font-body text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300 text-sm";

  return (
    <section id="register" className="section-padding bg-background">
      <div className="container-narrow max-w-2xl">
        <SectionReveal>
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase block mb-4 text-center">
            Bize Katılın
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4 leading-tight text-center">
            Katılmak İçin <span className="italic">Başvurun</span>
          </h2>
          <p className="text-muted-foreground font-body font-light text-center mb-12 max-w-lg mx-auto">
            Kontenjan sınırlıdır. Başvurunuzu gönderin, ekibimiz 48 saat içinde inceleyecek.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <motion.div
            className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-body tracking-wider uppercase text-muted-foreground mb-2 block">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ahmet Yılmaz"
                    className={inputClasses}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="text-xs font-body tracking-wider uppercase text-muted-foreground mb-2 block">
                    E-posta Adresi *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ahmet@sirket.com"
                    className={inputClasses}
                    maxLength={255}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-body tracking-wider uppercase text-muted-foreground mb-2 block">
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    placeholder="+90 (555) 000-0000"
                    className={inputClasses}
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="text-xs font-body tracking-wider uppercase text-muted-foreground mb-2 block">
                    Şirket / Ünvan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CEO, ABC Şirketi"
                    className={inputClasses}
                    maxLength={150}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-body tracking-wider uppercase text-muted-foreground mb-2 block">
                  Neden katılmak istiyorsunuz? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hedeflerinizden ve zirveden ne kazanmayı umduğunuzdan bahsedin..."
                  className={`${inputClasses} resize-none border rounded-lg border-border p-4`}
                  maxLength={1000}
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-border accent-navy"
                />
                <span className="text-muted-foreground font-body text-sm font-light leading-relaxed">
                  Küresel Liderlik Zirvesi 2026 şartlarını ve koşullarını kabul ediyorum ve etkinlik hakkında iletişim almayı onaylıyorum.
                </span>
              </label>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-block bg-navy hover:bg-navy-light text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase px-14 py-4 rounded transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Başvuru Gönder"}
                </button>
              </div>
            </form>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default RegistrationSection;
