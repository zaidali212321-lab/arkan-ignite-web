import { useEffect, useState } from "react";
import { Search, Menu, X, ArrowRight, ArrowLeft } from "lucide-react";
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
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/60 backdrop-blur-[10px] border-b border-white/10 shadow-card"
          : isHome
          ? "bg-dark/30 backdrop-blur-[10px] border-b border-white/5"
          : "bg-dark/70 backdrop-blur-[10px] border-b border-white/10"
      }`}
    >
      <nav className="container flex items-center justify-between h-20 font-latin" dir={dir}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src={logo}
            alt="Arkan Alitqan Arabiya"
            className="h-11 w-auto transition-transform group-hover:scale-105"
            style={{ background: "transparent" }}
          />
          <div className="flex flex-col justify-center leading-none">
            <span className="font-latin font-bold text-[11px] tracking-[0.12em] text-white uppercase whitespace-nowrap">
              ARKAN ALITQAN
            </span>
            <span className="font-latin font-semibold text-[9.5px] tracking-[0.28em] text-white/85 uppercase whitespace-nowrap mt-[3px]">
              ALARABIYA
            </span>
          </div>
        </Link>

        {/* Center links */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(l.key)}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber transition-all duration-300 ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* AR/EN pill */}
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-full border border-white/25 bg-white/5 text-white text-xs font-bold tracking-[0.15em] hover:bg-white/15 transition-colors"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>

          {/* Search */}
          <button
            aria-label="Search"
            className="hidden sm:grid place-items-center h-9 w-9 rounded-full border border-white/25 bg-white/5 text-white hover:bg-white/15 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Get a Quote — gradient pill */}
          <Button
            variant="hero"
            asChild
            className="hidden md:inline-flex h-9 rounded-full px-5 text-xs font-semibold tracking-wide"
          >
            <Link to="/contact">{t("cta_quote")}</Link>
          </Button>

          {/* Contact Us — white pill with arrow circle */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 h-9 ps-5 pe-1 rounded-full bg-white text-dark text-xs font-semibold tracking-wide shadow-card hover:shadow-glow transition-shadow group"
          >
            {t("nav_contact")}
            <span className="grid place-items-center h-7 w-7 rounded-full bg-gradient-warm text-white transition-transform group-hover:scale-110">
              <Arrow className="h-3.5 w-3.5" />
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            aria-label="Menu"
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-dark/95 backdrop-blur-xl border-t border-white/10" dir={dir}>
          <ul className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium ${
                      isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                    }`
                  }
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
            <button
              onClick={toggle}
              className="mt-2 px-4 py-3 rounded-lg border border-white/15 text-white font-bold tracking-wider text-sm"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
            <Button variant="hero" className="mt-2 rounded-full" asChild>
              <Link to="/contact">{t("cta_quote")}</Link>
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
};
