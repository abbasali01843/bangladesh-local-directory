"use client";

import { useEffect, useState } from "react";
import { site, hasSocial, hasSupport } from "@/data/site";

/** priyosherpur.com-এর মেনুর মতো — সেকশনভেদে সাজানো লিংক */
const accountLinks = [
  { href: "/login", label: "লগইন", icon: "🔑" },
  { href: "/register", label: "রেজিস্ট্রেশন", icon: "📝" },
  { href: "/profile", label: "আমার প্রোফাইল", icon: "👤" },
];

const mainLinks = [
  { href: "/", label: "হোম", icon: "🏠" },
  { href: "/categories", label: "ক্যাটাগরি", icon: "📂" },
  { href: "/search", label: "খুঁজুন", icon: "🔍" },
  { href: "/notices", label: "বিজ্ঞপ্তি", icon: "📢" },
  { href: "/add-listing", label: "তথ্য যোগ করুন", icon: "➕" },
  { href: "/area", label: "আপনার এলাকা", icon: "📍" },
];

const platformLinks = [
  { href: "/more-services", label: "আরও সার্ভিস", icon: "🧩" },
  { href: "/contact", label: "যোগাযোগ", icon: "☎️" },
  { href: "/about", label: "আমাদের সম্পর্কে", icon: "ℹ️" },
  { href: "/advisory", label: "উপদেষ্টা পরিষদ", icon: "🎓" },
  { href: "/partners", label: "প্রিয় সহযোদ্ধা", icon: "🤝" },
  { href: "/donors", label: "সম্মানিত ডোনারবৃন্দ", icon: "💝" },
  { href: "/privacy", label: "প্রাইভেসি পলিসি", icon: "🔒" },
];

const manageLinks = [
  { href: "/owner", label: "ওনার ড্যাশবোর্ড", icon: "🏪" },
  { href: "/admin", label: "অ্যাডমিন", icon: "🛡️" },
];

type LinkItem = { href: string; label: string; icon: string };

function NavSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: LinkItem[];
  onNavigate: () => void;
}) {
  return (
    <>
      <div className="ps-drawer-sec">{title}</div>
      {items.map((l) => (
        <a key={l.href} href={l.href} className="ps-drawer-link" onClick={onNavigate}>
          <span className="ps-drawer-ico">{l.icon}</span>
          <span>{l.label}</span>
        </a>
      ))}
    </>
  );
}

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button type="button" className="ps-iconbtn" aria-label="Menu" onClick={() => setOpen(true)}>
        ☰
      </button>

      {open && (
        <div className="ps-drawer-root" role="dialog" aria-modal="true">
          <div className="ps-drawer-backdrop" onClick={close} />
          <aside className="ps-drawer">
            <div className="ps-drawer-head">
              <div className="ps-brand">
                <span className="ps-logo">📍</span>
                <div>
                  <div className="ps-brand-title">{site.name}</div>
                  <div className="ps-brand-sub">{site.tagline}</div>
                </div>
              </div>
              <button type="button" className="ps-iconbtn" aria-label="Close" onClick={close}>
                ✕
              </button>
            </div>

            <nav className="ps-drawer-nav">
              <NavSection title="অ্যাকাউন্ট" items={accountLinks} onNavigate={close} />
              <NavSection title="মেনু" items={mainLinks} onNavigate={close} />
              <NavSection title="প্ল্যাটফর্ম" items={platformLinks} onNavigate={close} />

              {hasSocial && (
                <>
                  <div className="ps-drawer-sec">যুক্ত হোন</div>
                  {site.fbPageUrl && (
                    <a
                      href={site.fbPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-drawer-link"
                    >
                      <span className="ps-drawer-ico">📘</span>
                      <span>ফেসবুক পেইজ</span>
                    </a>
                  )}
                  {site.fbGroupUrl && (
                    <a
                      href={site.fbGroupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-drawer-link"
                    >
                      <span className="ps-drawer-ico">👥</span>
                      <span>ফেসবুক গ্রুপ</span>
                    </a>
                  )}
                </>
              )}

              {hasSupport && (
                <>
                  <div className="ps-drawer-sec">সাপোর্ট</div>
                  {site.supportPhone && (
                    <a href={`tel:${site.supportPhone}`} className="ps-drawer-link">
                      <span className="ps-drawer-ico">📞</span>
                      <span>কল করুন — {site.supportPhone}</span>
                    </a>
                  )}
                  {site.supportEmail && (
                    <a href={`mailto:${site.supportEmail}`} className="ps-drawer-link">
                      <span className="ps-drawer-ico">✉️</span>
                      <span>ইমেইল করুন</span>
                    </a>
                  )}
                </>
              )}

              <NavSection title="ম্যানেজ" items={manageLinks} onNavigate={close} />
            </nav>

            <div className="ps-drawer-foot">
              <p>
                © {site.copyrightYear} {site.name}
              </p>
              <p className="ps-drawer-foot-sub">Powered by {site.developedBy}</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
