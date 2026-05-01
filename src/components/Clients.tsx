import { useReveal } from "@/hooks/use-reveal";

const clients = ["Cyan", "Panda", "FedEx", "Saudi Aramco", "SABIC", "NEOM", "STC", "Almarai", "Maaden", "Nesma"];

export const Clients = () => {
  const ref = useReveal();
  return (
    <section id="clients" ref={ref as any} dir="rtl" className="py-24 bg-background border-y border-border overflow-hidden">
      <div className="container text-center mb-12">
        <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">عملاؤنا</span>
        <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl mt-4">
          موثوقون من <span className="text-gradient">قبل الأفضل</span>
        </h2>
      </div>

      <div className="reveal reveal-delay-2 relative">
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="flex marquee gap-6 w-max">
          {[...clients, ...clients].map((c, i) => (
            <div
              key={i}
              className="h-24 min-w-[200px] px-10 rounded-2xl border border-border bg-card grid place-items-center font-display text-2xl text-muted-foreground hover:text-primary hover:border-primary hover:shadow-card transition-all"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
