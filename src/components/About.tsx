import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import about from "@/assets/about.jpg";

export const About = ({ compact = false }: { compact?: boolean }) => {
  const ref = useReveal();
  const { t, dir } = useLang();
  const points = ["about_point1", "about_point2", "about_point3", "about_point4"] as const;

  return (
    <section id="about" ref={ref as any} dir={dir} className="relative py-28 bg-background overflow-hidden">
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal relative">
          <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img src={about} alt={t("about_kicker")} loading="lazy" width={1280} height={960} className="w-full h-[520px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between text-white">
              <div>
                <div className="text-5xl font-display">+15</div>
                <div className="text-sm opacity-80">{t("about_stat_label")}</div>
              </div>
              <div className="h-px flex-1 mx-6 bg-white/20" />
              <div className="text-end">
                <div className="text-sm opacity-80">{t("about_certified")}</div>
                <div className="font-display">ISO 9001</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">{t("about_kicker")}</span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl leading-tight">
            {t("about_title_1")}
            <br />
            <span className="text-gradient">{t("about_title_2")}</span>
          </h2>
          <p className="reveal reveal-delay-2 text-muted-foreground leading-relaxed text-lg">{t("about_desc")}</p>
          <ul className="reveal reveal-delay-3 grid sm:grid-cols-2 gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                {t(p)}
              </li>
            ))}
          </ul>
          <div className="reveal reveal-delay-4 pt-2 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">{t("about_cta")}</Link>
            </Button>
            {compact && (
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">{t("learn_more")}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
