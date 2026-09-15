import { hero } from '@/lib/content';

export default function HeroSlot() {
  return (
    <section className="hero hero--placeholder" id="top" aria-labelledby="hero-title">
      <h1 id="hero-title">{hero.status}</h1>
    </section>
  );
}
