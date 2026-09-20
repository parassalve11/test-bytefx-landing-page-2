'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navigation, site } from '@/lib/content';
import Icon from './icon';
import SmartLink from './smart-link';
import ThemeToggle from './theme-toggle';

const CLOSE_DELAY = 140;
/* Hovering the nav on the way past it should not fire a mega menu. */
const OPEN_DELAY = 120;
/* Above this offset the header is always parked at the top of the page. */
const REVEAL_ZONE = 96;
/* How far the page has to travel in one direction before the header reacts.
   Hiding is cheap to undo, so it is eager; coming back is deliberate, which
   stops the bar from flying in and out over the content while reading. */
const HIDE_TRAVEL = 18;
const REVEAL_TRAVEL = 64;


export default function SiteHeader() {
  const [openId, setOpenId] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hovering, setHovering] = useState(false);
  const timer = useRef(null);
  const openTimer = useRef(null);
  /* read inside the scroll listener, which is registered once */
  const held = useRef(false);
  const openRef = useRef(null);

  /* Always parked at the top of the page. Scrolling down tucks the header
     away so it never sits on the content being read; a deliberate scroll back
     up brings it straight back. Travel is accumulated per direction, so
     trackpad jitter and momentum wobble cannot make it flicker. The bar also
     stays put whenever it is being used: pointer over it, a menu open, or the
     mobile drawer up. */
  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let travel = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;
      setCompact(y > 24);

      if (y < REVEAL_ZONE) {
        travel = 0;
        setHidden(false);
        return;
      }
      if (delta === 0) return;
      /* a change of direction starts the count again */
      travel = Math.sign(travel) === Math.sign(delta) ? travel + delta : delta;

      if (travel > HIDE_TRAVEL) {
        if (held.current) return;
        travel = 0;
        setHidden(true);
      } else if (travel < -REVEAL_TRAVEL) {
        travel = 0;
        setHidden(false);
      }
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

  /* An open menu or drawer pins the header down; closing one lets it tuck
     again on the next scroll. */
  useEffect(() => {
    openRef.current = openId;
    held.current = Boolean(openId) || drawer || hovering;
    if (held.current) setHidden(false);
  }, [openId, drawer, hovering]);

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
    const { body } = document;
    const previous = { overflow: body.style.overflow, padding: body.style.paddingRight };
    /* removing the scrollbar would otherwise shift the whole page sideways */
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.padding;
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

  const clearTimers = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  }, []);

  /* A panel only opens once the pointer has settled, so crossing the nav on
     the way to the page below never throws a menu over the content. Once one
     panel is open, switching between them is instant. */
  const hoverOpen = useCallback(
    (id) => {
      if (window.matchMedia('(max-width: 980px)').matches) return;
      clearTimers();
      if (openRef.current) {
        setOpenId(id);
        return;
      }
      openTimer.current = setTimeout(() => setOpenId(id), OPEN_DELAY);
    },
    [clearTimers],
  );

  const hoverClose = useCallback(() => {
    if (window.matchMedia('(max-width: 980px)').matches) return;
    clearTimers();
    timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  const toggle = (id) => {
    clearTimers();
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <header
      className="masthead"
      data-tucked={hidden && !drawer && !openId ? 'true' : 'false'}
      data-compact={compact ? 'true' : 'false'}
      onPointerEnter={(event) => {
        if (event.pointerType === 'touch') return;
        setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
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
