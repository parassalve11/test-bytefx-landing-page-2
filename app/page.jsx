import PaymentsSection from '@/components/payments-section';
import AtlasChat from '@/components/atlas-chat';
import PlatformsSection from '@/components/platforms-section';
import BentoSection from '@/components/bento-section';
import BrokerSection from '@/components/broker-section';
import ClosingSection from '@/components/closing-section';
import HeroSlot from '@/components/hero-slot';
import MobileSection from '@/components/mobile-section';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import VoicesSection from '@/components/voices-section';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <HeroSlot />
        <BrokerSection />
        <BentoSection />
        <PlatformsSection />
        <MobileSection />
        <PaymentsSection />
        <VoicesSection />
        <ClosingSection />
      </main>

      <SiteFooter />
      <AtlasChat />
    </>
  );
}
