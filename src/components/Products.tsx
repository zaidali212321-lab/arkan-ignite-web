import { useReveal } from "@/hooks/use-reveal";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

const products = [
  { img: p1, t: "p1_t", d: "p1_d" },
  { img: p3, t: "p2_t", d: "p2_d" },
  { img: p4, t: "p3_t", d: "p3_d" },
  { img: p2, t: "p4_t", d: "p4_d" },
] as const;

export const Products = ({ compact = false }: { compact?: boolean }) => {
  const ref = useReveal();
  const { t, dir } = useLang();
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % products.length);
  const prev = () => setIdx((i) => (i - 1 + products.length) % products.length);

  return (
    <section id="products" ref={ref as any} dir={dir} className="py-28 bg-secondary/40">
      <div className="container">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">{t("products_kicker")}</span>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl mt-4">
              {t("products_title_1")} <span className="text-gradient">{t("products_title_2")}</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button onClick={prev} aria-label="Previous" className="h-12 w-12 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all grid place-items-center">
              <ChevronRight className="h-5 w-5" />
            </button>
            <button onClick={next} aria-label="Next" className="h-12 w-12 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all grid place-items-center">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <div
              key={p.t}
              className={`reveal reveal-delay-${i + 1} group relative rounded-3xl overflow-hidden bg-card shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 ${
                i === idx ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={p.img} alt={t(p.t)} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <h3 className="font-display text-xl mb-2">{t(p.t)}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{t(p.d)}</p>
                <div className="h-px bg-white/20 my-4" />
                <Link to="/contact" className="text-xs font-bold text-primary-glow tracking-wider">{t("p_inquire")} →</Link>
              </div>
            </div>
          ))}
        </div>

        {compact && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">{t("view_all")}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
