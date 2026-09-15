'use client';

import { useSyncExternalStore } from 'react';
import Icon from './icon';

export const THEME_KEY = 'bytefx-theme';
const THEME_EVENT = 'bytefx-theme-change';

/* The theme lives on <html data-theme>, which is an external store as far as
   React is concerned — the inline boot script in layout.jsx sets it before the
   first render. Subscribing to it beats mirroring it into component state. */
function subscribe(onChange) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

const read = () => document.documentElement.dataset.theme || 'dark';
const readOnServer = () => 'dark';

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, readOnServer);

  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* Private mode: the switch still works for this session. */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button type="button" className="icon-btn" onClick={flip} aria-label={label} title={label}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
    </button>
  );
}
