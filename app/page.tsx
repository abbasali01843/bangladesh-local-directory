      desc: "স্থানীয় গ্রাহকের কাছে পৌঁছান — পেইড ফিচার্ড লিস্টিং",
      href: "/advertise",
      cta: "প্যাকেজ দেখুন",
      emoji: "📣",
      tone: "amber",
    },
    ...(hasSocial
      ? [
          {
            id: "fb",
            eyebrow: "যুক্ত হোন",
            title: "ফেসবুকে নিয়মিত সেবা ও তথ্য পেতে জয়েন করুন",
            desc: "আমাদের অফিসিয়াল পেজ ও গ্রুপে",
            href: site.fbGroupUrl || site.fbPageUrl,
            cta: "জয়েন করুন",
            emoji: "👥",
            tone: "green" as const,
          },
        ]
      : []),
  ];

  return (
    <main className="ps-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <TopBar />
