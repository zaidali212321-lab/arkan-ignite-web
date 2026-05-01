import { useEffect, useRef } from "react";

export const useReveal = () => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.12 }
    );
    const items = el.querySelectorAll(".reveal");
    items.forEach((i) => observer.observe(i));
    return () => observer.disconnect();
  }, []);
  return ref;
};
