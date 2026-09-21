'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/* Trade global card: the market line-up floats gently, and on desktop it tilts
   a few degrees toward the mouse anywhere over the card. Touch screens get the
   float only; reduced motion keeps it still (market-showcase.css). */
export default function MarketShowcase({ markets }) {
  const stage = useRef(null);

  useEffect(() => {
    const el = stage.current;
    const card = el.closest('.tile') ?? el;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;

    const move = (event) => {
      if (!fine.matches || event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--tilt-x', x.toFixed(3));
        el.style.setProperty('--tilt-y', y.toFixed(3));
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--tilt-x', '0');
      el.style.setProperty('--tilt-y', '0');
    };

    card.addEventListener('pointermove', move, { passive: true });
    card.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <div ref={stage} className="market-showcase">
      <span className="market-showcase__glow" aria-hidden="true" />
      <div className="market-showcase__float">
        <Image
          className="market-showcase__art"
          src={markets.image}
          alt={markets.alt}
          width={markets.width}
          height={markets.height}
          sizes="(max-width: 760px) 86vw, (max-width: 1180px) 44vw, 360px"
        />
      </div>
    </div>
  );
}
