'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function SpotlightHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (reduceMotion || !canHover) return;

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          el.style.setProperty('--mx', `${pendingX}px`);
          el.style.setProperty('--my', `${pendingY}px`);
          rafId = 0;
        });
      }
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className="spotlight-hero">
      <div className="spotlight-hero__glow" aria-hidden="true" />
      <div className="spotlight-hero__content">{children}</div>
    </div>
  );
}
