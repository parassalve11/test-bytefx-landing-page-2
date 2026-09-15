import { testimonials } from '@/lib/content';
import Icon from './icon';
import Reveal from './reveal';

export default function VoicesSection() {
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

        <ul className="voice-grid">
          {testimonials.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              className="voice"
              delay={index * 90}
              data-featured={item.featured ? 'true' : 'false'}
            >
              <div className="voice__top">
                <span className="voice__quote" aria-hidden="true">
                  &ldquo;
                </span>
                <span className="voice__tag">
                  Real trader
                  <i />
                </span>
              </div>

              <h3>{item.heading}</h3>
              <blockquote>{item.quote}</blockquote>

              <figcaption className="voice__by">
                <span className="voice__avatar" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span className="voice__who">
                  <b>{item.name}</b>
                  <span>
                    <span aria-hidden="true">{item.flag}</span>
                    {item.country}
                  </span>
                </span>
                <span className="voice__stars" aria-label={`${item.rating} out of 5`}>
                  {Array.from({ length: item.rating }, (_, i) => (
                    <Icon key={i} name="star" size={14} />
                  ))}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
