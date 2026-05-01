import { PageLayout, PageHero } from "@/components/PageLayout";
import { Clients } from "@/components/Clients";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const ClientsPage = () => {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero kicker={t("nav_clients")} title={t("clients_title_2")} desc={t("clients_desc")} />
      <Clients />
      <ContactCTA />
    </PageLayout>
  );
};

export default ClientsPage;
