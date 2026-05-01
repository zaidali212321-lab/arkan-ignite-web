import { useReveal } from "@/hooks/use-reveal";
import { ShieldCheck, Sparkles, Users, Award } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const items = [
  { icon: Award, t: "why1_t", d: "why1_d" },
  { icon: ShieldCheck, t: "why2_t", d: "why2_d" },
  { icon: Sparkles, t: "why3_t", d: "why3_d" },
  { icon: Users, t: "why4_t", d: "why4_d" },
] as const;

export const WhyUs = () => {
  const ref = useReveal();
  const { t, dir } = useLang();
  return (
    <section ref={ref as any} dir={dir} className="relative py-28 bg-dark text-dark-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-96 w-[800px] bg-gradient-radial-red blur-3xl opacity-50" />

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary-glow uppercase">{t("whyus_kicker")}</span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl mt-4">
            {t("whyus_title_1")} <span className="text-gradient">{t("whyus_title_2")}</span>
          </h2>
          <p className="reveal reveal-delay-2 text-dark-foreground/70 mt-4">{t("whyus_desc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div
              key={it.t}
              className={`reveal reveal-delay-${i + 1} group relative p-8 rounded-2xl bg-dark-muted/40 backdrop-blur border border-dark-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2`}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
              <div className="relative">
                <div className="h-14 w-14 rounded-xl bg-primary/15 grid place-items-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <it.icon className="h-7 w-7 text-primary-glow group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl mb-3">{t(it.t)}</h3>
                <p className="text-dark-foreground/70 text-sm leading-relaxed">{t(it.d)}</p>
                <div className="mt-6 text-xs font-bold text-primary-glow opacity-0 group-hover:opacity-100 transition-opacity">
                  0{i + 1} →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
