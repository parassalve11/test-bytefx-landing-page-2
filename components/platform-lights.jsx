'use client';

import { useEffect, useRef } from 'react';

const trails = Array.from({ length: 17 }, (_, index) => ({
  '--trail-x': `${index * 6.25}%`,
  '--trail-top': `${Math.round(12 + Math.sin(index * 1.7) * 8)}%`,
  '--trail-height': `${64 + (index * 7) % 25}%`,
  '--trail-opacity': 0.25 + (index % 5) * 0.14,
  '--trail-delay': `${index * 65}ms`,
}));

export default function PlatformLights() {
  const lights = useRef(null);

  useEffect(() => {
    const element = lights.current;
    const section = element.closest('section');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.removeProperty('--light-shift');
      element.style.removeProperty('--light-lift');
      element.style.removeProperty('--light-position');
    };
    const move = (event) => {
      if (motion.matches || !pointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
        element.style.setProperty('--light-shift', `${(x - 0.5) * 24}px`);
        element.style.setProperty('--light-lift', `${(y - 0.5) * 12}px`);
        element.style.setProperty('--light-position', `${30 + x * 40}%`);
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.illuminated = 'true';
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(section);
    section.addEventListener('pointermove', move, { passive: true });
    section.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    return () => {
      reset();
      observer.disconnect();
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', reset);
      motion.removeEventListener('change', reset);
    };
  }, []);

  return (
    <div ref={lights} className="platform-lights" aria-hidden="true">
      {['left', 'center', 'right'].map(group => (
        <div className={`platform-lights__group platform-lights__group--${group}`} key={group}>
          {trails.map((style, index) => <span className="platform-lights__trail" style={style} key={index} />)}
        </div>
      ))}
    </div>
  );
}
