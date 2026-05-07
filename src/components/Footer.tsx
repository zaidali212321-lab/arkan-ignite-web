import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const { t, dir } = useLang();
  const links = [
    { to: "/", k: "nav_home" as const },
    { to: "/about", k: "nav_about" as const },
    { to: "/services", k: "nav_services" as const },
    { to: "/products", k: "nav_products" as const },
    { to: "/contact", k: "nav_contact" as const },
  ];

  return (
    <footer
      dir={dir}
      className="text-white/80"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="container py-16 grid md:grid-cols-3 gap-12">
        {/* Column 1: About */}
        <div className="space-y-4">
          <img
            src={logo}
            alt="Arkan Alitqan Arabiya"
            className="h-16 w-auto"
            style={{ background: "transparent" }}
          />
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            {t("footer_desc")}
          </p>
          <div className="flex gap-3 pt-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="h-10 w-10 rounded-full grid place-items-center border border-white/15 text-white/70 hover:bg-[#A6192E] hover:text-white hover:border-[#A6192E] transition-all hover:-translate-y-1"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-display text-white mb-4">{t("footer_quick")}</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="transition-colors hover:text-[#A6192E]"
                >
                  {t(l.k)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="font-display text-white mb-4">{t("footer_contact")}</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#A6192E]" />
              <span>{t("contact_address_v")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[#A6192E]" />
              <a href="tel:+966580535332" className="hover:text-[#A6192E] transition-colors">
                +966 58 053 5332
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[#A6192E]" />
              <a href="mailto:info@arkansafety.com" className="hover:text-[#A6192E] transition-colors">
                info@arkansafety.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
          <span>{t("footer_rights")}</span>
          <span>أركان الاتقان العربية © 2025</span>
        </div>
      </div>
    </footer>
  );
};
