import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-note">
            An independent essay competition for students who take ideas seriously.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <Link href="/competition">Competition</Link>
          <Link href="/awards">Awards</Link>
          <Link href="/portal">Student portal</Link>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <a href="mailto:xxxxx">xxxxx</a>
          <p>Organised by xxxxx</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Lattice Essay Prize</span>
        <span>Privacy · Terms · Academic integrity</span>
      </div>
    </footer>
  );
}
