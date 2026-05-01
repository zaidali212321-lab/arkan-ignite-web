import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(20)
    .regex(/^[+\d][\d\s\-()]{4,}$/),
  quantity: z.coerce.number().int().min(1).max(9999),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export const ProductQuoteForm = ({
  productName,
  onSuccess,
}: {
  productName: string;
  onSuccess?: () => void;
}) => {
  const { t } = useLang();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", quantity: 1, notes: "" },
  });

  // Re-sync product when modal switches between products
  useEffect(() => {
    reset({ name: "", email: "", phone: "", quantity: 1, notes: "" });
  }, [productName, reset]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      // Simulated submission — wire to backend/email later
      await new Promise((r) => setTimeout(r, 600));
      toast({ title: t("pdq_success") });
      reset();
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  };

  const errMsg = (key: keyof FormValues, fallback: string) =>
    errors[key] ? fallback : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label className="text-xs text-muted-foreground">{t("pdq_product")}</Label>
        <Input value={productName} readOnly className="mt-1 bg-secondary/60 font-medium" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="pq-name" className="text-xs">{t("pdq_name")} *</Label>
          <Input
            id="pq-name"
            maxLength={100}
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
            className="mt-1"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{t("pdq_err_name")}</p>}
        </div>
        <div>
          <Label htmlFor="pq-email" className="text-xs">{t("pdq_email")} *</Label>
          <Input
            id="pq-email"
            type="email"
            maxLength={255}
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
            className="mt-1"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{t("pdq_err_email")}</p>}
        </div>
        <div>
          <Label htmlFor="pq-phone" className="text-xs">{t("pdq_phone")} *</Label>
          <Input
            id="pq-phone"
            type="tel"
            inputMode="tel"
            maxLength={20}
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
            className="mt-1"
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{t("pdq_err_phone")}</p>}
        </div>
        <div>
          <Label htmlFor="pq-qty" className="text-xs">{t("pdq_qty")} *</Label>
          <Input
            id="pq-qty"
            type="number"
            min={1}
            max={9999}
            aria-invalid={!!errors.quantity}
            {...register("quantity")}
            className="mt-1"
          />
          {errors.quantity && <p className="text-xs text-destructive mt-1">{t("pdq_err_qty")}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="pq-notes" className="text-xs">{t("pdq_notes")}</Label>
        <Textarea
          id="pq-notes"
          rows={3}
          maxLength={1000}
          aria-invalid={!!errors.notes}
          {...register("notes")}
          className="mt-1 resize-none"
        />
        {errors.notes && <p className="text-xs text-destructive mt-1">{t("pdq_err_notes")}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        <span className="ms-2">{t("pdq_submit")}</span>
      </Button>
    </form>
  );
};
