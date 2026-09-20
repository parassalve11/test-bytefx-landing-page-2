'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * The wallpaper behind the platforms tile.
 *
 * The artwork is a cut-out on a transparent background, so instead of sitting
 * flat it tracks the pointer: the scene drifts against the cursor and a soft
 * light follows it across the tile. Coarse pointers and reduced-motion
 * preferences get the still image.
 */
export default function PlatformWallpaper({ src, alt }) {
  const visual = useRef(null);

  useEffect(() => {
    const element = visual.current;
    const tile = element.closest('.t-platforms');
    if (!tile) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      tile.style.removeProperty('--wall-x');
      tile.style.removeProperty('--wall-y');
      tile.style.removeProperty('--beam-x');
      tile.style.removeProperty('--beam-y');
      tile.dataset.tracking = 'false';
    };

    const move = (event) => {
      if (motion.matches || !pointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = tile.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
        /* -0.5 … 0.5, so the CSS can decide how far each layer travels */
        tile.style.setProperty('--wall-x', x - 0.5);
        tile.style.setProperty('--wall-y', y - 0.5);
        tile.style.setProperty('--beam-x', `${x * 100}%`);
        tile.style.setProperty('--beam-y', `${y * 100}%`);
        tile.dataset.tracking = 'true';
      });
    };

    tile.addEventListener('pointermove', move, { passive: true });
    tile.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    return () => {
      reset();
      tile.removeEventListener('pointermove', move);
      tile.removeEventListener('pointerleave', reset);
      motion.removeEventListener('change', reset);
    };
  }, []);

  return (
    <div ref={visual} className="t-platforms__visual" aria-hidden="true">
      <span className="t-platforms__beam" />
      <Image
        className="t-platforms__wallpaper"
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 130vw, (max-width: 1180px) 78vw, 620px"
      />
    </div>
  );
}
