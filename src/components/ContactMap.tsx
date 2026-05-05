import { useLang } from "@/i18n/LanguageContext";
import { useReveal } from "@/hooks/use-reveal";
import { MapPin, ExternalLink } from "lucide-react";
import instagramIcon from "@/assets/instagram-logo.png";
import whatsappIcon from "@/assets/whatsapp-logo.png";
import { trackWhatsAppClick, waHref } from "@/lib/whatsapp";

const GOOGLE_MAPS_URL = "https://maps.google.com/?q=21.543414,39.204645";
const APPLE_MAPS_URL = "https://maps.apple.com/?q=21.543414,39.204645";
const ADDRESS = "المملكة العربية السعودية - جدة - حي مشرفة - شارع التضامن";

export const ContactMap = () => {
  const { t, dir } = useLang();
  const ref = useReveal();
  return (
    <section ref={ref as any} dir={dir} className="py-20 bg-background">
      <div className="container">
        <div className="reveal mb-8">
          <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
            {t("contact_address_l")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl mt-2">
            {t("contact_map_title")}
          </h2>
        </div>

        <div className="reveal reveal-delay-1 relative rounded-3xl overflow-hidden border border-border shadow-card bg-gradient-to-br from-secondary to-background p-8 md:p-12">
          <div className="flex items-start gap-4 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center flex-shrink-0 shadow-elegant">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider text-primary uppercase mb-1">
                {t("contact_address_l")}
              </div>
              <p className="text-lg font-semibold leading-relaxed">{ADDRESS}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-white font-semibold shadow-elegant hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              <MapPin className="h-4 w-4" />
              افتح في خرائط جوجل
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
            <a
              href={APPLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-foreground text-background font-semibold shadow-card hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              <MapPin className="h-4 w-4" />
              افتح في Apple Maps
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-border">
            <span className="text-sm font-semibold text-muted-foreground">
              {t("contact_kicker") || "تواصل معنا"}:
            </span>
            <a
              href={waHref("primary")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={() => trackWhatsAppClick("primary", "contact_map")}
              className="hover:scale-110 transition-transform"
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="h-[45px] w-[45px] object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </a>
            <a
              href="https://www.instagram.com/arkan_alitqan.ksa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                className="h-[45px] w-[45px] object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
