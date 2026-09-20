'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';

/* Pixels per second the marquee travels. Slow enough to read a card as it
   passes, fast enough that the row is visibly alive. */
const SPEED = 34;

function VoiceCard({ item }) {
  return (
    <li className="voice" data-featured={item.featured ? 'true' : 'false'}>
      <div className="voice__top">
        <span className="voice__quote" aria-hidden="true">
          &ldquo;
        </span>
        <span className="voice__tag">
          Trader review
          <i />
        </span>
      </div>

      <h3>{item.heading}</h3>
      <blockquote>{item.quote}</blockquote>

      <div className="voice__by">
        <Image
          className="voice__avatar"
          src={item.avatar}
          alt=""
          width={96}
          height={96}
          aria-hidden="true"
        />
        <span className="voice__who">
          <b>{item.name}</b>
          <span className="voice__where">
            <Image
              className="voice__flag"
              src={`/assets/flags/${item.code}.svg`}
              alt=""
              width={24}
              height={16}
              aria-hidden="true"
            />
            {item.country}
            <i aria-hidden="true" />
            {item.role}
          </span>
        </span>
        <span className="voice__stars" aria-label={`Rated ${item.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              name={i < item.rating ? 'star' : 'star-empty'}
              size={13}
              className={i < item.rating ? 'is-on' : 'is-off'}
            />
          ))}
        </span>
      </div>
    </li>
  );
}

export default function VoicesSection() {
  const track = useRef(null);
  const [duration, setDuration] = useState(0);

  /* The row is one list rendered twice; the animation shifts it by exactly
     half its width, so the seam is invisible and the loop never jumps. The
     duration is derived from the measured width so the speed stays constant
     however many reviews are in the list. */
  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;

    const measure = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) setDuration(half / SPEED);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="band voices" aria-labelledby="voices-title">
      <div className="orbit orbit--l" aria-hidden="true" />
      <div className="orbit orbit--r" aria-hidden="true" />

      <div className="shell">
        <Reveal className="section-head">
          <p className="rule-label">
            <i />
            <span className="eyebrow">{testimonials.label}</span>
            <i />
          </p>
          <h2 className="h-lg" id="voices-title">
            {testimonials.title[0]}
            <br />
            listen <span className="tint">to them</span>
          </h2>
          <p className="lede">{testimonials.lead}</p>
        </Reveal>
      </div>

      <Reveal className="voice-marquee" delay={80}>
        <div
          ref={track}
          className="voice-track"
          style={duration ? { '--voice-duration': `${duration}s` } : undefined}
          data-running={duration ? 'true' : 'false'}
        >
          <ul className="voice-run">
            {testimonials.items.map((item) => (
              <VoiceCard key={item.id} item={item} />
            ))}
          </ul>
          <ul className="voice-run" aria-hidden="true">
            {testimonials.items.map((item) => (
              <VoiceCard key={`${item.id}-echo`} item={item} />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
