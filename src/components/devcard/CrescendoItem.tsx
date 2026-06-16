'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface CrescendoItemProps {
  children: ReactNode;
  index: number;
}

export function CrescendoItem({ children, index }: CrescendoItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`crescendo${visible ? ' crescendo--visible' : ''}`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
