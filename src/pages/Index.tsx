import { Hero } from "@/components/Hero";
// import { Cinematic3DSection } from "@/components/Cinematic3DSection"; // 3D scene available; re-enable when WebGL stack is verified
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
    {/* <Cinematic3DSection /> */}
    <About compact />
    <WhyUs />
    <Services compact />
    <Products compact />
    <Clients />
    <ContactCTA />
  </PageLayout>
);

export default Index;
