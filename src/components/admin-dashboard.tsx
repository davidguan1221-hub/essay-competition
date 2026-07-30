"use client";

import { useEffect, useState } from "react";
import {
  Award,
  BarChart3,
  CheckCircle2,
  FileText,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { getResultsPublished, setResultsPublished } from "@/lib/demo-store";
import { DemoBanner } from "./demo-banner";

const rows = [
  ["LTX-26017", "Philosophy", "Shanghai", "Submitted", "Pending", "—"],
  ["LTX-26042", "Economics", "Beijing", "Under review", "Verified", "86"],
  ["LTX-26063", "Technology", "Shenzhen", "Submitted", "Verified", "—"],
  ["LTX-26088", "Sociology", "Guangzhou", "Reviewed", "Verified", "91"],
  ["LTX-26104", "Philosophy", "Hangzhou", "Under review", "Verified", "78"],
];

export function AdminDashboard() {
  const [published, setPublished] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setPublished(getResultsPublished()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function togglePublish() {
    const next = !published;
    setPublished(next);
    setResultsPublished(next);
  }

  const filtered = rows.filter((row) =>
    row.join(" ").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="staff-shell admin-shell">
      <DemoBanner />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div>
            <span className="staff-mark"><BarChart3 size={19} /></span>
            <strong>Lattice Admin</strong>
          </div>
          <nav>
            <button className="active"><BarChart3 size={18} /> Overview</button>
            <button><FileText size={18} /> Submissions</button>
            <button><Users size={18} /> Reviewers</button>
            <button><Award size={18} /> Awards</button>
            <button><Settings size={18} /> Settings</button>
          </nav>
          <div className="admin-user"><span className="avatar">AD</span><div><strong>Administrator</strong><small>xxxxx</small></div></div>
        </aside>
        <main className="admin-main">
          <header>
            <div><p className="eyebrow">2026 competition</p><h1>Overview</h1></div>
            <button className={published ? "publish-button published" : "publish-button"} onClick={togglePublish}>
              <span className="dot" /> {published ? "Results published" : "Results not published"}
            </button>
          </header>
          <section className="metric-grid">
            {[
              ["Total registrations", "428", "+38 this week", Users],
              ["Essays submitted", "276", "64.5% completion", FileText],
              ["Reviews complete", "189", "68.5% of essays", CheckCircle2],
              ["Entry fees verified", "¥28,560", "204 payments", BarChart3],
            ].map(([label, value, detail, Icon]) => (
              <article key={String(label)}>
                <div><span>{label as string}</span><Icon size={19} /></div>
                <strong>{value as string}</strong>
                <p>{detail as string}</p>
              </article>
            ))}
          </section>
          <section className="dashboard-grid">
            <article className="category-chart">
              <div className="panel-heading"><div><p className="eyebrow">Entries</p><h2>By category</h2></div><span>276 total</span></div>
              {[
                ["Philosophy", 82, 30, "gold"],
                ["Economics", 74, 27, "blue"],
                ["Technology", 68, 25, "coral"],
                ["Sociology", 52, 18, "green"],
              ].map(([name, count, percent, color]) => (
                <div className="bar-row" key={String(name)}>
                  <div><span>{name as string}</span><strong>{count as number}</strong></div>
                  <div className="bar-track"><span className={color as string} style={{ width: `${percent as number * 2.7}%` }} /></div>
                </div>
              ))}
            </article>
            <article className="review-status">
              <div className="panel-heading"><div><p className="eyebrow">Review</p><h2>Panel status</h2></div></div>
              <div className="donut"><strong>68%</strong><span>complete</span></div>
              <div className="legend">
                <span><i className="green" />189 complete</span>
                <span><i className="gold" />63 in progress</span>
                <span><i />24 unassigned</span>
              </div>
            </article>
          </section>
          <section className="submission-table">
            <div className="table-toolbar">
              <div><p className="eyebrow">Recent activity</p><h2>Submissions</h2></div>
              <label><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search entries" /></label>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>Anonymous ID</th><th>Category</th><th>City</th><th>Status</th><th>Payment</th><th>Score</th></tr></thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => <td key={`${row[0]}-${index}`}><span className={index === 3 || index === 4 ? "table-status" : ""}>{cell}</span></td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
