'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { cta } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';
import SmartLink from './smart-link';

export default function ClosingSection() {
  const section = useRef(null);

  useEffect(() => {
    const el = section.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const travel = Math.min(140, rect.width * 0.09);
      const shift = reducedMotion.matches ? 0 : (1 - progress) * travel;
      el.style.setProperty('--closing-shift', `${shift.toFixed(2)}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <section ref={section} className="closing closing--markets" id="get-started" aria-labelledby="closing-title">
      <div className="closing__scene" aria-hidden="true">
        <div className="closing__wing closing__wing--left">
          <Image src={cta.background} alt="" fill sizes="100vw" />
        </div>
        <div className="closing__wing closing__wing--right">
          <Image src={cta.background} alt="" fill sizes="100vw" />
        </div>
      </div>
      <Reveal className="closing__inner">
        <p className="eyebrow">{cta.eyebrow}</p>
        <h2 className="h-xl" id="closing-title">
          Ready to start<br /><span className="tint">trading?</span>
        </h2>
        <p className="closing__lead">{cta.lead}</p>
        <div className="closing__acts">
          <SmartLink href={cta.primary.href} className="btn btn--solid">
            {cta.primary.label}<Icon name="arrow" size={16} />
          </SmartLink>
          <SmartLink href={cta.secondary.href} className="btn btn--ghost">{cta.secondary.label}</SmartLink>
        </div>
        <ul className="closing__points">
          {cta.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </Reveal>
    </section>
  );
}
