// Centralized WhatsApp link & analytics helpers.
// Single source of truth for phone numbers and click tracking.

export const WHATSAPP_NUMBERS = {
  primary: "966580535332",
  secondary: "966568603766",
} as const;

export type WhatsAppKey = keyof typeof WHATSAPP_NUMBERS;

export const waHref = (key: WhatsAppKey = "primary", message?: string) => {
  const n = WHATSAPP_NUMBERS[key];
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${n}${q}`;
};

// Lightweight analytics: pushes to dataLayer (GTM/GA4) when present,
// always logs to localStorage counter so we can audit clicks even without GA.
export const trackWhatsAppClick = (
  key: WhatsAppKey,
  source: string,
) => {
  try {
    const payload = {
      event: "whatsapp_click",
      number: WHATSAPP_NUMBERS[key],
      source,
      ts: Date.now(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (Array.isArray(w.dataLayer)) w.dataLayer.push(payload);
    if (typeof w.gtag === "function") w.gtag("event", "whatsapp_click", payload);

    const storeKey = `wa_clicks_${key}`;
    const prev = parseInt(localStorage.getItem(storeKey) || "0", 10) || 0;
    localStorage.setItem(storeKey, String(prev + 1));
    localStorage.setItem("wa_clicks_last", JSON.stringify(payload));
  } catch {
    /* analytics must never break UX */
  }
};
