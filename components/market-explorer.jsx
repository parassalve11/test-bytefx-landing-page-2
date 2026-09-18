'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function MarketExplorer({ markets }) {
  const [selected, setSelected] = useState(0);
  const current = markets.categories[selected];

  return (
    <div className="market-explorer">
      <div className="market-explorer__scene">
        <div className="market-explorer__orbit" aria-hidden="true" />
        <Image className="market-explorer__art" src={markets.image} alt={markets.alt}
          width={1254} height={1254} sizes="(max-width: 760px) 70vw, 280px" />
        <div className="market-explorer__choices" role="group" aria-label="Explore asset classes">
          {markets.categories.map((market, index) => (
            <button key={market.id} type="button" className={`market-explorer__choice market-explorer__choice--${market.id}`}
              aria-pressed={selected === index} aria-controls="market-explorer-detail" onClick={() => setSelected(index)}>
              <span aria-hidden="true">{market.symbol}</span>{market.label}
            </button>
          ))}
        </div>
      </div>
      <div className="market-explorer__detail" id="market-explorer-detail" aria-live="polite" aria-atomic="true">
        <div key={current.id} className="market-explorer__content">
          <p className="market-explorer__label">{current.label}</p>
          <h3>{current.title}</h3>
          <p className="market-explorer__description">{current.description}</p>
          <div className="market-explorer__tags">{current.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
