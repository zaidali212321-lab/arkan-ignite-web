import { PageLayout, PageHero } from "@/components/PageLayout";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const AboutPage = () => {
  const { t } = useLang();
  return (
    <PageLayout>
      <PageHero kicker={t("nav_about")} title={t("about_title_2")} desc={t("about_desc")} />
      <About />
      <WhyUs />
      <ContactCTA />
    </PageLayout>
  );
};

export default AboutPage;
