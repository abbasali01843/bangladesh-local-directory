import SideMenu from "@/components/SideMenu";
import { site } from "@/data/site";
import Link from "next/link";

type Props = { title?: string; subtitle?: string; backHref?: string; rightHref?: string; rightLabel?: string; showMenu?: boolean };

export default function TopBar({ title = site.name, subtitle = site.areaLine, backHref, rightHref = "/notices", rightLabel = "•", showMenu = true }: Props) {
  return (
    <div className="ps-topwrap">
      <header className="ps-topbar">
        <div className="ps-topbar-side">
          {backHref ? <Link href={backHref} className="ps-iconbtn ps-iconbtn-soft" aria-label="ফিরে যান">←</Link> :
           showMenu ? <SideMenu /> : <span className="ps-iconbtn" aria-hidden="true" />}
        </div>
        <Link href="/" className="ps-brand" aria-label="হোম">
          <span className="ps-logo">⌖</span>
          <span className="ps-brand-copy"><span className="ps-brand-title">{title}</span><span className="ps-brand-sub">{subtitle}</span></span>
        </Link>
        <div className="ps-topbar-side ps-topbar-right">
          <Link href={rightHref} className="ps-iconbtn ps-iconbtn-soft ps-notice-dot" aria-label="বিজ্ঞপ্তি">{rightLabel}</Link>
        </div>
      </header>
    </div>
  );
}
