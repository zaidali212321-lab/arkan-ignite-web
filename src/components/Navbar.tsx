import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { href: "#home", ar: "الرئيسية", en: "Home" },
  { href: "#about", ar: "ملف الشركة", en: "About" },
  { href: "#services", ar: "خدماتنا", en: "Services" },
  { href: "#products", ar: "منتجاتنا", en: "Products" },
  { href: "#clients", ar: "عملاؤنا", en: "Clients" },
  { href: "#contact", ar: "اتصل بنا", en: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = links.map((l) => document.querySelector(l.href));
      sections.forEach((s, i) => {
        if (s) {
          const rect = (s as HTMLElement).getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) setActive(links[i].href);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-20" dir="rtl">
        <a href="#home" className="flex items-center gap-3 group">
          <img src={logo} alt="Arkan Alitqan Arabiya" className="h-12 w-auto transition-transform group-hover:scale-105" />
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  active === l.href
                    ? "text-primary"
                    : scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-primary-glow"
                }`}
              >
                {l.ar}
                {active === l.href && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className={`hidden sm:grid place-items-center h-10 w-10 rounded-full border transition-colors ${
              scrolled
                ? "border-border text-foreground hover:bg-secondary"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            <Search className="h-4 w-4" />
          </button>
          <Button variant="hero" size="sm" className="hidden sm:inline-flex" asChild>
            <a href="#contact">احصل على عرض سعر</a>
          </Button>
          <button
            aria-label="Menu"
            className={`lg:hidden grid place-items-center h-10 w-10 rounded-full ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border" dir="rtl">
          <ul className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-secondary text-foreground font-semibold"
                >
                  {l.ar}
                </a>
              </li>
            ))}
            <Button variant="hero" className="mt-2" asChild>
              <a href="#contact" onClick={() => setOpen(false)}>احصل على عرض سعر</a>
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
};
