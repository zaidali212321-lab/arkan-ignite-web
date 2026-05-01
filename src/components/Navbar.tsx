import { useEffect, useState } from "react";
import { Search, Menu, X, Globe } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", key: "nav_home" as const },
  { to: "/about", key: "nav_about" as const },
  { to: "/services", key: "nav_services" as const },
  { to: "/products", key: "nav_products" as const },
  { to: "/clients", key: "nav_clients" as const },
  { to: "/contact", key: "nav_contact" as const },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, lang, toggle, dir } = useLang();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const overDark = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-card"
          : isHome
          ? "bg-transparent"
          : "bg-background/85 backdrop-blur-xl border-b border-border"
      }`}
    >
      <nav className="container flex items-center justify-between h-20" dir={dir}>
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Arkan Alitqan Arabiya" className="h-12 w-auto transition-transform group-hover:scale-105" style={{ background: "transparent" }} />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    isActive
                      ? "text-primary"
                      : overDark
                      ? "text-white hover:text-primary-glow"
                      : "text-foreground hover:text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(l.key)}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className={`hidden sm:inline-flex items-center gap-1.5 h-10 px-3 rounded-full border text-xs font-bold tracking-wider transition-colors ${
              overDark
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <button
            aria-label="Search"
            className={`hidden sm:grid place-items-center h-10 w-10 rounded-full border transition-colors ${
              overDark
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            <Search className="h-4 w-4" />
          </button>
          <Button variant="hero" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/contact">{t("cta_quote")}</Link>
          </Button>
          <button
            aria-label="Menu"
            className={`lg:hidden grid place-items-center h-10 w-10 rounded-full ${overDark ? "text-white" : "text-foreground"}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border" dir={dir}>
          <ul className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-semibold ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
            <button
              onClick={toggle}
              className="mt-2 px-4 py-3 rounded-lg border border-border font-bold tracking-wider text-sm flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {lang === "ar" ? "English" : "العربية"}
            </button>
            <Button variant="hero" className="mt-2" asChild>
              <Link to="/contact">{t("cta_quote")}</Link>
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
};
