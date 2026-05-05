import whatsappIcon from "@/assets/whatsapp-logo.png";
import { trackWhatsAppClick, waHref } from "@/lib/whatsapp";

export const FloatingWhatsApp = () => (
  <a
    href={waHref("primary")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    onClick={() => trackWhatsAppClick("primary", "floating_button")}
    className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full grid place-items-center hover:scale-110 transition-transform"
  >
    <img
      src={whatsappIcon}
      alt="WhatsApp"
      className="h-14 w-14 object-contain drop-shadow-lg"
      style={{ mixBlendMode: "multiply" }}
    />
    <span className="absolute inset-2 rounded-full bg-[hsl(142,70%,45%)] opacity-30 animate-ping -z-10" />
  </a>
);
