import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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
    <footer dir={dir} className="bg-dark text-dark-foreground border-t border-dark-border">
      <div className="container py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <img src={logo} alt="Arkan Alitqan Arabiya" className="h-14 w-auto bg-white/95 rounded-lg p-2" />
          <p className="text-dark-foreground/60 text-sm leading-relaxed max-w-sm">{t("footer_desc")}</p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-10 w-10 rounded-full grid place-items-center border border-dark-border hover:bg-primary hover:border-primary transition-all hover:-translate-y-1">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display mb-4">{t("footer_quick")}</h4>
          <ul className="space-y-2 text-sm text-dark-foreground/60">
            {links.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary-glow transition-colors">{t(l.k)}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display mb-4">{t("footer_contact")}</h4>
          <ul className="space-y-2 text-sm text-dark-foreground/60">
            <li>{t("contact_address_v")}</li>
            <li>+966 11 234 5678</li>
            <li>info@arkanalitqan.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-dark-border">
        <div className="container py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-dark-foreground/50">
          <span>{t("footer_rights")}</span>
          <span>Arkan Alitqan Alarabiya · Industrial Safety & Solutions</span>
        </div>
      </div>
    </footer>
  );
};
