import Link from "next/link";

export type Slide = { id: string; eyebrow: string; title: string; desc: string; href: string; cta: string; emoji: string; tone: "green" | "teal" | "amber" | "rose" };

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const s = slides[0];
  if (!s) return null;
  return (
    <section className="ps-hero-clean">
      <div className="ps-hero-copy">
        <span className="ps-kicker">{s.eyebrow}</span>
        <h1>{s.title}</h1>
        <p>{s.desc}</p>
        <Link href={s.href} className="ps-hero-action">{s.cta}<span>→</span></Link>
      </div>
      <div className="ps-hero-mark" aria-hidden="true">{s.emoji}</div>
    </section>
  );
}
