'use client';

import { useEffect, useRef } from 'react';
import './reveal.scss';

export const Reveal = ({ children, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || reducedMotion.matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.remove('reveal--pending');
      observer.unobserve(element);
    }, { threshold: 0.12 });

    // El contenido sigue visible cuando JavaScript está deshabilitado.
    element.classList.add('reveal--pending');
    observer.observe(element);

    const handlePreference = () => {
      if (reducedMotion.matches) {
        element.classList.remove('reveal--pending');
        observer.disconnect();
      }
    };
    reducedMotion.addEventListener('change', handlePreference);

    return () => {
      observer.disconnect();
      element.classList.remove('reveal--pending');
      reducedMotion.removeEventListener('change', handlePreference);
    };
  }, []);

  return <div ref={ref} className={`reveal ${className}`.trim()}>{children}</div>;
};
