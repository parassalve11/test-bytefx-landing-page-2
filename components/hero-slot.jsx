'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { hero } from '@/lib/content';
import Icon from './icon';

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(callback) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => true;

export default function HeroSlot() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);
  const root = useRef(null);
  const touch = useRef(null);
  const playing = !paused && !hovered && visible && pageVisible && !reduced;
  const count = hero.slides.length;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(root.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % count), hero.interval);
    return () => window.clearTimeout(timer);
  }, [active, playing, count]);

  function select(index) {
    setPaused(true);
    setActive((index + count) % count);
  }

  function onKeys(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    select(event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : active + (event.key === 'ArrowRight' ? 1 : -1));
  }

  return (
    <section ref={root} className="hero-slider" id="top" aria-label="ByteFX highlights" aria-roledescription="carousel"
      style={{ '--slide-duration': `${hero.interval}ms` }} onKeyDown={onKeys}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => { if (!event.target.closest('[data-rotation]')) setPaused(true); }}
      onTouchStart={(event) => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={(event) => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1));
        touch.current = null;
      }} onTouchCancel={() => { touch.current = null; }}>
      <div className="hero-slider__slides" aria-live={playing ? 'off' : 'polite'} aria-atomic="false">
        {hero.slides.map((slide, index) => {
          const Heading = index === 0 ? 'h1' : 'h2';
          return (
            <article key={slide.id} id={`hero-slide-${index}`} className="hero-slide" data-active={index === active}
              aria-roledescription="slide" aria-label={`${index + 1} of ${count}: ${slide.label}`}
              aria-hidden={index !== active} inert={index !== active}>
              <div className="hero-slide__art">
                <Image src={slide.image} alt="" fill sizes="100vw" priority={index === 0} loading={index === 0 ? undefined : 'eager'} />
              </div>
              <div className="hero-slide__shade" />
              <div className="shell hero-slide__layout">
                <div className="hero-slide__copy">
                  <p className="hero-slide__eyebrow"><span />{slide.eyebrow}</p>
                  <Heading>{slide.title}<br /><span>{slide.accent}</span></Heading>
                  <p className="hero-slide__description">{slide.body}</p>
                  <div className="hero-slide__actions">
                    <a className="hero-slide__primary" href={slide.primary.href}>{slide.primary.label}<Icon name="arrow" size={18} /></a>
                    <a className="hero-slide__secondary" href={slide.secondary.href}>{slide.secondary.label}<span aria-hidden="true">&#8599;</span></a>
                  </div>
                </div>
              </div>
              <p className="hero-slide__detail" aria-hidden="true">{slide.detail}</p>
            </article>
          );
        })}
      </div>
      <div className="shell hero-slider__footer">
        <a className="hero-slider__scroll" href="#broker"><span aria-hidden="true">&#8595;</span>Discover your trading edge</a>
        <div className="hero-slider__navigation" aria-label="Slide controls">
          <button className="hero-slider__round hero-slider__rotation" data-rotation type="button" aria-label={paused || reduced ? 'Play slideshow' : 'Pause slideshow'}
            disabled={reduced} onClick={() => setPaused((value) => !value)} title={reduced ? 'Autoplay disabled by your reduced-motion preference' : undefined}>
            <span className={paused || reduced ? 'hero-slider__play' : 'hero-slider__pause'} aria-hidden="true" />
          </button>
          <button className="hero-slider__round" type="button" aria-label="Previous slide" onClick={() => select(active - 1)}><Icon name="back" size={16} /></button>
          <div className="hero-slider__pages">
            {hero.slides.map((slide, index) => (
              <button key={slide.id} type="button" aria-label={`Show slide ${index + 1}: ${slide.label}`} aria-current={active === index ? 'true' : undefined}
                aria-controls={`hero-slide-${index}`} onClick={() => select(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="hero-slider__track" aria-hidden="true"><i key={`${active}-${playing}`} data-playing={playing && index === active} /></span>
              </button>
            ))}
          </div>
          <button className="hero-slider__round" type="button" aria-label="Next slide" onClick={() => select(active + 1)}><Icon name="arrow" size={16} /></button>
        </div>
      </div>
    </section>
  );
}
