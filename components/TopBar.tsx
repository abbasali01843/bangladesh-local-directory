import SideMenu from "@/components/SideMenu";
import { site } from "@/data/site";

import Link from "next/link";
type Props = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  rightHref?: string;
  rightLabel?: string;
  showMenu?: boolean;
};

export default function TopBar({
  title = site.name,
  subtitle = site.areaLine,
  backHref,
  rightHref = "/notices",
  rightLabel = "🔔",
  showMenu = true,
}: Props) {
  return (
    <div className="ps-topwrap">
      <header className="ps-topbar">
        {backHref ? (
          <Link href={backHref} className="ps-iconbtn" aria-label="Back">
            ←
          </Link>
        ) : showMenu ? (
          <SideMenu />
        ) : (
          <span className="ps-iconbtn" aria-hidden="true" />
        )}

        <div className="ps-brand">
          <span className="ps-logo">📍</span>
          <div>
            <div className="ps-brand-title">{title}</div>
            <div className="ps-brand-sub">{subtitle}</div>
          </div>
        </div>

        <Link href={rightHref} className="ps-iconbtn" aria-label="Action">
          {rightLabel}
        </Link>
      </header>
    </div>
  );
}
