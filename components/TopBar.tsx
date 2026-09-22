import SideMenu from "@/components/SideMenu";

type Props = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  rightHref?: string;
  rightLabel?: string;
  showMenu?: boolean;
};

export default function TopBar({
  title = "Bangladesh Local Directory",
  subtitle = "সাতকানিয়া, চট্টগ্রাম",
  backHref,
  rightHref = "/notices",
  rightLabel = "🔔",
  showMenu = true,
}: Props) {
  return (
    <div className="ps-topwrap">
      <header className="ps-topbar">
        {backHref ? (
          <a href={backHref} className="ps-iconbtn" aria-label="Back">
            ←
          </a>
        ) : showMenu ? (
          <SideMenu />
        ) : (
          <span className="ps-iconbtn" aria-hidden="true" />
        )}

        <div className="ps-brand">
          <span className="ps-logo">🇧🇩</span>
          <div>
            <div className="ps-brand-title" style={{ fontSize: 13 }}>
              {title.length > 22 ? "BD Local Directory" : title}
            </div>
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
