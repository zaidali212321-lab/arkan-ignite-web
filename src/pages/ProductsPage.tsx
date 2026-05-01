import { PageLayout, PageHero } from "@/components/PageLayout";
import { Products } from "@/components/Products";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const ProductsPage = () => {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero kicker={t("nav_products")} title={t("products_title_2")} />
      <Products />
      <ContactCTA />
    </PageLayout>
  );
};

export default ProductsPage;
