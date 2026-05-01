import { useReveal } from "@/hooks/use-reveal";
import { Briefcase, Wrench, Cog, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

const services = [
  { icon: Briefcase, t: "s1_t", d: "s1_d", tags: ["tag_supply", "tag_warranty", "tag_price"] },
  { icon: Cog, t: "s2_t", d: "s2_d", tags: ["tag_design", "tag_studies", "tag_supervision"] },
  { icon: Wrench, t: "s3_t", d: "s3_d", tags: ["tag_24_7", "tag_periodic", "tag_team"] },
] as const;

export const Services = ({ compact = false }: { compact?: boolean }) => {
  const ref = useReveal();
  const { t, dir, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section id="services" ref={ref as any} dir={dir} className="py-28 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">{t("services_kicker")}</span>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl mt-4">
              {t("services_title_1")} <span className="text-gradient">{t("services_title_2")}</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-muted-foreground max-w-md">{t("services_desc")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.t}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2`}
            >
              <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/30 transition-colors duration-700" />
              <div className="relative">
                <div className="text-7xl font-display text-primary/10 leading-none mb-4">0{i + 1}</div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center mb-5 shadow-elegant group-hover:rotate-6 transition-transform duration-500">
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-2xl mb-3">{t(s.t)}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{t(s.d)}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map((tg) => (
                    <span key={tg} className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {t(tg as any)}
                    </span>
                  ))}
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link">
                  {t("s_request")}
                  <Arrow className="h-4 w-4 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {compact && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">{t("view_all")}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
