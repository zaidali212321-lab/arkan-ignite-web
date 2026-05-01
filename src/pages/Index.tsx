import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
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
    <ProductShowcase />
    <About compact />
    <WhyUs />
    <Services compact />
    <Products compact />
    <Clients />
    <ContactCTA />
  </PageLayout>
);

export default Index;
