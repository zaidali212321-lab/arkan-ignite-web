import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { Services } from "@/components/Services";
import { Products } from "@/components/Products";
import { Clients } from "@/components/Clients";
import { ContactCTA } from "@/components/ContactCTA";
import { PageLayout } from "@/components/PageLayout";

const Index = () => (
  <PageLayout>
    <Hero />
    <About compact />
    <WhyUs />
    <Services compact />
    <Products compact />
    <Clients />
    <ContactCTA />
  </PageLayout>
);

export default Index;
