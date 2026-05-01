import { useReveal } from "@/hooks/use-reveal";
import { Briefcase, Wrench, Cog, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "خدمات قسم المبيعات",
    desc: "توريد كامل لأنظمة الإطفاء ومعدات السلامة من أفضل الماركات العالمية المعتمدة.",
    tags: ["توريد معتمد", "ضمان أصلي", "أسعار تنافسية"],
  },
  {
    icon: Cog,
    title: "خدمات القسم الهندسي",
    desc: "تصميم وتنفيذ أنظمة السلامة والإطفاء المتكاملة وفق دراسات هندسية دقيقة.",
    tags: ["تصميم متخصص", "دراسات فنية", "إشراف ميداني"],
  },
  {
    icon: Wrench,
    title: "التشغيل والصيانة",
    desc: "خدمات صيانة دورية وطارئة على مدار الساعة لضمان جاهزية كاملة لأنظمتك.",
    tags: ["24/7", "صيانة دورية", "فريق مختص"],
  },
];

export const Services = () => {
  const ref = useReveal();
  return (
    <section id="services" ref={ref as any} dir="rtl" className="py-28 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">خدماتنا</span>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl mt-4">
              حلول متكاملة <span className="text-gradient">للسلامة الصناعية</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-muted-foreground max-w-md">
            نقدم باقة متنوعة من الخدمات المتخصصة لتلبية كافة احتياجات عملائنا في مجال الأمن والسلامة.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2`}
            >
              <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/30 transition-colors duration-700" />
              <div className="relative">
                <div className="text-7xl font-display text-primary/10 leading-none mb-4">0{i + 1}</div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center mb-5 shadow-elegant group-hover:rotate-6 transition-transform duration-500">
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link">
                  اطلب الخدمة
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover/link:-translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
