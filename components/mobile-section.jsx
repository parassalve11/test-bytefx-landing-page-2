import Image from 'next/image';
import { site } from '@/lib/content';

function StoreBadge({ apple = false }) {
  const content = <>{apple ? <svg width="25" height="29" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true"><path d="M16 0c.3 3-1.7 5.6-4.4 5.7C11.3 3 13.5.4 16 0ZM21 20c-.8 2.2-3.5 6.4-5.6 6.5-1.4.1-2-1-4-1s-2.8 1-4.2 1C4.4 26.4.5 20.5.5 14.8.5 10.3 3 7.5 6.2 7.5c1.8 0 3.2 1.1 4.5 1.1 1.1 0 3-1.3 5.1-1.1 1.8.1 3.5.8 4.6 2.2-4 2.4-3.6 8.1.6 10.3Z" /></svg> : <svg width="27" height="30" viewBox="0 0 27 30" aria-hidden="true"><path fill="#34a853" d="M2 2 17 15 2 28Z"/><path fill="#4285f4" d="m2 2 15 13 5-5Z"/><path fill="#fbbc04" d="m17 15 5-5 4 3q2 2 0 4l-4 3Z"/><path fill="#ea4335" d="M2 28 17 15l5 5Z"/></svg>}<span><small>{apple && !site.iosAppUrl ? 'COMING SOON ON' : apple ? 'Download on the' : 'GET IT ON'}</small><b>{apple ? 'App Store' : 'Google Play'}</b></span></>;
  const href = apple ? site.iosAppUrl : site.mobileAppUrl;
  return href ? <a className="mobile-store-badge" href={href} target="_blank" rel="noopener noreferrer">{content}</a> : <span className="mobile-store-badge mobile-store-badge--pending" aria-label="App Store download link coming soon">{content}</span>;
}

function Rating() {
  return <div className="mobile-rating"><Image src="/assets/mobile/platinum-rating.png" alt="4.9 out of 5. Platinum Rated by Traders." width={1448} height={1086} sizes="(max-width: 560px) 145px, 205px" /></div>;
}

export default function MobileSection() {
  return (
    <section className="mobile-section" id="mobile-app" aria-labelledby="mobile-title">
      <div className="shell mobile-showcase">
        <div className="mobile-copy">
          <p className="eyebrow">Mobile trading</p>
          <h2 id="mobile-title">Markets<br />In <span>Your Hand</span></h2>
          <p className="mobile-lede">Trade global markets, manage your accounts and stay connected — anytime, anywhere. A powerful trading experience designed for your mobile lifestyle.</p>
          <div className="mobile-install"><StoreBadge apple /><StoreBadge /></div>
          <div className="mobile-download-row"><a className="mobile-qr" href={site.mobileAppUrl} target="_blank" rel="noopener noreferrer"><Image src="/app-qr.png" alt="Scan to download ByteFX on Google Play" width={392} height={392} unoptimized /><b>Scan to Download</b><span>Trade Anytime, Anywhere</span></a><Rating /></div>
        </div>
        <div className="mobile-art">
          <Image className="mobile-art__hand" src="/assets/mobile/bytefx-handheld.webp" alt="Hand holding a phone with the ByteFX trading app open" width={1080} height={1440} sizes="(max-width: 980px) 1px, 660px" />
          <div className="mobile-art__compact"><span className="mobile-art__camera" aria-hidden="true"/><Image src="/assets/mobile/bytefx-chart.png" alt="ByteFX mobile trading screen with gold chart and trading controls" width={1220} height={2712} sizes="(max-width: 560px) 260px, 290px" /></div>
        </div>
      </div>
    </section>
  );
}
