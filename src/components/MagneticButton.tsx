import { forwardRef, useEffect, useRef } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Magnetic wrapper — child button subtly follows the cursor within a 50px
 * radius. Disabled on touch devices.
 */
export const MagneticButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const wrapRef = useRef<HTMLSpanElement>(null);
    const innerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      if (window.matchMedia("(hover: none)").matches) return;

      let raf = 0;
      let tx = 0, ty = 0, cx = 0, cy = 0;
      const STRENGTH = 0.35;
      const RADIUS = 90; // detect radius; movement capped to ~50px

      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS + Math.max(rect.width, rect.height) / 2) {
          tx = Math.max(-50, Math.min(50, dx * STRENGTH));
          ty = Math.max(-50, Math.min(50, dy * STRENGTH));
        } else {
          tx = 0;
          ty = 0;
        }
      };
      const onLeave = () => { tx = 0; ty = 0; };

      const tick = () => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        inner.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      window.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);
      return () => {
        window.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(raf);
      };
    }, []);

    return (
      <span ref={wrapRef} className="inline-block">
        <span ref={innerRef} className="inline-block will-change-transform">
          <Button ref={ref} {...props}>{children}</Button>
        </span>
      </span>
    );
  }
);
MagneticButton.displayName = "MagneticButton";
