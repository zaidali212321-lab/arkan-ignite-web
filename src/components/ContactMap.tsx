import { useLang } from "@/i18n/LanguageContext";
import { useReveal } from "@/hooks/use-reveal";
import { MapPin, ExternalLink } from "lucide-react";

const MAPS_URL = "https://www.google.com/maps?q=21.543414,39.204645";
const EMBED_URL =
  "https://www.google.com/maps?q=21.543414,39.204645&z=17&output=embed";

export const ContactMap = () => {
  const { t, dir } = useLang();
  const ref = useReveal();
  return (
    <section ref={ref as any} dir={dir} className="py-20 bg-background">
      <div className="container">
        <div className="reveal flex items-end justify-between gap-6 mb-8 flex-wrap">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              {t("contact_address_l")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl mt-2">
              {t("contact_map_title")}
            </h2>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-elegant hover:opacity-90 transition-opacity"
          >
            <MapPin className="h-4 w-4" />
            {t("contact_open_maps")}
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>
        </div>

        <div className="reveal reveal-delay-1 relative rounded-3xl overflow-hidden border border-border shadow-card">
          <iframe
            title="Arkan Alitqan Arabiya — Location"
            src={EMBED_URL}
            className="w-full h-[420px] md:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal reveal-delay-2 mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline break-all"
        >
          <MapPin className="h-4 w-4 flex-shrink-0" />
          {MAPS_URL}
        </a>
      </div>
    </section>
  );
};
