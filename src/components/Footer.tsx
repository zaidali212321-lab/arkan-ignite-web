import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => (
  <footer dir="rtl" className="bg-dark text-dark-foreground border-t border-dark-border">
    <div className="container py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2 space-y-4">
        <img src={logo} alt="Arkan Alitqan Arabiya" className="h-14 w-auto" />
        <p className="text-dark-foreground/60 text-sm leading-relaxed max-w-sm">
          أركان الإتقان العربية - شركة رائدة في حلول الأمن والسلامة الصناعية ومكافحة الحرائق في المملكة العربية السعودية.
        </p>
        <div className="flex gap-3">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a key={i} href="#" aria-label="social" className="h-10 w-10 rounded-full grid place-items-center border border-dark-border hover:bg-primary hover:border-primary transition-all hover:-translate-y-1">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display mb-4">روابط سريعة</h4>
        <ul className="space-y-2 text-sm text-dark-foreground/60">
          {[
            ["الرئيسية", "#home"],
            ["من نحن", "#about"],
            ["خدماتنا", "#services"],
            ["منتجاتنا", "#products"],
            ["اتصل بنا", "#contact"],
          ].map(([n, h]) => (
            <li key={h}><a href={h} className="hover:text-primary-glow transition-colors">{n}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display mb-4">تواصل</h4>
        <ul className="space-y-2 text-sm text-dark-foreground/60">
          <li>الرياض، المملكة العربية السعودية</li>
          <li>+966 11 234 5678</li>
          <li>info@arkanalitqan.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-dark-border">
      <div className="container py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-dark-foreground/50">
        <span>© 2026 أركان الإتقان العربية. جميع الحقوق محفوظة.</span>
        <span>Arkan Alitqan Alarabiya · Industrial Safety & Solutions</span>
      </div>
    </div>
  </footer>
);
