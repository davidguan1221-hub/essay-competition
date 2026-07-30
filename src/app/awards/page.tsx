import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Medal, Star } from "lucide-react";
import { awards } from "@/lib/competition";

export const metadata: Metadata = { title: "Awards" };

export default function AwardsPage() {
  return (
    <>
      <section className="page-hero awards-hero">
        <div className="container narrow">
          <p className="eyebrow">Recognition</p>
          <h1>Every serious effort<br /><em>is seen.</em></h1>
          <p>
            Awards recognise both the strongest essays in each discipline and
            the quality of achievement across the full field.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container awards-grid">
          {awards.map((award, index) => (
            <article className={index === 0 ? "award-card featured" : "award-card"} key={award.title}>
              <div>
                {index === 0 ? <Medal /> : index < 3 ? <Award /> : <Star />}
                <span>0{index + 1}</span>
              </div>
              <p className="award-value">{award.value}</p>
              <h2>{award.title}</h2>
              <p>{award.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section judging-section">
        <div className="container judging-grid">
          <div>
            <p className="eyebrow">Judging</p>
            <h2>Ideas before identities.</h2>
          </div>
          <div>
            <p>
              Essays are reviewed anonymously by a panel of more than ten
              scholars from leading U.S. universities. Student names, schools,
              and contact details are hidden during academic review.
            </p>
            <p>
              Assessment considers quality of argument, independent thinking,
              engagement with evidence, structure, and written expression.
              Detailed weighting: xxxxx.
            </p>
            <Link className="text-link" href="/competition">
              Read the competition rules <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
