import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { Services } from "@/components/Services";
import { Products } from "@/components/Products";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WhyUs />
      <Services />
      <Products />
      <Clients />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
