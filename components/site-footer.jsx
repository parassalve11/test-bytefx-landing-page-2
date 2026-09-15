import Image from 'next/image';
import { footer, site } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';
import SmartLink from './smart-link';

const MARQUEE_WORDS = [
  { text: 'Discover your trading edge', icon: 'spark' },
  { text: 'Trade with ByteFX', icon: 'globe' },
  { text: 'Built for the modern trader', icon: 'shield' },
];

function MarqueeRun({ ariaHidden }) {
  return (
    <div className="marquee__run" aria-hidden={ariaHidden ? 'true' : undefined}>
      {MARQUEE_WORDS.map((word) => (
        <span key={word.text} className="marquee__word">
          <Icon name={word.icon} size={22} />
          {word.text}
        </span>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <div className="shell">
        <div className="footer__hail">
          <Reveal>
            <h2 className="h-lg" id="footer-title">
              {footer.tagline}
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              {footer.connect}
            </p>
            <ul className="socials" style={{ marginTop: 20 }}>
              {footer.socials.map((social) => (
                <li key={social.id}>
                  <SmartLink
                    href={social.href}
                    className="social"
                    aria-label={social.label}
                    title={social.href ? social.label : `${social.label} — link coming soon`}
                  >
                    <Icon name={social.id} size={17} />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <figure>
            <Image
              src="/assets/generated/bitcoin-sculpture.png"
              alt=""
              width={1402}
              height={1122}
              aria-hidden="true"
            />
          </figure>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee__track">
          <MarqueeRun />
          <MarqueeRun ariaHidden />
        </div>
      </div>

      <div className="shell">
        <div className="footer__grid">
          <div className="footer__brand">
            <Image src="/assets/logo/bytefx.png" alt={site.name} width={384} height={82} />
            <p className="lede" style={{ fontSize: 13, maxWidth: '38ch' }}>
              A global broker built on transparency, technology and long-term success.
            </p>

            <div className="direct">
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" size={16} />
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`}>
                <Icon name="phone" size={16} />
                {site.phone}
              </a>
            </div>
          </div>

          {footer.columns.map((column) => (
            <div key={column.heading} className="footer__col">
              <h4>{column.heading}</h4>
              <ul data-wide={column.links.length > 6 ? 'true' : 'false'}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink href={link.href}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <dl className="facts">
          <div>
            <Icon name="pin" size={17} />
            <div>
              <dt>Registered address</dt>
              <dd>{site.registeredAddress}</dd>
            </div>
          </div>
          <div>
            <Icon name="globe" size={17} />
            <div>
              <dt>Physical address</dt>
              <dd>{site.physicalAddress}</dd>
            </div>
          </div>
          <div>
            <Icon name="badge" size={17} />
            <div>
              <dt>Registration no.</dt>
              <dd>{site.registrationNumber}</dd>
            </div>
          </div>
          <div>
            <Icon name="phone" size={17} />
            <div>
              <dt>Global support</dt>
              <dd>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </dd>
            </div>
          </div>
          <div>
            <Icon name="mail" size={17} />
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
          </div>
        </dl>

        <div className="disclosures">
          {footer.legal.map((block) => (
            <div key={block.heading}>
              <h5>{block.heading}</h5>
              <p>{block.body}</p>
            </div>
          ))}
        </div>

        <div className="colophon">
          <p>{footer.copyright}</p>
          <ul>
            {footer.policies.map((policy) => (
              <li key={policy.label}>
                <SmartLink href={policy.href}>{policy.label}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
