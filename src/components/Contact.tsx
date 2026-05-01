import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { FormEvent } from "react";

export const Contact = () => {
  const ref = useReveal();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("تم إرسال رسالتك بنجاح، سنتواصل معك قريباً");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" ref={ref as any} dir="rtl" className="py-28 bg-dark text-dark-foreground relative overflow-hidden">
      <div className="absolute right-0 top-0 h-96 w-96 bg-gradient-radial-red blur-3xl" />
      <div className="container relative grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <span className="reveal inline-block text-xs font-bold tracking-[0.3em] text-primary-glow uppercase">اتصل بنا</span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl leading-tight">
            هل أنت جاهز <br />
            <span className="text-gradient">لرفع مستوى السلامة؟</span>
          </h2>
          <p className="reveal reveal-delay-2 text-dark-foreground/70 max-w-md leading-relaxed">
            تواصل مع فريق الخبراء لدينا للحصول على استشارة مجانية أو عرض سعر مخصص لمشروعك.
          </p>

          <div className="reveal reveal-delay-3 space-y-4">
            {[
              { icon: MapPin, label: "العنوان", value: "الرياض، المملكة العربية السعودية" },
              { icon: Phone, label: "الهاتف", value: "+966 11 234 5678" },
              { icon: Mail, label: "البريد", value: "info@arkanalitqan.com" },
              { icon: Clock, label: "ساعات العمل", value: "الأحد - الخميس · 8 ص - 5 م" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl bg-dark-muted/50 border border-dark-border hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center flex-shrink-0">
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-dark-foreground/60">{c.label}</div>
                  <div className="font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="reveal reveal-delay-2 relative p-8 md:p-10 rounded-3xl bg-dark-muted/60 backdrop-blur border border-dark-border space-y-5">
          <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-gradient-primary text-xs font-bold text-white shadow-elegant">
            نموذج التواصل
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="الاسم الكامل" name="name" required />
            <Field label="البريد الإلكتروني" name="email" type="email" required />
          </div>
          <Field label="رقم الهاتف" name="phone" />
          <div>
            <label className="text-xs font-semibold mb-2 block text-dark-foreground/70">الموضوع</label>
            <select name="subject" className="w-full h-12 px-4 rounded-xl bg-dark border border-dark-border focus:border-primary outline-none transition-colors text-dark-foreground">
              <option>طلب عرض سعر</option>
              <option>استفسار عن خدمة</option>
              <option>صيانة وتشغيل</option>
              <option>أخرى</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold mb-2 block text-dark-foreground/70">رسالتك</label>
            <textarea name="message" rows={4} required className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border focus:border-primary outline-none transition-colors text-dark-foreground resize-none" />
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full">
            إرسال الرسالة
          </Button>
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) => (
  <div>
    <label className="text-xs font-semibold mb-2 block text-dark-foreground/70">{label}</label>
    <input
      name={name}
      type={type}
      required={required}
      className="w-full h-12 px-4 rounded-xl bg-dark border border-dark-border focus:border-primary outline-none transition-colors text-dark-foreground"
    />
  </div>
);
