import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">About Lattice</p>
          <h1>Independent thought<br /><em>starts with a question.</em></h1>
          <p>
            Lattice was created to give ambitious secondary-school students a
            reason to think beyond the boundaries of a class, a test, or a
            single subject.
          </p>
        </div>
      </section>
      <section className="section about-section">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">Our purpose</p>
            <h2>xxxxx</h2>
          </div>
          <div className="prose">
            <p>
              xxxxx is an independent academic initiative serving Grade 9–12
              students in China. Our aim is to encourage careful reading,
              original reasoning, and writing that treats difficult questions
              with seriousness.
            </p>
            <p>
              The prize is supported by a review panel of 10+ scholars from
              leading universities in the United States. Full biographies and
              institutional affiliations: xxxxx.
            </p>
            <h3>Contact</h3>
            <p>Email: xxxxx<br />Organisation: xxxxx<br />Address: xxxxx</p>
          </div>
        </div>
      </section>
    </>
  );
}
