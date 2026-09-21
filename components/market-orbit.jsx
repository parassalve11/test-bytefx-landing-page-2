'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/* One lap every LAP ms. The icons ride a tilted ellipse around the artwork:
   on the near half of the ring they pass in front of it and grow a little, on
   the far half they slip behind it and shrink, so the orbit reads in depth.
   The tilt and the ring's size live in market-orbit.css. */
const LAP = 28000;
/* Where the ring starts, as a fraction of a lap — the resting layout for
   server render and reduced motion. */
const START = 0.06;

function orbitPosition(index, count, turn) {
  const angle = (index / count + turn) * Math.PI * 2;
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return { x, y, depth: (y + 1) / 2, side: y >= 0 ? 'front' : 'back' };
}

function orbitStyle({ x, y, depth }) {
  return { '--x': x.toFixed(4), '--y': y.toFixed(4), '--depth': depth.toFixed(4) };
}

export default function MarketOrbit({ markets }) {
  const scene = useRef(null);
  const count = markets.categories.length;

  useEffect(() => {
    const root = scene.current;
    const items = Array.from(root.querySelectorAll('.market-orbit__item'));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let turn = START;
    let frame = 0;
    let last = 0;
    let onScreen = false;

    const place = () => {
      items.forEach((item, index) => {
        const position = orbitPosition(index, count, turn);
        const style = orbitStyle(position);
        item.style.setProperty('--x', style['--x']);
        item.style.setProperty('--y', style['--y']);
        item.style.setProperty('--depth', style['--depth']);
        if (item.dataset.side !== position.side) item.dataset.side = position.side;
      });
    };

    const tick = (now) => {
      /* a long gap (tab in the background, scrolled away) resumes smoothly */
      const step = last ? Math.min(now - last, 64) : 0;
      last = now;
      turn = (turn + step / LAP) % 1;
      place();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };
    const sync = () => {
      if (onScreen && !motion.matches) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else {
        stop();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    motion.addEventListener('change', sync);

    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener('change', sync);
    };
  }, [count]);

  return (
    <div ref={scene} className="market-orbit">
      <span className="market-orbit__glow" aria-hidden="true" />
      <span className="market-orbit__ring market-orbit__ring--back" aria-hidden="true" />
      <Image
        className="market-orbit__art"
        src={markets.image}
        alt={markets.alt}
        width={1254}
        height={1254}
        sizes="(max-width: 760px) 76vw, 300px"
      />
      <span className="market-orbit__ring market-orbit__ring--front" aria-hidden="true" />
      <ul className="market-orbit__items" aria-label="Markets you can trade">
        {markets.categories.map((market, index) => {
          const position = orbitPosition(index, count, START);
          return (
            <li
              key={market.id}
              className="market-orbit__item"
              data-side={position.side}
              style={orbitStyle(position)}
            >
              <Image src={market.icon} alt={market.label} width={192} height={192} sizes="72px" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
