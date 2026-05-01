import { PageLayout, PageHero } from "@/components/PageLayout";
import { ProductsCatalog } from "@/components/ProductsCatalog";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const categoryNav = [
  { id: "water", key: "cat_water_t" },
  { id: "detect", key: "cat_detect_t" },
  { id: "security", key: "cat_security_t" },
  { id: "ppe", key: "cat_ppe_t" },
] as const;

const ProductsPage = () => {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero
        kicker={t("nav_products")}
        title={t("products_title_2")}
        desc={t("products_desc" as never) || undefined}
      />
      <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex flex-wrap gap-2 py-4 justify-center">
          {categoryNav.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="px-4 py-2 rounded-full text-sm font-medium border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              {t(c.key)}
            </a>
          ))}
        </div>
      </div>
      <ProductsCatalog />
      <ContactCTA />
    </PageLayout>
  );
};

export default ProductsPage;
