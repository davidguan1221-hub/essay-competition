import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { categories, timeline } from "@/lib/competition";

export const metadata: Metadata = { title: "Competition" };

export default function CompetitionPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">The 2026 competition</p>
          <h1>Questions worth<br /><em>thinking about.</em></h1>
          <p>
            Choose one question from one category. We are interested in your
            reasoning, not in a predetermined conclusion.
          </p>
        </div>
      </section>

      <section className="section questions-section">
        <div className="container">
          {categories.map((category) => (
            <article id={category.slug} className="question-block" key={category.slug}>
              <div className="question-intro">
                <span>{category.number}</span>
                <div>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>
              </div>
              <ol>
                {category.questions.map((question) => (
                  <li key={question}>
                    <span>Question</span>
                    <p>{question}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="section rules-section">
        <div className="container">
          <div className="split-heading">
            <div>
              <p className="eyebrow">Entry rules</p>
              <h2>Read before<br />you write.</h2>
            </div>
            <div className="rules-list">
              <article>
                <FileText />
                <div>
                  <h3>Essay requirements</h3>
                  <p>
                    English language · xxxxx words · PDF only · one entry per
                    student across all categories.
                  </p>
                </div>
              </article>
              <article>
                <ShieldCheck />
                <div>
                  <h3>Academic integrity</h3>
                  <p>
                    All work must be original. Generative AI may not be used to
                    research, draft, rewrite, translate, or edit the essay.
                    Citation style: xxxxx.
                  </p>
                </div>
              </article>
              <article>
                <span className="rule-icon">$</span>
                <div>
                  <h3>Entry fee</h3>
                  <p>$20 USD or ¥140 RMB. Payment method and refund policy: xxxxx.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <p className="eyebrow">Timeline · China Standard Time</p>
          <div className="timeline">
            {timeline.map((item, index) => (
              <article key={item.label}>
                <span>0{index + 1}</span>
                <h3>{item.label}</h3>
                <p>{item.date}</p>
              </article>
            ))}
          </div>
          <Link className="button" href="/portal">
            Enter the competition <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
