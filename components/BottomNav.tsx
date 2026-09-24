type Props = { active?: "home" | "categories" | "add" | "search" | "account" };

export default function BottomNav({ active = "home" }: Props) {
  return (
    <nav className="ps-bottom">
      <a href="/" className={active === "home" ? "ps-nav-item active" : "ps-nav-item"}>
        <span className="ps-nav-ico">🏠</span>
        <span>হোম</span>
      </a>
      <a href="/categories" className={active === "categories" ? "ps-nav-item active" : "ps-nav-item"}>
        <span className="ps-nav-ico">📂</span>
        <span>ক্যাটাগরি</span>
      </a>
      <a href="/add-listing" className="ps-nav-center">
        <span className="ps-nav-center-btn">➕</span>
        <span className="ps-nav-center-label">যোগ করুন</span>
      </a>
      <a href="/search" className={active === "search" ? "ps-nav-item active" : "ps-nav-item"}>
        <span className="ps-nav-ico">🔍</span>
        <span>খুঁজুন</span>
      </a>
      <a href="/profile" className={active === "account" ? "ps-nav-item active" : "ps-nav-item"}>
        <span className="ps-nav-ico">👤</span>
        <span>অ্যাকাউন্ট</span>
      </a>
    </nav>
  );
}
