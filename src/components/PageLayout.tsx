import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLang } from "@/i18n/LanguageContext";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const { dir } = useLang();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div dir={dir} className="min-h-screen flex flex-col">
      <Navbar />
      <main key={location.pathname} className="flex-1 animate-fade-up">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const PageHero = ({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) => (
  <section className="relative pt-40 pb-20 bg-dark text-dark-foreground overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-30" />
    <div className="absolute -left-32 top-1/3 h-[500px] w-[500px] bg-gradient-radial-red blur-3xl opacity-60" />
    <div className="container relative text-center">
      <span className="inline-block text-xs font-bold tracking-[0.3em] text-primary-glow uppercase animate-fade-up">{kicker}</span>
      <h1 className="font-display text-5xl md:text-6xl mt-4 animate-fade-up">
        <span className="text-gradient">{title}</span>
      </h1>
      {desc && <p className="mt-5 max-w-2xl mx-auto text-dark-foreground/70 text-lg animate-fade-up">{desc}</p>}
    </div>
  </section>
);
