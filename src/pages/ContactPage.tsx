import { PageLayout, PageHero } from "@/components/PageLayout";
import { Contact } from "@/components/Contact";
import { useLang } from "@/i18n/LanguageContext";

const ContactPage = () => {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero kicker={t("nav_contact")} title={t("contact_title_2")} desc={t("contact_desc")} />
      <Contact />
    </PageLayout>
  );
};

export default ContactPage;
