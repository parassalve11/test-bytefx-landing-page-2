'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * One shared, rAF-throttled sweep drives every reveal on the page.
 *
 * An IntersectionObserver only fires when an intersection threshold is crossed,
 * so an element that travels from below the fold to above it between two ticks
 * — a fast flick, a jump to an anchor, a restored scroll position — never gets
 * a callback and stays invisible forever. A plain position check cannot miss.
 */
const waiting = new Set();
let queued = false;
let bound = false;

function sweep() {
  queued = false;
  const limit = window.innerHeight * 0.9;

  for (const item of waiting) {
    if (!item.el.isConnected || item.el.getBoundingClientRect().top < limit) {
      item.show();
      waiting.delete(item);
    }
  }

  if (waiting.size === 0) unbind();
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(sweep);
}

function bind() {
  if (bound) return;
  bound = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

function unbind() {
  if (!bound) return;
  bound = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
}

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const node = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = node.current;
    if (!el) return undefined;

    const item = { el, show: () => setShown(true) };
    waiting.add(item);
    bind();
    schedule();

    return () => {
      waiting.delete(item);
      if (waiting.size === 0) unbind();
    };
  }, []);

  return (
    <Tag
      ref={node}
      className={`reveal ${className}`.trim()}
      data-shown={shown ? 'true' : 'false'}
      style={delay ? { '--delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
