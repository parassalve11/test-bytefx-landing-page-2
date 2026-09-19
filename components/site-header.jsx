'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navigation, site } from '@/lib/content';
import Icon from './icon';
import SmartLink from './smart-link';
import ThemeToggle from './theme-toggle';

const CLOSE_DELAY = 140;
const REVEAL_ZONE = 96;
const SCROLL_TOLERANCE = 6;


export default function SiteHeader() {
  const [openId, setOpenId] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const timer = useRef(null);

  /* Always visible at the top of the page. Scrolling down tucks the header
     away; any scroll back up brings it straight back. Small movements are
     accumulated so trackpad jitter never makes it flicker. */
  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      setCompact(y > 24);

      if (y < REVEAL_ZONE) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (Math.abs(delta) < SCROLL_TOLERANCE) return;

      if (delta > 0) {
        setHidden(true);
        setOpenId(null);
      } else {
        setHidden(false);
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* --- desktop breakpoint resets ---------------------------------------- */
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 981px)');
    const sync = () => {
      if (wide.matches) setDrawer(false);
      setOpenId(null);
    };
    wide.addEventListener('change', sync);
    return () => wide.removeEventListener('change', sync);
  }, []);

  /* --- the page should not scroll behind an open drawer ------------------ */
  useEffect(() => {
    if (!drawer) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawer]);

  /* --- escape closes everything ----------------------------------------- */
  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setOpenId(null);
      setDrawer(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const hoverOpen = useCallback((id) => {
    if (window.matchMedia('(max-width: 980px)').matches) return;
    clearTimer();
    setOpenId(id);
  }, []);

  const hoverClose = useCallback(() => {
    if (window.matchMedia('(max-width: 980px)').matches) return;
    clearTimer();
    timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  }, []);

  useEffect(() => clearTimer, []);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <header
      className="masthead"
      data-tucked={hidden && !drawer ? 'true' : 'false'}
      data-compact={compact ? 'true' : 'false'}
    >
      <div className="shell">
        <div className="masthead__inner">
          <SmartLink href="#top" className="masthead__mark" aria-label={`${site.name} home`}>
            <Image src="/assets/logo/bytefx.png" alt={site.name} width={384} height={82} priority />
          </SmartLink>

          <nav
            id="primary-navigation"
            className="nav"
            data-open={drawer ? 'true' : 'false'}
            aria-label="Primary"
          >
            {navigation.map((entry) =>
              entry.groups ? (
                <div
                  key={entry.id}
                  className="nav__item"
                  onMouseEnter={() => hoverOpen(entry.id)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    className="nav__trigger"
                    aria-expanded={openId === entry.id}
                    aria-controls={`menu-${entry.id}`}
                    onClick={() => toggle(entry.id)}
                  >
                    {entry.label}
                    <Icon name="caret" size={14} className="caret" />
                  </button>

                  <div
                    id={`menu-${entry.id}`}
                    className="mega"
                    data-width={entry.width}
                    data-open={openId === entry.id ? 'true' : 'false'}
                    inert={openId !== entry.id}
                  >
                    <div className="mega__cols">
                      {entry.groups.map((group) => (
                        <div key={group.heading}>
                          <p className="mega__heading">{group.heading}</p>
                          <ul>
                            {group.items.map((item) => (
                              <li key={item.label}>
                                <SmartLink
                                  href={item.href}
                                  className="mega__link"
                                  onClick={() => {
                                    setOpenId(null);
                                    setDrawer(false);
                                  }}
                                >
                                  <b>{item.label}</b>
                                  {item.note ? <span>{item.note}</span> : null}
                                </SmartLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {entry.feature ? (
                      <SmartLink href={entry.feature.href} className="mega__feature">
                        <figure>
                          <Image
                            src={entry.feature.image}
                            alt={entry.feature.alt}
                            width={640}
                            height={480}
                          />
                        </figure>
                        <div>
                          <b>
                            {entry.feature.title}
                            <Icon name="chevron" size={15} />
                          </b>
                          <span>{entry.feature.note}</span>
                        </div>
                      </SmartLink>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div key={entry.id} className="nav__item">
                  <SmartLink
                    href={entry.href}
                    className="nav__trigger"
                    onClick={() => setDrawer(false)}
                  >
                    {entry.label}
                  </SmartLink>
                </div>
              ),
            )}
          </nav>

          <div className="tools">
            <div
              className="nav__item"
              onMouseEnter={() => hoverOpen('app')}
              onMouseLeave={hoverClose}
            >
              <button
                type="button"
                className="icon-btn"
                aria-expanded={openId === 'app'}
                aria-controls="menu-app"
                aria-label="Get the ByteFX mobile app"
                onClick={() => toggle('app')}
              >
                <Icon name="qr" size={17} />
              </button>

              <div
                id="menu-app"
                className="qr-pop"
                data-open={openId === 'app' ? 'true' : 'false'}
                inert={openId !== 'app'}
              >
                <p className="h-sm">Trade on mobile</p>
                <p className="lede" style={{ fontSize: 13, marginTop: 6 }}>
                  {site.mobileAppUrl ? `Scan to install the ${site.name} app.` : 'The ByteFX mobile app is on its way.'}
                </p>
                {site.mobileAppUrl ? (
                  <div className="qr-frame">
                    <Image src="/app-qr.png" alt="Scan to download the ByteFX app" width={392} height={392} unoptimized />
                  </div>
                ) : (
                  <p className="qr-coming-soon">App download coming soon</p>
                )}
                {site.mobileAppUrl ? (
                  <SmartLink href={site.mobileAppUrl} className="btn btn--sm btn--ghost">
                    Get it on Google Play
                  </SmartLink>
                ) : (
                  null
                )}
              </div>
            </div>

            <ThemeToggle />

            <SmartLink href={null} className="btn btn--solid btn--sm masthead__cta">
              Open live account
            </SmartLink>

            <button
              type="button"
              className="burger"
              aria-expanded={drawer}
              aria-controls="primary-navigation"
              aria-label={drawer ? 'Close menu' : 'Open menu'}
              onClick={() => {
                setDrawer((open) => !open);
                setOpenId(null);
              }}
            >
              <i />
              <i />
              <i />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
