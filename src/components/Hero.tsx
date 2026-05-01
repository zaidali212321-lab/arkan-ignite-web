import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import extinguisher from "@/assets/extinguisher.png";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      imgRef.current.style.transform = `perspective(1200px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg) translateZ(0)`;
    };
    const el = wrapRef.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", () => {
      if (imgRef.current) imgRef.current.style.transform = "";
    });
    return () => {
      el?.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="home"
      ref={wrapRef}
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-dark text-dark-foreground"
    >
      {/* BG */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/60 to-dark" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -left-32 top-1/3 h-[600px] w-[600px] bg-gradient-radial-red blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative container pt-40 pb-20 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Text */}
        <div className="space-y-8 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dark-border bg-dark-muted/50 backdrop-blur text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            أركان الإتقان العربية · Industrial Safety Experts
          </span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            شركة رائدة في
            <br />
            <span className="text-gradient">حلول الأمن والسلامة</span>
            <br />
            الصناعية
          </h1>

          <p className="text-lg text-dark-foreground/70 max-w-lg leading-relaxed">
            نقدم أحدث أنظمة الإطفاء ومعدات السلامة وفقاً لأعلى المعايير العالمية،
            مع فريق من الخبراء لخدمة المنشآت الصناعية والتجارية.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#services" className="group">
                اكتشف خدماتنا
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              </a>
            </Button>
            <Button variant="outlineLight" size="xl" asChild>
              <a href="#contact">احصل على عرض سعر</a>
            </Button>
          </div>

          <div className="flex gap-8 pt-6 border-t border-dark-border">
            <div>
              <div className="font-display text-3xl text-primary-glow">+15</div>
              <div className="text-xs text-dark-foreground/60 mt-1">سنة خبرة</div>
            </div>
            <div>
              <div className="font-display text-3xl text-primary-glow">+500</div>
              <div className="text-xs text-dark-foreground/60 mt-1">مشروع منجز</div>
            </div>
            <div>
              <div className="font-display text-3xl text-primary-glow">+200</div>
              <div className="text-xs text-dark-foreground/60 mt-1">عميل موثوق</div>
            </div>
          </div>
        </div>

        {/* Extinguisher */}
        <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-radial-red blur-3xl" />
          <div className="absolute h-72 w-72 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" />
          <img
            ref={imgRef}
            src={extinguisher}
            alt="Fire extinguisher"
            width={1024}
            height={1024}
            className="relative h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(220,38,38,0.5)] animate-hero-in animate-float-extinguisher transition-transform duration-300 ease-out"
          />
          {/* spec ring */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-2 w-64 bg-primary/40 blur-xl rounded-full" />
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-foreground/50 text-xs">
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-dark-foreground/40 to-transparent animate-pulse" />
        SCROLL
      </div>
    </section>
  );
};
