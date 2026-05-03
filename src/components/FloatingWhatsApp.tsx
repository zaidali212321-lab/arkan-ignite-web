import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/966580535332"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full grid place-items-center bg-[hsl(142,70%,45%)] text-white shadow-elegant hover:scale-110 transition-transform animate-pulse-glow"
  >
    <MessageCircle className="h-6 w-6 fill-white" />
    <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] opacity-40 animate-ping" />
  </a>
);
