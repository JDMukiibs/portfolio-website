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
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${pendingX - rect.left}px`);
          el.style.setProperty('--my', `${pendingY - rect.top}px`);
          rafId = 0;
        });
      }
    };

    const handleLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
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
