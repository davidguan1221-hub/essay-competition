import Link from "next/link";
import { ArrowRight, BookOpen, Check, Users } from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { categories, timeline } from "@/lib/competition";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">2026 Essay Competition · China</p>
            <h1>
              Think beyond
              <br />
              the <em>syllabus.</em>
            </h1>
            <p className="hero-intro">
              A national English-language essay prize for Grade 9–12 students who
              are ready to question assumptions, follow evidence, and make an
              argument of their own.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/portal">
                Register now <ArrowRight size={18} />
              </Link>
              <Link className="text-link" href="/competition">
                Explore the questions
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="node node-one">T</div>
            <div className="node node-two">P</div>
            <div className="node node-three">E</div>
            <div className="node node-four">S</div>
            <div className="hero-seal">
              <span>2026</span>
              <strong>L</strong>
              <small>Ideas connect here</small>
            </div>
          </div>
        </div>
        <div className="container hero-strip">
          {timeline.map((item) => (
            <div key={item.label}>
              <span>{item.short}</span>
              <p>{item.label}</p>
            </div>
          ))}
          <div className="fee">
            <span>$20 / ¥140</span>
            <p>Entry fee</p>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container split-heading">
          <div>
            <p className="eyebrow">The challenge</p>
            <h2>Four disciplines.<br />Twelve questions.<br />One original argument.</h2>
          </div>
          <div className="section-copy">
            <p>
              School teaches students how to answer. Lattice asks them to decide
              what deserves to be asked—and then defend a position with clarity,
              evidence, and intellectual courage.
            </p>
            <p>
              Choose one question from one category. Submit one essay in English.
              Every eligible entry is read through an anonymous review process.
            </p>
          </div>
        </div>
        <div className="container categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="section dark-section">
        <div className="container dark-grid">
          <div>
            <p className="eyebrow light">Why enter</p>
            <h2>Your ideas deserve<br />a serious reader.</h2>
          </div>
          <div className="benefits">
            <article>
              <BookOpen />
              <div>
                <h3>Rigorous questions</h3>
                <p>Prompts designed to reward reasoning rather than recall.</p>
              </div>
            </article>
            <article>
              <Users />
              <div>
                <h3>Scholarly review</h3>
                <p>Evaluated by 10+ scholars from leading U.S. universities.</p>
              </div>
            </article>
            <article>
              <Check />
              <div>
                <h3>Recognition at every level</h3>
                <p>Category prizes plus percentile-based distinctions.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <div className="process-grid">
            {[
              ["01", "Create an account", "Register with your school and eligibility details."],
              ["02", "Choose a question", "Select one prompt across the four categories."],
              ["03", "Submit your essay", "Upload one original English-language essay as a PDF."],
              ["04", "Receive your result", "Results and awards are released in your portal."],
            ].map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="cta-band">
            <div>
              <p className="eyebrow">Entries open 1 August 2026</p>
              <h2>What will you argue?</h2>
            </div>
            <Link className="button button-light" href="/portal">
              Begin your entry <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
