'use client';

import Image from 'next/image';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { hero } from '@/lib/content';
import Icon from './icon';

/* ------------------------------------------------------------------ track state
   Every slide sits on a horizontal track at an integer offset from the active
   one: 0 is on screen, -1 and +1 wait just outside it, and anything further is
   parked. Slides that only move off screen "snap" (no transition) so nothing
   ever sweeps across the viewport on its way to a new parking spot. */

const SETTLE_MS = 1100;

function naturalOffsets(count, active) {
  return Array.from({ length: count }, (_, index) => {
    let offset = (index - active + count) % count;
    if (offset > count / 2) offset -= count;
    return offset;
  });
}

function commit(state, target, dir) {
  const offsets = naturalOffsets(state.count, target);
  offsets[state.active] = -dir;
  return {
    ...state,
    active: target,
    offsets,
    snap: offsets.map((_, index) => index !== target && index !== state.active),
    pending: null,
    settling: true,
  };
}

function reducer(state, action) {
  const { count } = state;

  if (action.type === 'go' || action.type === 'step') {
    if (state.pending) return state;
    const target = action.type === 'step'
      ? (state.active + action.dir + count) % count
      : (action.index + count) % count;
    if (target === state.active) return state;

    const natural = naturalOffsets(count, state.active)[target];
    const dir = action.type === 'step' ? action.dir : natural < 0 ? -1 : 1;
    if (state.offsets[target] === dir) return commit(state, target, dir);

    /* A jump of two or more: stage the target beside the viewport first. */
    const offsets = state.offsets.slice();
    offsets[target] = dir;
    const snap = state.snap.slice();
    snap[target] = true;
    return { ...state, offsets, snap, pending: { target, dir } };
  }

  if (action.type === 'commit') {
    return state.pending ? commit(state, state.pending.target, state.pending.dir) : state;
  }

  if (action.type === 'settle') {
    return { ...state, offsets: naturalOffsets(count, state.active), snap: Array(count).fill(true), settling: false };
  }

  if (action.type === 'unsnap') {
    return state.snap.some(Boolean) ? { ...state, snap: Array(count).fill(false) } : state;
  }

  return state;
}

function initState(count) {
  return { count, active: 0, offsets: naturalOffsets(count, 0), snap: Array(count).fill(false), pending: null, settling: false };
}

/* ------------------------------------------------------------------ small parts */

const pad = (value) => String(value).padStart(2, '0');

function Words({ text, start }) {
  return text.split(' ').map((word, index) => (
    <span key={`${word}-${index}`}>
      {index > 0 ? ' ' : null}
      <span className="hs-word" style={{ '--i': start + index }}>
        <span>{word}</span>
      </span>
    </span>
  ));
}

/* Recreates object-fit: cover in a box that has the artwork's own proportions,
   so effects placed in percentages stay pinned to features of the picture. */
function CoverArt({ art, preload, children }) {
  const focus = art.focus ?? { x: 0.5, y: 0.5 };
  const mobile = art.mobileFocus ?? focus;
  return (
    <div
      className="hs-cover"
      style={{
        '--ar': art.width / art.height,
        '--fx': focus.x,
        '--fy': focus.y,
        '--fx-m': mobile.x,
        '--fy-m': mobile.y,
        '--zoom': art.zoom ?? 1,
      }}
    >
      <div className="hs-cover__frame">
        <Image src={art.src} alt="" fill sizes="(max-width: 760px) 260vw, 120vw" priority={preload} loading={preload ? undefined : 'eager'} draggable={false} />
        {children}
      </div>
    </div>
  );
}

function PosterArt({ art, preload }) {
  return (
    <div className="hs-poster" style={{ '--ar': art.width / art.height }}>
      <Image className="hs-poster__ambient" src={art.ambient} alt="" fill sizes="40vw" priority={preload} draggable={false} />
      <div className="hs-poster__frame">
        <Image src={art.src} alt="" fill sizes="(max-width: 760px) 100vw, 70vh" priority={preload} loading={preload ? undefined : 'eager'} draggable={false} />
      </div>
    </div>
  );
}

/* Anchored to the cat artwork: a lens glint and sound from the headphones. */
function CatScene() {
  return (
    <div className="cat-fx" aria-hidden="true">
      <span className="cat-fx__glint" />
      <span className="cat-fx__waves"><i /><i /><i /></span>
    </div>
  );
}

/* Reflections follow the bullion faces inside the artwork's own coordinate box. */
function MetalsScene() {
  return (
    <div className="metals-fx" aria-hidden="true">
      <span className="metals-fx__face metals-fx__face--gold" />
      <span className="metals-fx__face metals-fx__face--silver" />
      <span className="metals-fx__face metals-fx__face--front" />
      <span className="metals-fx__glint" style={{ '--x': '65.8%', '--y': '12.8%', '--delay': '0s' }} />
      <span className="metals-fx__glint" style={{ '--x': '84.7%', '--y': '4.2%', '--delay': '1.8s' }} />
      <span className="metals-fx__glint" style={{ '--x': '79.4%', '--y': '76.8%', '--delay': '3.4s' }} />
    </div>
  );
}

function ChillFeed({ items }) {
  return (
    <ul className="chill-feed" aria-hidden="true">
      {items.map((item, index) => (
        <li key={item.title} style={{ '--n': index }}>
          <span className="chill-feed__icon">
            {item.icon === 'eq' ? (
              <span className="chill-feed__eq"><i /><i /><i /><i /></span>
            ) : (
              <Icon name={item.icon} size={16} />
            )}
          </span>
          <span className="chill-feed__text">
            <b>{item.title}</b>
            <small>{item.note}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* Fixed values keep the server and client markup identical. */
const RAIN = [
  [3, 22, 3.4, -0.2, 1, 0.5], [9, 34, 4.6, -2.1, 2, 0.75], [14, 18, 3.1, -1.4, 1, 0.45],
  [21, 28, 5.2, -3.3, 1, 0.6], [27, 40, 4.1, -0.9, 2, 0.8], [34, 20, 3.7, -2.6, 1, 0.4],
  [41, 30, 5.6, -4.4, 1, 0.55], [47, 44, 4.4, -1.7, 2, 0.9], [53, 24, 3.3, -0.6, 1, 0.5],
  [59, 36, 5.0, -3.8, 2, 0.75], [65, 18, 3.9, -2.2, 1, 0.45], [71, 32, 4.8, -0.4, 1, 0.65],
  [77, 26, 3.5, -1.1, 2, 0.7], [84, 38, 5.4, -4.9, 1, 0.55], [90, 20, 3.8, -2.9, 1, 0.5],
  [96, 30, 4.3, -1.5, 2, 0.7],
];

function RainScene() {
  return (
    <div className="hs-rain" aria-hidden="true">
      {RAIN.map(([x, h, d, delay, w, o]) => (
        <i key={x} style={{ '--x': `${x}%`, '--h': `${h}%`, '--d': `${d}s`, '--delay': `${delay}s`, '--w': `${w}px`, '--o': o }} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ hero */

export default function HeroSlot() {
  const slides = hero.slides;
  const count = slides.length;
  const [state, dispatch] = useReducer(reducer, count, initState);
  const { active } = state;

  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [controlsHovered, setControlsHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  /* The slideshow always advances every hero.interval (8 s). It only holds
     while someone is using it — keyboard focus inside, the pointer on the
     slide tabs/arrows, or mid-swipe — and while it is off screen or the tab
     is in the background, so nobody returns to a slide they never saw. */
  const playing = !keyboardFocus && !controlsHovered && !dragging && visible && pageVisible;

  const root = useRef(null);
  const elapsed = useRef(0);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const pointer = useRef({ frame: 0 });

  const go = useCallback((index) => dispatch({ type: 'go', index }), []);
  const step = useCallback((dir) => dispatch({ type: 'step', dir }), []);

  /* --- staged jumps and settling ------------------------------------------ */
  useEffect(() => {
    if (!state.pending) return undefined;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => dispatch({ type: 'commit' }));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [state.pending]);

  useEffect(() => {
    if (!state.settling) return undefined;
    const timer = window.setTimeout(() => dispatch({ type: 'settle' }), SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [state.settling, active]);

  /* --- visibility --------------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(root.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  /* --- autoplay: an rAF clock, so pausing and resuming keeps its place ---- */
  useEffect(() => {
    elapsed.current = 0;
    root.current?.style.setProperty('--progress', '0');
  }, [active]);

  useEffect(() => {
    if (!playing) return undefined;
    let frame = 0;
    let last = performance.now();
    const tick = (now) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      const progress = Math.min(elapsed.current / hero.interval, 1);
      root.current?.style.setProperty('--progress', progress.toFixed(4));
      if (progress >= 1) {
        elapsed.current = 0;
        dispatch({ type: 'step', dir: 1 });
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, active]);

  /* --- horizontal trackpad swipes: one gesture, one slide ------------------ */
  useEffect(() => {
    const el = root.current;
    let lockedUntil = 0;
    const onWheel = (event) => {
      if (Math.abs(event.deltaX) < 8 || Math.abs(event.deltaX) < Math.abs(event.deltaY) * 1.2) return;
      event.preventDefault();
      const now = performance.now();
      const locked = now < lockedUntil;
      lockedUntil = now + 450;
      if (locked) return;
      lockedUntil = now + 900;
      dispatch({ type: 'step', dir: event.deltaX > 0 ? 1 : -1 });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  /* --- pointer: a gentle parallax on the artwork, and swipe ----------------- */
  function flushPointer() {
    const p = pointer.current;
    const el = root.current;
    p.frame = 0;
    if (!el) return;
    el.style.setProperty('--mx', ((p.x / p.w) * 2 - 1).toFixed(3));
    el.style.setProperty('--my', ((p.y / p.h) * 2 - 1).toFixed(3));
  }

  function trackPointer(event) {
    if (event.pointerType !== 'mouse') return;
    const rect = root.current.getBoundingClientRect();
    const p = pointer.current;
    p.x = event.clientX - rect.left;
    p.y = event.clientY - rect.top;
    p.w = rect.width;
    p.h = rect.height;
    if (!p.frame) p.frame = requestAnimationFrame(flushPointer);
  }

  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target.closest('.hs-rail')) return;
    const now = performance.now();
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      width: root.current.offsetWidth,
      engaged: false,
      dx: 0,
      v: 0,
      lastX: event.clientX,
      lastT: now,
    };
    root.current.dataset.pressed = 'true';
  }

  function onPointerMove(event) {
    trackPointer(event);
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;

    if (!d.engaged) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current = null;
        delete root.current.dataset.pressed;
        return;
      }
      d.engaged = true;
      root.current.setPointerCapture(event.pointerId);
      dispatch({ type: 'unsnap' });
      setDragging(true);
    }

    const now = performance.now();
    d.v = (event.clientX - d.lastX) / Math.max(1, now - d.lastT);
    d.lastX = event.clientX;
    d.lastT = now;
    d.dx = dx;
    root.current.style.setProperty('--drag', (dx / d.width).toFixed(4));
  }

  function endDrag(event, cancelled = false) {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    delete root.current.dataset.pressed;
    if (!d.engaged) return;

    if (root.current.hasPointerCapture(event.pointerId)) root.current.releasePointerCapture(event.pointerId);
    suppressClick.current = true;
    window.setTimeout(() => { suppressClick.current = false; }, 0);

    const velocity = performance.now() - d.lastT > 90 ? 0 : d.v;
    const threshold = Math.min(150, d.width * 0.14);
    let dir = 0;
    if (!cancelled) {
      if (d.dx < -threshold || velocity < -0.45) dir = 1;
      else if (d.dx > threshold || velocity > 0.45) dir = -1;
    }

    root.current.style.setProperty('--drag', '0');
    setDragging(false);
    if (dir) dispatch({ type: 'step', dir });
  }

  function onPointerLeave(event) {
    if (event.pointerType !== 'mouse') return;
    const el = root.current;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  }

  function onKeys(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') go(0);
    else if (event.key === 'End') go(count - 1);
    else step(event.key === 'ArrowRight' ? 1 : -1);
  }

  const current = slides[active];

  return (
    <section
      ref={root}
      className="hero-slider"
      id="top"
      aria-label="ByteFX highlights"
      aria-roledescription="carousel"
      data-dragging={dragging ? 'true' : undefined}
      data-tone={current.tone ?? 'lime'}
      onKeyDown={onKeys}
      onFocusCapture={(event) => { if (event.target.matches(':focus-visible')) setKeyboardFocus(true); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(event) => endDrag(event)}
      onPointerCancel={(event) => endDrag(event, true)}
      onPointerLeave={onPointerLeave}
      onClickCapture={(event) => {
        if (!suppressClick.current) return;
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className="hs-track" aria-live={playing ? 'off' : 'polite'} aria-atomic="false">
        {slides.map((slide, index) => {
          const Heading = index === 0 ? 'h1' : 'h2';
          const offset = state.offsets[index];
          const isActive = index === active;
          const titleWords = slide.title.split(' ').length;
          return (
            <article
              key={slide.id}
              id={`hero-slide-${index}`}
              className="hs-slide"
              data-layout={slide.layout}
              data-scene={slide.scene}
              data-tone={slide.tone ?? 'lime'}
              data-active={isActive ? 'true' : 'false'}
              data-snap={state.snap[index] ? 'true' : 'false'}
              data-parked={Math.abs(offset) > 1 ? 'true' : 'false'}
              style={{ '--offset': offset, zIndex: isActive ? 2 : 1 }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${slide.label}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <div className="hs-art">
                <div className="hs-art__drift">
                  <div className="hs-art__zoom">
                    {slide.layout === 'poster' ? (
                      <PosterArt art={slide.art} preload={index === 0} />
                    ) : (
                      <CoverArt art={slide.art} preload={index === 0}>
                        {slide.scene === 'cat' ? <CatScene /> : null}
                        {slide.scene === 'metals' ? <MetalsScene /> : null}
                      </CoverArt>
                    )}
                  </div>
                </div>
              </div>

              {slide.scene === 'rain' ? <RainScene /> : null}
              <div className="hs-shade" />
              {slide.feed ? <ChillFeed items={slide.feed} /> : null}

              <div className="shell hs-layout">
                <div className="hs-copy">
                  <p className="hs-eyebrow"><span aria-hidden="true" />{slide.eyebrow}</p>
                  <Heading className="hs-title">
                    <span className="hs-line"><Words text={slide.title} start={0} /></span>{' '}
                    <span className="hs-line hs-line--accent"><Words text={slide.accent} start={titleWords} /></span>
                  </Heading>
                  <p className="hs-body">{slide.body}</p>
                  <div className="hs-actions">
                    <a className="hs-primary" href={slide.primary.href} draggable={false}>
                      {slide.primary.label}
                      <Icon name="arrow" size={17} />
                    </a>
                    <a className="hs-secondary" href={slide.secondary.href} draggable={false}>
                      {slide.secondary.label}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div
        className="shell hs-rail"
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') setControlsHovered(true); }}
        onPointerLeave={() => setControlsHovered(false)}
      >
        <p className="hs-counter" aria-hidden="true">
          <b>{pad(active + 1)}</b>
          <span>/ {pad(count)}</span>
        </p>

        <div className="hs-tabs" role="group" aria-label="Choose a slide" style={{ '--count': count }}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className="hs-tab"
              aria-controls={`hero-slide-${index}`}
              aria-current={index === active ? 'true' : undefined}
              aria-label={`Slide ${index + 1}: ${slide.label}`}
              onClick={() => go(index)}
            >
              <span className="hs-tab__label">{slide.label}</span>
              <span className="hs-tab__track"><i /></span>
            </button>
          ))}
        </div>

        <div className="hs-controls">
          <button className="hs-round" type="button" aria-label="Previous slide" onClick={() => step(-1)}>
            <Icon name="back" size={16} />
          </button>
          <button className="hs-round" type="button" aria-label="Next slide" onClick={() => step(1)}>
            <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
