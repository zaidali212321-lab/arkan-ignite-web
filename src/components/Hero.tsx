import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export const Hero = () => {
  const { t, dir, lang } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.1,
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [lang]);

  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      ref={wrapRef}
      dir={dir}
      className="relative min-h-[88vh] overflow-hidden text-dark-foreground"
      style={{ background: "#111111" }}
    >
      {/* Hexagonal/geometric pattern overlay inspired by cube logo */}
      <div className="absolute inset-0 bg-hex-pattern opacity-60" />
      {/* Subtle red glow */}
      <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] bg-gradient-radial-red blur-3xl opacity-40" />
      <div className="absolute right-0 -bottom-32 h-[420px] w-[420px] bg-gradient-radial-red blur-3xl opacity-25" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

      <div className="relative container py-28 md:py-36 min-h-[88vh] flex items-center">
        <div className={`max-w-3xl space-y-7 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <span className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur text-[11px] font-bold tracking-[0.25em] uppercase">
            <ShieldCheck className="h-3.5 w-3.5 text-primary-glow" />
            {t("hero_top_label")}
          </span>

          <h1 className="hero-anim font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white">
            {t("hero_title_1")}{" "}
            <span className="text-gradient">{t("hero_title_2")}</span>{" "}
            {t("hero_title_3")}
          </h1>

          <p className="hero-anim text-lg text-white/75 max-w-2xl leading-relaxed">
            {t("hero_desc")}
          </p>

          <p className="hero-anim text-sm md:text-base text-white/60 max-w-2xl leading-relaxed border-l-2 border-primary pl-4">
            {t("hero_certs")}
          </p>

          <div className={`hero-anim flex flex-wrap gap-4 ${lang === "ar" ? "justify-end" : ""}`}>
            <Button
              size="xl"
              asChild
              className="bg-primary hover:bg-primary-deep text-primary-foreground rounded-full px-8 font-bold shadow-glow transition-all"
            >
              <Link to="/services" className="group">
                {t("hero_cta1")}
                <Arrow
                  className={`h-4 w-4 transition-transform ${
                    lang === "ar" ? "mr-2 group-hover:-translate-x-1" : "ml-2 group-hover:translate-x-1"
                  }`}
                />
              </Link>
            </Button>
            <Button
              size="xl"
              asChild
              variant="outline"
              className="rounded-full px-8 font-bold border-white/40 bg-transparent text-white hover:bg-white hover:text-dark transition-all"
            >
              <Link to="/contact">{t("hero_cta2")}</Link>
            </Button>
          </div>

          <div className={`hero-anim flex gap-10 pt-8 border-t border-white/10 ${lang === "ar" ? "justify-end" : ""}`}>
            <Stat value="+15" label={t("hero_stat_years")} />
            <Stat value="+500" label={t("hero_stat_projects")} />
            <Stat value="+200" label={t("hero_stat_clients")} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="font-display text-3xl bg-gradient-warm bg-clip-text text-transparent">{value}</div>
    <div className="text-xs text-white/60 mt-1">{label}</div>
  </div>
);
