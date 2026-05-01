import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import about from "@/assets/about.jpg";

const points = [
  "خبرة تتجاوز 15 عاماً في مجال السلامة",
  "شركاء معتمدون لكبرى الشركات العالمية",
  "فريق مهندسين وفنيين مؤهلين",
  "خدمة على مدار الساعة",
];

export const About = () => {
  const ref = useReveal();
  return (
    <section id="about" ref={ref as any} dir="rtl" className="relative py-28 bg-background overflow-hidden">
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal relative">
          <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img src={about} alt="فريق العمل" loading="lazy" width={1280} height={960} className="w-full h-[520px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between text-white">
              <div>
                <div className="text-5xl font-display">+15</div>
                <div className="text-sm opacity-80">سنة من الخبرة</div>
              </div>
              <div className="h-px flex-1 mx-6 bg-white/20" />
              <div className="text-right">
                <div className="text-sm opacity-80">معتمدون من</div>
                <div className="font-display">ISO 9001</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">من نحن</span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl leading-tight">
            شركاء موثوقون في
            <br />
            <span className="text-gradient">حماية المنشآت</span>
          </h2>
          <p className="reveal reveal-delay-2 text-muted-foreground leading-relaxed text-lg">
            تأسست أركان الإتقان العربية لتكون الخيار الأول في توفير حلول الأمن والسلامة المتكاملة.
            نوفر منظومة شاملة من أنظمة الإطفاء، معدات السلامة الشخصية، وخدمات الصيانة الدورية،
            بمعايير عالمية تواكب أحدث التقنيات.
          </p>
          <ul className="reveal reveal-delay-3 grid sm:grid-cols-2 gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <div className="reveal reveal-delay-4 pt-2">
            <Button variant="hero" size="lg" asChild>
              <a href="#services">تعرف على خدماتنا</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
