type Props = { active?: "home" | "categories" | "add" | "search" | "account" };

export default function BottomNav({ active = "home" }: Props) {
  return (
    <nav className="ps-bottom">
      <a href="/" className={`ps-nav-item${active === "home" ? " active" : ""}`}>
        <span className="ps-nav-ico">🏠</span>
        <span>হোম</span>
      </a>
      <a href="/categories" className={`ps-nav-item${active === "categories" ? " active" : ""}`}>
        <span className="ps-nav-ico">📂</span>
        <span>ক্যাটাগরি</span>
      </a>
      <a href="/add-listing" className="ps-nav-center">
        <span className="ps-nav-center-btn">🇧🇩</span>
        <span className="ps-nav-center-label">যোগ করুন</span>
      </a>
      <a href="/search" className={`ps-nav-item${active === "search" ? " active" : ""}`}>
        <span className="ps-nav-ico">🔍</span>
        <span>খুঁজুন</span>
      </a>
      <a href="/login" className={`ps-nav-item${active === "account" ? " active" : ""`}>
        <span className="ps-nav-ico">👤</span>
        <span>অ্যাকাউন্ট</span>
      </a>
    </nav>
  );
}
