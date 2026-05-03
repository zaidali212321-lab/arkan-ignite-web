import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import extinguisher from "@/assets/extinguisher.png";
import heroBg from "@/assets/hero-bg.jpg";
import heroVideo from "@/assets/hero-bg.mp4";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { t, dir, lang } = useLang();
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // GSAP ScrollTrigger drives a 0..1 progress var that the rAF loop reads.
  useEffect(() => {
    if (!wrapRef.current) return;
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  // Combined mouse parallax + scroll-driven 3D transform with lerp smoothing.
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let cx = 0, cy = 0, cs = 0;

    const render = () => {
      cx = lerp(cx, mouseRef.current.x, 0.08);
      cy = lerp(cy, mouseRef.current.y, 0.08);
      cs = lerp(cs, scrollRef.current, 0.12);

      if (imgRef.current) {
        const rotZ = cs * 32;
        const rotYScroll = cs * -22;
        const translateY = cs * 160;
        const translateX = cs * -50;
        const scale = 1 - cs * 0.18;
        const rotY = cx * 18 + rotYScroll;
        const rotX = -cy * 14;
        imgRef.current.style.transform = `perspective(1200px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
      }
      if (stageRef.current) stageRef.current.style.setProperty("--scroll", String(cs));
      rafRef.current = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => { mouseRef.current.x = 0; mouseRef.current.y = 0; };

    const el = wrapRef.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(render);
    return () => {
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // GSAP entry animation for headline + CTAs
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
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
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover opacity-50"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={heroBg}
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/75 via-dark/65 to-dark" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -left-32 top-1/3 h-[600px] w-[600px] bg-gradient-radial-red blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative container pt-40 pb-20 flex items-center justify-center min-h-screen">
        <div className="space-y-8 max-w-3xl text-center mx-auto">
          <span className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dark-border bg-dark-muted/50 backdrop-blur text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            {t("hero_badge")}
          </span>

          <h1 className="hero-anim font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            {t("hero_title_1")}
            <br />
            <span className="text-gradient">{t("hero_title_2")}</span>
            <br />
            {t("hero_title_3")}
          </h1>

          <p className="hero-anim text-lg text-dark-foreground/70 max-w-2xl mx-auto leading-relaxed">{t("hero_desc")}</p>

          <div className="hero-anim flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/services" className="group">
                {t("hero_cta1")}
                <Arrow className={`h-4 w-4 transition-transform ${lang === "ar" ? "mr-2 group-hover:-translate-x-1" : "ml-2 group-hover:translate-x-1"}`} />
              </Link>
            </Button>
            <MagneticButton variant="outlineLight" size="xl" asChild>
              <Link to="/contact">{t("cta_quote")}</Link>
            </MagneticButton>
          </div>

          <div className="hero-anim flex gap-8 pt-6 border-t border-dark-border justify-center">
            <div>
              <div className="font-display text-3xl text-primary-glow">+15</div>
              <div className="text-xs text-dark-foreground/60 mt-1">{t("hero_stat_years")}</div>
            </div>
            <div>
              <div className="font-display text-3xl text-primary-glow">+500</div>
              <div className="text-xs text-dark-foreground/60 mt-1">{t("hero_stat_projects")}</div>
            </div>
            <div>
              <div className="font-display text-3xl text-primary-glow">+200</div>
              <div className="text-xs text-dark-foreground/60 mt-1">{t("hero_stat_clients")}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-foreground/50 text-xs">
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-dark-foreground/40 to-transparent animate-pulse" />
        {t("scroll_label")}
      </div>
    </section>
  );
};
