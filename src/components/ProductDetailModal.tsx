import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Check, ShieldCheck, Award, Globe, Wrench } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

export type ProductDetail = {
  t: TranslationKey;
  d: TranslationKey;
  images: string[];
  specs?: { standard?: string; certification?: string };
};

export const ProductDetailModal = ({
  product,
  open,
  onOpenChange,
}: {
  product: ProductDetail | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) => {
  const { t, dir } = useLang();
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (open) setActiveImg(0);
  }, [open, product]);

  if (!product) return null;

  const features: TranslationKey[] = ["pd_feat_1", "pd_feat_2", "pd_feat_3", "pd_feat_4"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={dir}
        className="max-w-5xl p-0 overflow-hidden gap-0 max-h-[92vh] overflow-y-auto"
      >
        <DialogTitle className="sr-only">{t(product.t)}</DialogTitle>
        <DialogDescription className="sr-only">{t(product.d)}</DialogDescription>

        <button
          onClick={() => onOpenChange(false)}
          aria-label={t("pd_close")}
          className="absolute top-4 end-4 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border grid place-items-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Gallery */}
          <div className="relative bg-gradient-to-br from-secondary via-background to-secondary/60 p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-radial-red opacity-20 pointer-events-none" />
            <div className="relative aspect-square rounded-2xl overflow-hidden grid place-items-center">
              <img
                key={activeImg}
                src={product.images[activeImg]}
                alt={t(product.t)}
                className="max-h-full max-w-full object-contain animate-fade-in"
              />
            </div>
            {product.images.length > 1 && (
              <div className="relative mt-6 flex gap-3 justify-center flex-wrap">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`h-16 w-16 rounded-xl overflow-hidden border-2 transition-all bg-background ${
                      i === activeImg ? "border-primary shadow-elegant" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col">
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              {t("products_kicker")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl mt-3">
              <span className="text-gradient">{t(product.t)}</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t(product.d)}</p>

            {/* Specs */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">{t("pd_specs")}</h3>
              <dl className="grid grid-cols-2 gap-3">
                {product.specs?.standard && (
                  <SpecItem icon={<Award className="h-4 w-4" />} label={t("pd_spec_standard")} value={product.specs.standard} />
                )}
                {product.specs?.certification && (
                  <SpecItem icon={<ShieldCheck className="h-4 w-4" />} label={t("pd_spec_certification")} value={product.specs.certification} />
                )}
                <SpecItem icon={<Wrench className="h-4 w-4" />} label={t("pd_spec_warranty")} value={t("pd_spec_warranty_v")} />
                <SpecItem icon={<Globe className="h-4 w-4" />} label={t("pd_spec_origin")} value={t("pd_spec_origin_v")} />
              </dl>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">{t("pd_features")}</h3>
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{t(f)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <Button asChild size="lg" className="w-full">
                <Link to="/contact" onClick={() => onOpenChange(false)}>
                  {t("pd_request_quote")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SpecItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl border border-border bg-secondary/40 p-3">
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
    <div className="mt-1 font-semibold text-sm">{value}</div>
  </div>
);
