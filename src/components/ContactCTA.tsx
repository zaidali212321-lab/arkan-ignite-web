import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const ContactCTA = () => {
  const { t, lang } = useLang();
  const ref = useReveal();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section ref={ref as any} className="relative py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="reveal relative rounded-3xl overflow-hidden bg-gradient-primary p-10 md:p-16 text-white shadow-elegant">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">{t("cta_banner_title")}</h2>
              <p className="mt-4 text-white/85 max-w-md">{t("cta_banner_desc")}</p>
            </div>
            <div className="md:justify-self-end">
              <Button variant="outlineLight" size="xl" asChild>
                <Link to="/contact" className="group">
                  {t("cta_quote")}
                  <Arrow className={`h-4 w-4 transition-transform ${lang === "ar" ? "mr-2 group-hover:-translate-x-1" : "ml-2 group-hover:translate-x-1"}`} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
