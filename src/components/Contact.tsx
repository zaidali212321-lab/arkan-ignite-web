import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { FormEvent } from "react";
import { useLang } from "@/i18n/LanguageContext";
import instagramIcon from "@/assets/instagram-logo.png";
import whatsappIcon from "@/assets/whatsapp-logo.png";
import { trackWhatsAppClick, waHref } from "@/lib/whatsapp";

export const Contact = () => {
  const ref = useReveal();
  const { t, dir } = useLang();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success(t("form_success"));
    (e.target as HTMLFormElement).reset();
  };

  const contacts: { icon: any; label: string; value: string; href?: string }[] = [
    { icon: MapPin, label: t("contact_address_l"), value: "المملكة العربية السعودية - جدة - حي مشرفة - شارع التضامن", href: "https://maps.google.com/?q=21.543414,39.204645" },
    { icon: Mail, label: t("contact_email_l"), value: "info@arkansafety.com", href: "mailto:info@arkansafety.com" },
    { icon: Clock, label: t("contact_hours_l"), value: t("contact_hours_v") },
  ];

  return (
    <section id="contact" ref={ref as any} dir={dir} className="py-28 bg-dark text-dark-foreground relative overflow-hidden">
      <div className="absolute right-0 top-0 h-96 w-96 bg-gradient-radial-red blur-3xl" />
      <div className="container relative grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary-glow uppercase">{t("contact_kicker")}</span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl leading-tight">
            {t("contact_title_1")} <br />
            <span className="text-gradient">{t("contact_title_2")}</span>
          </h2>
          <p className="reveal reveal-delay-2 text-dark-foreground/70 max-w-md leading-relaxed">{t("contact_desc")}</p>

          <div className="reveal reveal-delay-3 space-y-4">
            {contacts.map((c, idx) => {
              const inner = (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-muted/50 border border-dark-border hover:border-primary/50 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center flex-shrink-0">
                    <c.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-dark-foreground/60">{c.label}</div>
                    <div className="font-semibold">{c.value}</div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={idx} href={c.href} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
              ) : (
                <div key={idx}>{inner}</div>
              );
            })}

            <div className="flex items-center gap-3 pt-2">
              <a href={waHref("primary")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +966580535332" onClick={() => trackWhatsAppClick("primary", "contact_socials")} className="hover:scale-110 transition-transform">
                <img src={whatsappIcon} alt="WhatsApp" className="h-[45px] w-[45px] object-contain" style={{ mixBlendMode: "multiply" }} />
              </a>
              <a href={waHref("secondary")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +966568603766" onClick={() => trackWhatsAppClick("secondary", "contact_socials")} className="hover:scale-110 transition-transform">
                <img src={whatsappIcon} alt="WhatsApp" className="h-[45px] w-[45px] object-contain" style={{ mixBlendMode: "multiply" }} />
              </a>
              <a href="https://www.instagram.com/arkan_alitqan.ksa" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition-transform">
                <img src={instagramIcon} alt="Instagram" className="h-[45px] w-[45px] object-contain" style={{ mixBlendMode: "multiply" }} />
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="reveal reveal-delay-2 relative p-8 md:p-10 rounded-3xl bg-dark-muted/60 backdrop-blur border border-dark-border space-y-5">
          <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-gradient-primary text-xs font-bold text-white shadow-elegant">
            {t("form_title")}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label={t("form_name")} name="name" required />
            <Field label={t("form_email")} name="email" type="email" required />
          </div>
          <Field label={t("form_phone")} name="phone" />
          <div>
            <label className="text-xs font-semibold mb-2 block text-dark-foreground/70">{t("form_subject")}</label>
            <select name="subject" className="w-full h-12 px-4 rounded-xl bg-dark border border-dark-border focus:border-primary outline-none transition-colors text-dark-foreground">
              <option>{t("form_subject_quote")}</option>
              <option>{t("form_subject_inquiry")}</option>
              <option>{t("form_subject_maintenance")}</option>
              <option>{t("form_subject_other")}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold mb-2 block text-dark-foreground/70">{t("form_message")}</label>
            <textarea name="message" rows={4} required className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border focus:border-primary outline-none transition-colors text-dark-foreground resize-none" />
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full">
            {t("form_send")}
          </Button>
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) => (
  <div>
    <label className="text-xs font-semibold mb-2 block text-dark-foreground/70">{label}</label>
    <input
      name={name}
      type={type}
      required={required}
      className="w-full h-12 px-4 rounded-xl bg-dark border border-dark-border focus:border-primary outline-none transition-colors text-dark-foreground"
    />
  </div>
);
