"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, ChevronRight, FileText, Scale } from "lucide-react";
import { getScores, sampleSubmissions, saveScore } from "@/lib/demo-store";
import { DemoBanner } from "./demo-banner";

export function JudgeDashboard() {
  const [selected, setSelected] = useState(sampleSubmissions[0]);
  const [scores, setScores] = useState(() => (typeof window === "undefined" ? {} : getScores()));
  const [saved, setSaved] = useState(false);

  const existing = scores[selected.id];
  const total = useMemo(
    () => existing ? existing.argument + existing.originality + existing.evidence + existing.expression : 0,
    [existing],
  );

  function handleScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const score = {
      submissionId: selected.id,
      argument: Number(form.get("argument")),
      originality: Number(form.get("originality")),
      evidence: Number(form.get("evidence")),
      expression: Number(form.get("expression")),
      note: String(form.get("note")),
    };
    saveScore(score);
    setScores(getScores());
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="staff-shell">
      <DemoBanner />
      <header className="staff-topbar">
        <div>
          <span className="staff-mark"><Scale size={19} /></span>
          <strong>Lattice Review</strong>
        </div>
        <div><span className="staff-role">Judge</span><span className="avatar">JD</span></div>
      </header>
      <div className="judge-layout">
        <aside className="assignment-list">
          <div className="assignment-head">
            <p className="eyebrow">My assignments</p>
            <span>{sampleSubmissions.length} essays</span>
          </div>
          {sampleSubmissions.map((item) => {
            const completed = Boolean(scores[item.id]) || item.score;
            return (
              <button key={item.id} className={selected.id === item.id ? "active" : ""} onClick={() => setSelected(item)}>
                <span className={completed ? "dot done" : "dot"} />
                <div>
                  <strong>{item.anonymousId}</strong>
                  <small>{item.category}</small>
                </div>
                <ChevronRight size={16} />
              </button>
            );
          })}
        </aside>
        <main className="review-workspace">
          <section className="essay-panel">
            <div className="essay-meta">
              <div>
                <p className="eyebrow">{selected.category} · Anonymous review</p>
                <h1>{selected.title}</h1>
                <p>{selected.question}</p>
              </div>
              <button className="secondary-button"><FileText size={16} /> Open PDF</button>
            </div>
            <div className="pdf-preview">
              <div className="paper">
                <span>{selected.anonymousId}</span>
                <h2>{selected.title}</h2>
                <p>
                  The essay PDF appears here in the production workspace. Student
                  identity and school information remain hidden throughout review.
                </p>
                <p className="placeholder-lines">
                  ████████████████████████████████████<br />
                  ██████████████████████████████<br />
                  ███████████████████████████████████████<br />
                  ████████████████████████
                </p>
              </div>
            </div>
          </section>
          <aside className="score-panel">
            <p className="eyebrow">Evaluation</p>
            <h2>Score this essay</h2>
            <form key={selected.id} onSubmit={handleScore}>
              {[
                ["argument", "Argument & reasoning"],
                ["originality", "Independent thinking"],
                ["evidence", "Evidence & engagement"],
                ["expression", "Structure & expression"],
              ].map(([name, label]) => (
                <label className="score-field" key={name}>
                  <span>{label}<small>/ 25</small></span>
                  <input name={name} type="number" min="0" max="25" required defaultValue={existing?.[name as keyof typeof existing] as number | undefined} />
                </label>
              ))}
              <label>Private reviewer note<textarea name="note" rows={5} defaultValue={existing?.note} placeholder="Add a concise rationale…" /></label>
              <div className="score-total"><span>Total</span><strong>{total || "—"} <small>/ 100</small></strong></div>
              <button className="button full-button" type="submit">
                {saved ? <><Check size={17} /> Score saved</> : "Save evaluation"}
              </button>
            </form>
          </aside>
        </main>
      </div>
    </div>
  );
}
