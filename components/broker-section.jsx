'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { broker } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';
import SmartLink from './smart-link';

export default function BrokerSection() {
  const rail = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [overflows, setOverflows] = useState(false);

  const readEdges = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflows(max > 12);
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    readEdges();
    const el = rail.current;
    if (!el) return undefined;
    el.addEventListener('scroll', readEdges, { passive: true });
    window.addEventListener('resize', readEdges);
    return () => {
      el.removeEventListener('scroll', readEdges);
      window.removeEventListener('resize', readEdges);
    };
  }, [readEdges]);

  const step = (direction) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('.stat');
    const width = card ? card.getBoundingClientRect().width + 16 : 260;
    el.scrollBy({ left: direction * width, behavior: 'smooth' });
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'touch') return; // native momentum is better
    const el = rail.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
    };
    setDragging(true);
    el.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!drag.current.active) return;
    const el = rail.current;
    if (!el) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta);
    el.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = (event) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    rail.current?.releasePointerCapture?.(event.pointerId);
  };

  return (
    <section className="band broker-section" id="broker" aria-labelledby="broker-title">
      <div className="shell">
        <Reveal className="section-head">
          <span className="chip">{broker.label}</span>
          <h2 className="h-lg" id="broker-title">
            Trade with a <span className="tint">global broker</span>
          </h2>
          <p className="lede">{broker.lead}</p>
        </Reveal>
      </div>

      <Reveal className="rail-wrap" delay={80}>
        <ul
          ref={rail}
          className="rail"
          data-dragging={dragging ? 'true' : 'false'}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onDragStart={(event) => event.preventDefault()}
        >
          {broker.cards.map((card) => (
            <li key={card.id} className="stat">
              <h3>{card.title}</h3>

              <figure>
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={1254}
                  height={1254}
                  draggable={false}
                />
              </figure>

              <p className="stat__value">{card.value}</p>
              <p className="stat__note">{card.note}</p>

              <SmartLink
                href={card.href}
                className="stat__go"
                aria-label={`More about ${card.title.toLowerCase()}`}
                onClick={(event) => {
                  if (drag.current.moved > 6) event.preventDefault();
                }}
              >
                <Icon name="arrow" size={16} />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="shell">
        <div className="rail-hint" hidden={!overflows}>
          <Icon name="drag" size={17} />
          <span>Drag to explore</span>
          <div className="rail-nav">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={edges.start}
              aria-label="Previous"
            >
              <Icon name="back" size={16} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={edges.end}
              aria-label="Next"
            >
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
