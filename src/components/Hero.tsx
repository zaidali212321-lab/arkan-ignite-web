import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowLeft, ArrowRight, Sparkles, Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import heroBg from "@/assets/hero-cinematic.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { t, dir, lang } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax background + testimonial card scroll motion
  useEffect(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(cardRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  // Entry reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(".hero-card", {
        x: lang === "ar" ? -60 : 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.5,
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
      className="relative min-h-screen overflow-hidden bg-dark text-dark-foreground"
    >
      {/* Cinematic background image with parallax */}
      <div ref={bgRef} className="absolute inset-0 -top-10 -bottom-10 will-change-transform">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layered overlays: cinematic darkening + warm radial glow + grid + grain */}
      <div className="absolute inset-0 bg-gradient-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/40 to-transparent" />
      <div className="absolute -left-40 top-1/4 h-[640px] w-[640px] bg-gradient-radial-red blur-3xl animate-pulse-glow" />
      <div className="absolute right-0 bottom-0 h-[520px] w-[520px] bg-gradient-radial-amber blur-3xl opacity-70" />
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />

      {/* Content grid */}
      <div className="relative container pt-32 md:pt-40 pb-20 min-h-screen grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: text */}
        <div className={`lg:col-span-7 space-y-7 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <span className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dark-border bg-dark-muted/40 backdrop-blur text-[11px] font-bold tracking-[0.25em] uppercase">
            <Sparkles className="h-3.5 w-3.5 text-amber" />
            {t("hero_top_label")}
          </span>

          <h1 className="hero-anim font-latin font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            {t("hero_title_1")}{" "}
            <span className="text-[hsl(var(--primary-glow))]">{t("hero_title_2")} {t("hero_title_3")}</span>
          </h1>

          <p className="hero-anim text-lg text-dark-foreground/75 max-w-xl leading-relaxed">
            {t("hero_desc")}
          </p>

          <div className={`hero-anim flex flex-wrap gap-4 ${lang === "ar" ? "justify-end" : ""}`}>
            <Button
              variant="hero"
              size="xl"
              asChild
              className="rounded-full px-8 shadow-glow hover:shadow-elegant transition-shadow"
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
            <MagneticButton variant="outlineLight" size="xl" asChild className="rounded-full px-8 backdrop-blur">
              <Link to="/contact">{t("cta_quote")}</Link>
            </MagneticButton>
          </div>

          <div className={`hero-anim flex gap-10 pt-8 border-t border-dark-border ${lang === "ar" ? "justify-end" : ""}`}>
            <Stat value="+15" label={t("hero_stat_years")} />
            <Stat value="+500" label={t("hero_stat_projects")} />
            <Stat value="+200" label={t("hero_stat_clients")} />
          </div>
        </div>

        {/* Right: glassmorphism testimonial card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={cardRef}
            className="hero-card relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-8 shadow-elegant"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber/10 via-transparent to-primary/20 pointer-events-none" />
            <div className="relative">
              <div className="flex gap-1 mb-5" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                ))}
              </div>
              <p className="text-dark-foreground/90 leading-relaxed text-[0.98rem]">
                “{t("hero_testimonial")}”
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="font-semibold">{t("hero_testimonial_name")}</div>
                <div className="text-xs text-dark-foreground/60 mt-1">{t("hero_testimonial_role")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-foreground/50 text-[10px] tracking-[0.3em]">
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-dark-foreground/40 to-transparent animate-pulse" />
        {t("scroll_label")}
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="font-display text-3xl bg-gradient-warm bg-clip-text text-transparent">{value}</div>
    <div className="text-xs text-dark-foreground/60 mt-1">{label}</div>
  </div>
);
