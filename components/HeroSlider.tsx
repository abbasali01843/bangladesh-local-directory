"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  emoji: string;
  /** গ্রেডিয়েন্ট থিম */
  tone: "green" | "teal" | "amber" | "rose";
};

const tones: Record<Slide["tone"], string> = {
  green: "linear-gradient(135deg, #0a7a3e 0%, #065f2e 60%, #04471f 100%)",
  teal: "linear-gradient(135deg, #0d9488 0%, #0f766e 60%, #115e56 100%)",
  amber: "linear-gradient(135deg, #b45309 0%, #92400e 60%, #78350f 100%)",
  rose: "linear-gradient(135deg, #be123c 0%, #9f1239 60%, #881337 100%)",
};

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  if (!slides.length) return null;

  return (
    <div
      className="ps-slider"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, idx) => (
        <Link
          key={s.id}
          href={s.href}
          className={`ps-slide${idx === i ? " active" : ""}`}
          style={{ background: tones[s.tone] }}
          aria-hidden={idx !== i}
          tabIndex={idx === i ? 0 : -1}
        >
          <span className="ps-slide-deco" aria-hidden="true">
            {s.emoji}
          </span>
          <span className="ps-slide-eyebrow">{s.eyebrow}</span>
          <span className="ps-slide-title">{s.title}</span>
          <span className="ps-slide-desc">{s.desc}</span>
          <span className="ps-slide-cta">{s.cta} ›</span>
        </Link>
      ))}

      {slides.length > 1 && (
        <div className="ps-slider-dots">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              aria-label={`স্লাইড ${idx + 1}`}
              className={`ps-slider-dot${idx === i ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setI(idx);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
