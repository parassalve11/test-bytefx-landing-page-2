import Image from 'next/image';
import { bento } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';
import SmartLink from './smart-link';

export default function BentoSection() {
  const { markets, platforms, refer, partner } = bento;

  return (
    <section className="band" id="markets" aria-label="What you can trade">
      <div className="shell">
        <div className="bento">
          {/* markets */}
          <Reveal as="article" className="tile t-markets">
            <div className="t-markets__head">
              <p className="eyebrow">{markets.eyebrow}</p>
              <h2 className="h-md">
                Access <span className="tint">150+</span> tradable instruments
              </h2>
              <p className="lede">{markets.body}</p>
            </div>

            <figure>
              <Image
                className="tile__art"
                src={markets.image}
                alt={markets.alt}
                width={1254}
                height={1254}
              />
            </figure>

            <ul>
              {markets.links.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href}>
                    {link.label}
                    <Icon name="chevron" size={14} />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* platforms */}
          <Reveal as="article" className="tile t-platforms" delay={80} id="platforms">
            <div className="t-platforms__copy">
              <p className="eyebrow">{platforms.eyebrow}</p>
              <h2 className="h-md">
                Powerful platforms built <span className="tint">for you</span>
              </h2>
              <p className="lede">{platforms.body}</p>
              <SmartLink href={platforms.cta.href} className="btn btn--solid btn--sm">
                {platforms.cta.label}
                <Icon name="arrow" size={16} />
              </SmartLink>
            </div>

            <p className="stamp">
              {platforms.badge[0]}
              <br />
              {platforms.badge[1]}
            </p>

            <figure>
              <Image
                className="tile__art"
                src={platforms.image}
                alt={platforms.alt}
                width={1448}
                height={1086}
              />
            </figure>
          </Reveal>

          {/* refer */}
          <Reveal as="article" className="tile t-refer" delay={140} id="partners">
            <figure>
              <Image
                className="tile__art"
                src={refer.image}
                alt={refer.alt}
                width={1254}
                height={1254}
              />
            </figure>

            <div className="t-refer__copy">
              <p className="eyebrow">{refer.eyebrow}</p>
              <h3 className="h-sm">{refer.title}</h3>
              <p className="lede">{refer.body}</p>
              <SmartLink href={refer.cta.href} className="btn btn--ghost btn--sm">
                {refer.cta.label}
                <Icon name="arrow" size={16} />
              </SmartLink>
            </div>
          </Reveal>

          {/* partner */}
          <Reveal as="article" className="tile t-partner" delay={200}>
            <div className="t-partner__copy">
              <p className="eyebrow">{partner.eyebrow}</p>
              <h2 className="h-md">
                Grow together with a <span className="tint">trusted broker</span>
              </h2>
              <p className="lede">{partner.body}</p>
              <SmartLink href={partner.cta.href} className="btn btn--solid btn--sm">
                {partner.cta.label}
                <Icon name="arrow" size={16} />
              </SmartLink>
            </div>

            <figure>
              <Image
                className="tile__art"
                src={partner.image}
                alt={partner.alt}
                width={1448}
                height={1086}
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
