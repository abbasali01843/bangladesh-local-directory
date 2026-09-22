type Props = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  rightHref?: string;
  rightLabel?: string;
};

export default function TopBar({
  title = "Local Hub",
  subtitle = "তথ্যই হোক সংযোগ",
  backHref,
  rightHref = "/login",
  rightLabel = "🔔",
}: Props) {
  return (
    <div className="ps-topwrap">
      <header className="ps-topbar">
        {backHref ? (
          <a href={backHref} className="ps-iconbtn" aria-label="Back">
            ←
          </a>
        ) : (
          <button type="button" className="ps-iconbtn" aria-label="Menu">
            ☰
          </button>
        )}
        <div className="ps-brand">
          <span className="ps-logo">🇧🇩</span>
          <div>
            <div className="ps-brand-title">{title}</div>
            <div className="ps-brand-sub">{subtitle}</div>
          </div>
        </div>
        <a href={rightHref} className="ps-iconbtn" aria-label="Action">
          {rightLabel}
        </a>
      </header>
    </div>
  );
}
