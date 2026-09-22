"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "হোম", icon: "🏠" },
  { href: "/categories", label: "ক্যাটাগরি", icon: "📂" },
  { href: "/search", label: "খুঁজুন", icon: "🔍" },
  { href: "/add-listing", label: "তথ্য যোগ করুন", icon: "➕" },
  { href: "/login", label: "লগইন", icon: "👤" },
  { href: "/register", label: "রেজিস্টার", icon: "📝" },
  { href: "/owner", label: "ওনার ড্যাশবোর্ড", icon: "🏪" },
  { href: "/admin", label: "অ্যাডমিন", icon: "🛡️" },
];

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="ps-iconbtn"
        aria-label="Menu"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open && (
        <div className="ps-drawer-root" role="dialog" aria-modal="true">
          <div className="ps-drawer-backdrop" onClick={() => setOpen(false)} />
          <aside className="ps-drawer">
            <div className="ps-drawer-head">
              <div className="ps-brand">
                <span className="ps-logo">🇧🇩</span>
                <div>
                  <div className="ps-brand-title">Local Hub</div>
                  <div className="ps-brand-sub">তথ্যই হোক সংযোগ</div>
                </div>
              </div>
              <button
                type="button"
                className="ps-iconbtn"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="ps-drawer-nav">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="ps-drawer-link"
                  onClick={() => setOpen(false)}
                >
                  <span className="ps-drawer-ico">{l.icon}</span>
                  <span>{l.label}</span>
                </a>
              ))}
            </nav>

            <div className="ps-drawer-foot">
              <p>Local Hub Bangladesh</p>
              <p className="ps-drawer-foot-sub">স্থানীয় তথ্য এক জায়গায়</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
