import { PageLayout, PageHero } from "@/components/PageLayout";
import { Services } from "@/components/Services";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const ServicesPage = () => {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero kicker={t("nav_services")} title={t("services_title_2")} desc={t("services_desc")} />
      <Services />
      <ContactCTA />
    </PageLayout>
  );
};

export default ServicesPage;
