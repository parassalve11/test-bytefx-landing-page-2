import Image from 'next/image';
import { site } from '@/lib/content';
import Reveal from './reveal';

export default function MobileSection() {
  return (
    <section className="mobile-section band" id="mobile-app" aria-labelledby="mobile-title">
      <div className="shell">
        <Reveal className="mobile-showcase">
          <div className="mobile-duo" aria-label="ByteFX mobile app screens">
            <figure className="mobile-device mobile-device--dashboard">
              <span className="mobile-device__rim"><span className="mobile-device__camera" aria-hidden="true" /><Image src="/assets/mobile/bytefx-account.png" alt="ByteFX account dashboard with account controls and transaction history" width={1220} height={2712} sizes="(max-width: 560px) 43vw, 275px" /></span>
            </figure>
            <figure className="mobile-device mobile-device--terminal">
              <span className="mobile-device__rim"><span className="mobile-device__camera" aria-hidden="true" /><Image src="/assets/mobile/bytefx-chart.png" alt="ByteFX mobile trading terminal showing the gold price chart" width={1220} height={2712} sizes="(max-width: 560px) 43vw, 275px" /></span>
            </figure>
          </div>
          <div className="mobile-copy">
            <p className="eyebrow">ByteFX on the go</p>
            <h2 className="h-lg" id="mobile-title">Your trading day.<br /><span className="tint">In your pocket.</span></h2>
            <p className="mobile-lede">Follow the markets, place your next trade and manage your account. Two sides of your trading day, together in one app.</p>
            <div className="mobile-install">
              <a className="app-store-button" href={site.mobileAppUrl} target="_blank" rel="noopener noreferrer"><svg width="27" height="30" viewBox="0 0 27 30" aria-hidden="true"><path fill="#34a853" d="M2 2 17 15 2 28Z"/><path fill="#4285f4" d="m2 2 15 13 5-5Z"/><path fill="#fbbc04" d="m17 15 5-5 4 3q2 2 0 4l-4 3Z"/><path fill="#ea4335" d="M2 28 17 15l5 5Z"/></svg><span><small>GET IT ON</small><b>Google Play</b></span><span aria-hidden="true">↗</span></a>
              <p className="mobile-availability">Available on Android</p>
            </div>
            <a className="mobile-qr" href={site.mobileAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Download ByteFX or scan the Google Play QR"><Image src="/app-qr.png" alt="QR code to download ByteFX on Google Play" width={392} height={392} unoptimized /><span>Scan. Download.<br /><b>Make your next move.</b></span></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
