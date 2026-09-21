import Image from 'next/image';
import { bento } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';
import SmartLink from './smart-link';
import MarketShowcase from './market-showcase';

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
                Trade <span className="tint">commodities</span> and more
              </h2>
              <p className="lede">{markets.body}</p>
            </div>

            <MarketShowcase markets={markets} />
          </Reveal>

          {/* platforms */}
          {/* An image-only card: the platforms have their own section below
              (#platform-guide), so this tile carries the artwork alone. */}
          <Reveal as="article" className="tile t-platforms t-platforms--visual" delay={80} id="platforms">
            <figure className="t-platforms__visual">
              <Image
                src={platforms.image}
                alt={platforms.alt}
                width={platforms.width}
                height={platforms.height}
                sizes="(max-width: 760px) 94vw, (max-width: 1180px) 48vw, 860px"
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
                width={refer.width}
                height={refer.height}
                sizes="(max-width: 760px) 46vw, 220px"
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

            <figure className="t-partner__mark">
              <span className="t-partner__halo" aria-hidden="true" />
              <Image
                className="tile__art"
                src={partner.image}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                sizes="(max-width: 760px) 58vw, (max-width: 1180px) 34vw, 240px"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
