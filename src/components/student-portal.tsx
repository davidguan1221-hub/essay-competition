"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleUserRound,
  Clock3,
  FileCheck2,
  FileText,
  LogOut,
  UploadCloud,
} from "lucide-react";
import { categories } from "@/lib/competition";
import {
  clearProfile,
  getProfile,
  getSubmission,
  saveProfile,
  saveSubmission,
  type StudentProfile,
  type Submission,
} from "@/lib/demo-store";
import { DemoBanner } from "./demo-banner";

type Mode = "sign-in" | "register";

export function StudentPortal() {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<Mode>("register");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [category, setCategory] = useState(categories[0].slug);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProfile(getProfile());
      setSubmission(getSubmission());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const selectedCategory = useMemo(
    () => categories.find((item) => item.slug === category) ?? categories[0],
    [category],
  );

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newProfile: StudentProfile = {
      id: crypto.randomUUID(),
      name: String(form.get("name")),
      email: String(form.get("email")),
      school: String(form.get("school")),
      grade: String(form.get("grade")),
      city: String(form.get("city")),
    };
    saveProfile(newProfile);
    setProfile(newProfile);
  }

  function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const existing = getProfile();
    if (existing && existing.email.toLowerCase() === String(form.get("email")).toLowerCase()) {
      setProfile(existing);
      setMessage("");
    } else {
      setMessage("No preview account was found in this browser. Please register first.");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    const form = new FormData(event.currentTarget);
    const file = form.get("essay") as File;
    if (!file || file.type !== "application/pdf") {
      setMessage("Please upload your essay as a PDF.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage("The PDF must be smaller than 10 MB.");
      return;
    }
    const question = String(form.get("question"));
    const newSubmission: Submission = {
      id: crypto.randomUUID(),
      studentId: profile.id,
      anonymousId: `LTX-${Math.floor(10000 + Math.random() * 89999)}`,
      category: selectedCategory.name,
      question,
      title: String(form.get("title")),
      fileName: file.name,
      fileSize: file.size,
      submittedAt: new Date().toISOString(),
      paymentStatus: "pending",
      status: "submitted",
    };
    saveSubmission(newSubmission);
    setSubmission(newSubmission);
    setShowSubmit(false);
    setMessage("");
  }

  function signOut() {
    clearProfile();
    setProfile(null);
  }

  if (!ready) return <div className="portal-loading">Loading portal…</div>;

  if (!profile) {
    return (
      <div className="portal-auth-shell">
        <DemoBanner />
        <div className="portal-auth">
          <div className="auth-intro">
            <p className="eyebrow">Student portal</p>
            <h1>Your argument<br />starts here.</h1>
            <p>
              Create one account to register, submit your PDF, and receive your
              result on 1 October 2026.
            </p>
            <div className="auth-facts">
              <span><Check size={16} /> Grade 9–12 in China</span>
              <span><Check size={16} /> One entry per student</span>
              <span><Check size={16} /> English-language essay</span>
            </div>
          </div>
          <div className="auth-card">
            <div className="auth-tabs">
              <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
                Create account
              </button>
              <button className={mode === "sign-in" ? "active" : ""} onClick={() => setMode("sign-in")}>
                Sign in
              </button>
            </div>
            {mode === "register" ? (
              <form onSubmit={handleRegister}>
                <label>Full name<input name="name" required placeholder="Your legal name" /></label>
                <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
                <div className="form-row">
                  <label>Grade
                    <select name="grade" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Grade 9</option><option>Grade 10</option>
                      <option>Grade 11</option><option>Grade 12</option>
                    </select>
                  </label>
                  <label>City<input name="city" required placeholder="Shanghai" /></label>
                </div>
                <label>School<input name="school" required placeholder="School name" /></label>
                <label>Password<input name="password" type="password" required minLength={8} placeholder="At least 8 characters" /></label>
                <label className="checkbox">
                  <input type="checkbox" required />
                  <span>I confirm I am eligible and agree to the competition rules.</span>
                </label>
                <button className="button full-button" type="submit">Create account <ArrowRight size={17} /></button>
              </form>
            ) : (
              <form onSubmit={handleSignIn}>
                <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
                <label>Password<input name="password" type="password" required placeholder="Your password" /></label>
                {message && <p className="form-error">{message}</p>}
                <button className="button full-button" type="submit">Sign in <ArrowRight size={17} /></button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-shell">
      <DemoBanner />
      <div className="portal-layout">
        <aside className="portal-sidebar">
          <div>
            <p className="eyebrow">Student portal</p>
            <nav>
              <button className="active"><CircleUserRound size={18} /> Overview</button>
              <button onClick={() => setShowSubmit(true)}><UploadCloud size={18} /> Submission</button>
              <button><FileCheck2 size={18} /> Results</button>
            </nav>
          </div>
          <button className="sign-out" onClick={signOut}><LogOut size={17} /> Sign out</button>
        </aside>
        <section className="portal-main">
          <div className="portal-welcome">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h1>{profile.name.split(" ")[0]}</h1>
              <p>{profile.school} · {profile.grade}</p>
            </div>
            <div className="deadline-chip"><Clock3 size={17} /> 32 days to submit</div>
          </div>

          <div className="status-card">
            <div className="status-card-head">
              <div>
                <p className="eyebrow">2026 entry</p>
                <h2>{submission ? "Essay received" : "Complete your entry"}</h2>
              </div>
              <span className={submission ? "status-pill success" : "status-pill"}>{submission ? "Submitted" : "In progress"}</span>
            </div>
            <div className="stepper">
              {[
                ["Account", true],
                ["Payment", submission?.paymentStatus === "verified"],
                ["Submission", Boolean(submission)],
                ["Review", submission?.status !== "submitted" && Boolean(submission)],
                ["Result", false],
              ].map(([label, complete], index) => (
                <div className={complete ? "step complete" : "step"} key={String(label)}>
                  <span>{complete ? <Check size={14} /> : index + 1}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {submission ? (
            <div className="submission-summary">
              <div className="summary-icon"><FileText /></div>
              <div className="summary-main">
                <p className="eyebrow">{submission.category} · {submission.anonymousId}</p>
                <h3>{submission.title}</h3>
                <p>{submission.question}</p>
                <div className="file-chip"><FileCheck2 size={15} /> {submission.fileName} · {(submission.fileSize / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <button className="secondary-button" onClick={() => setShowSubmit(true)}>Replace PDF</button>
            </div>
          ) : (
            <div className="empty-submission">
              <UploadCloud size={32} />
              <h3>Ready when you are.</h3>
              <p>Choose one question and upload your final essay as a PDF.</p>
              <button className="button" onClick={() => setShowSubmit(true)}>Start submission <ArrowRight size={17} /></button>
            </div>
          )}
        </section>
      </div>

      {showSubmit && (
        <div className="modal-backdrop" role="presentation">
          <div className="submission-modal" role="dialog" aria-modal="true" aria-labelledby="submit-title">
            <button className="modal-close" onClick={() => setShowSubmit(false)} aria-label="Close">×</button>
            <p className="eyebrow">Final submission</p>
            <h2 id="submit-title">{submission ? "Replace your essay" : "Submit your essay"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Category
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
              </label>
              <label>Question
                <select name="question" required>
                  {selectedCategory.questions.map((question) => <option key={question}>{question}</option>)}
                </select>
              </label>
              <label>Essay title<input name="title" required placeholder="Enter your essay title" /></label>
              <label className="file-upload">
                <UploadCloud size={27} />
                <strong>Upload PDF</strong>
                <span>Maximum file size: 10 MB</span>
                <input name="essay" type="file" accept="application/pdf,.pdf" required />
              </label>
              <label className="checkbox">
                <input type="checkbox" required />
                <span>I declare this essay is my original work and that I did not use generative AI.</span>
              </label>
              {message && <p className="form-error">{message}</p>}
              <button className="button full-button" type="submit">Submit final essay <ArrowRight size={17} /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
