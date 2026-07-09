import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { CalendarClock, CheckCircle2, Clock3, CreditCard, Loader2, PackageCheck, Search, Send, ShieldCheck, Star } from "lucide-react";
import { formatDate, formatMoney, hasSupabaseConfig, paymentPercent, type ClientProject, type ProjectReview, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Client Portal — Indentina GFX" },
      { name: "description", content: "Check your Indentina GFX commission status, payment progress and delivery timeline." },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const [code, setCode] = useState("");
  const [project, setProject] = useState<ClientProject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function lookUpProject(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError("");
    setProject(null);

    const projectCode = code.trim().toUpperCase();
    const { data, error: lookupError } = await supabase.rpc("lookup_project", { project_code_input: projectCode });

    if (lookupError) {
      setError("Something went wrong. Please check the project ID or try again later.");
    } else if (!data || data.length === 0) {
      setError("No visible project found with that ID. Double-check the code your project manager gave you.");
    } else {
      setProject(data[0] as ClientProject);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="mb-8 inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:border-cyan hover:text-foreground">Back to main site</a>
        <section className="overflow-hidden rounded-[2rem] border border-border bg-gradient-card p-6 shadow-2xl md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_360px] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan">Client Portal</p>
              <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Track your commission.</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">Enter your private project ID to see your project name, payment status, PayPal link and delivery timeline.</p>
            </div>
            <form onSubmit={lookUpProject} className="rounded-3xl border border-border bg-background/50 p-5">
              <label className="text-sm font-semibold">Project ID</label>
              <div className="mt-3 flex gap-2">
                <input className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 uppercase outline-none ring-cyan/40 focus:ring-2" value={code} onChange={(event) => setCode(event.target.value)} placeholder="IND-8K42X" required />
                <button disabled={loading || !hasSupabaseConfig} className="inline-flex items-center justify-center rounded-xl bg-gradient-cyan px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60" type="submit">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}</button>
              </div>
              {!hasSupabaseConfig ? <p className="mt-3 text-sm text-gold">Client portal is waiting for Supabase setup.</p> : null}
              {error ? <p className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm">{error}</p> : null}
            </form>
          </div>
        </section>

        {project ? <ProjectPanel project={project} /> : <PortalPreview />}
      </div>
    </div>
  );
}

function ProjectPanel({ project }: { project: ClientProject }) {
  const percent = paymentPercent(project.payment_status);
  const depositDue = Number(project.total_price) / 2;
  const amountPaid = project.payment_status === "paid_full" ? Number(project.total_price) : project.payment_status === "deposit_paid" ? depositDue : 0;
  const remaining = Math.max(Number(project.total_price) - amountPaid, 0);
  const paymentLink = project.payment_status === "not_paid" ? project.paypal_deposit_url : project.payment_status === "deposit_paid" ? project.paypal_final_url : null;
  const paymentLabel = project.payment_status === "not_paid" ? "Pay 50% Deposit" : project.payment_status === "deposit_paid" ? "Pay Final Balance" : "Payment Complete";

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-border bg-surface/80 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan">{project.project_code}</p>
            <h2 className="mt-2 font-display text-3xl font-bold">{project.project_name}</h2>
            <p className="mt-2 text-muted-foreground">Client: {project.client_name}</p>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-gold">
            <p className="text-xs uppercase tracking-[0.2em]">Total</p>
            <p className="font-display text-2xl font-bold">{formatMoney(Number(project.total_price), project.currency)}</p>
          </div>
        </div>

        {project.description ? <p className="mt-6 rounded-2xl border border-border bg-background/50 p-4 text-sm text-muted-foreground">{project.description}</p> : null}

        <div className="mt-6 rounded-3xl border border-border bg-background/40 p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl font-semibold">Payment Progress</p>
              <p className="text-sm text-muted-foreground">{formatMoney(amountPaid, project.currency)} paid • {formatMoney(remaining, project.currency)} remaining</p>
            </div>
            <span className="rounded-full bg-cyan/10 px-3 py-1 text-sm font-bold text-cyan">{percent}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-gold transition-all" style={{ width: `${percent}%` }} /></div>
          {paymentLink ? <a href={paymentLink} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-cyan px-5 py-3 font-semibold text-primary-foreground glow-cyan"><CreditCard className="h-5 w-5" /> {paymentLabel}</a> : <p className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan/30 bg-cyan/10 px-5 py-3 font-semibold text-cyan"><CheckCircle2 className="h-5 w-5" /> {paymentLabel}</p>}
        </div>

        {project.client_notes ? <div className="mt-6 rounded-3xl border border-border bg-background/40 p-5"><p className="font-display text-lg font-semibold">Project notes</p><p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{project.client_notes}</p></div> : null}
      </div>

      <aside className="rounded-[2rem] border border-border bg-surface/80 p-6 shadow-2xl">
        <h3 className="font-display text-2xl font-bold">Timeline</h3>
        <div className="mt-6 space-y-4">
          <TimelineItem done label="Project confirmed" />
          <TimelineItem done={project.payment_status !== "not_paid"} label="Deposit received" />
          <TimelineItem done={project.drafting_rendering_complete} label="Drafting / rendering" muted={!project.drafting_rendering_complete} />
          {project.drafting_rendering_complete && project.payment_status !== "paid_full" ? <TimelineItem active label="Waiting on final payment" /> : <TimelineItem done={project.payment_status === "paid_full"} label="Final payment received" muted={project.payment_status !== "paid_full"} />}
          <TimelineItem done={project.files_delivered} label="Files delivered" muted={!project.files_delivered} />
        </div>
        <div className="mt-6 rounded-3xl border border-gold/30 bg-gold/10 p-5 text-gold">
          <div className="mb-3 flex items-center gap-2"><CalendarClock className="h-5 w-5" /><p className="font-semibold">Expected delivery</p></div>
          <p className="font-display text-2xl font-bold">{formatDate(project.expected_delivery_date)}</p>
        </div>
      </aside>

      <ReviewPanel project={project} />
    </section>
  );
}

function ReviewPanel({ project }: { project: ClientProject }) {
  const [existingReview, setExistingReview] = useState<ProjectReview | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loadingReview, setLoadingReview] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadReview() {
      if (!supabase) return;
      setLoadingReview(true);
      setReviewMessage("");
      const { data, error } = await supabase.rpc("get_project_review", { project_id_input: project.id });
      if (!isMounted) return;
      if (!error && data && data.length > 0) setExistingReview(data[0] as ProjectReview);
      setLoadingReview(false);
    }

    void loadReview();
    return () => { isMounted = false; };
  }, [project.id]);

  async function submitReview(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setSubmitting(true);
    setReviewMessage("");

    const { data, error } = await supabase.rpc("submit_project_review", {
      project_id_input: project.id,
      project_code_input: project.project_code,
      rating_input: rating,
      review_text_input: reviewText.trim(),
    });

    if (error) {
      setReviewMessage("Review could not be submitted. This project may already have a review.");
    } else if (data && data.length > 0) {
      setExistingReview(data[0] as ProjectReview);
      setReviewText("");
      setReviewMessage("Thank you — your review was submitted.");
    }

    setSubmitting(false);
  }

  return (
    <div className="lg:col-span-2 rounded-[2rem] border border-border bg-surface/80 p-6 shadow-2xl">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Client Review</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Share your experience</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">You can submit one review for this project. Please double-check your star rating and message before sending to avoid duplicate or spam reviews.</p>
        </div>
      </div>

      {loadingReview ? <p className="mt-5 text-sm text-muted-foreground">Checking review status...</p> : null}

      {existingReview ? (
        <div className="mt-5 rounded-3xl border border-gold/30 bg-gold/10 p-5">
          <div className="flex items-center gap-1 text-gold">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className={`h-5 w-5 ${index < existingReview.rating ? "fill-current" : ""}`} />)}</div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{existingReview.review_text}</p>
          <p className="mt-3 text-xs text-muted-foreground">Review submitted. Thank you!</p>
        </div>
      ) : !loadingReview ? (
        <form onSubmit={submitReview} className="mt-5 space-y-4">
          <div>
            <p className="mb-2 text-sm font-semibold">Star rating</p>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1;
                return (
                  <button key={starValue} type="button" onClick={() => setRating(starValue)} className={`rounded-xl border px-3 py-2 transition ${starValue <= rating ? "border-gold bg-gold/15 text-gold" : "border-border bg-background/40 text-muted-foreground"}`} aria-label={`${starValue} stars`}>
                    <Star className={`h-5 w-5 ${starValue <= rating ? "fill-current" : ""}`} />
                  </button>
                );
              })}
            </div>
          </div>
          <label className="block text-sm font-semibold">Review
            <textarea className="mt-2 min-h-32 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-cyan/40 focus:ring-2" value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Write your review here..." minLength={8} maxLength={1000} required />
          </label>
          {reviewMessage ? <p className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm">{reviewMessage}</p> : null}
          <button disabled={submitting || reviewText.trim().length < 8} className="inline-flex items-center gap-2 rounded-xl bg-gradient-cyan px-5 py-3 font-semibold text-primary-foreground disabled:opacity-60" type="submit"><Send className="h-5 w-5" /> {submitting ? "Submitting..." : "Submit review once"}</button>
        </form>
      ) : null}
    </div>
  );
}

function TimelineItem({ label, done = false, active = false, muted = false }: { label: string; done?: boolean; active?: boolean; muted?: boolean }) {
  const Icon = done ? CheckCircle2 : active ? Clock3 : PackageCheck;
  return <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${done ? "border-cyan/30 bg-cyan/10 text-cyan" : active ? "border-gold/40 bg-gold/10 text-gold" : "border-border bg-background/40 text-muted-foreground"} ${muted ? "opacity-70" : ""}`}><Icon className="h-5 w-5" /><span className="font-medium">{label}</span></div>;
}

function PortalPreview() {
  return <section className="mt-8 rounded-[2rem] border border-border bg-surface/60 p-6 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/10 text-cyan"><ShieldCheck className="h-7 w-7" /></div><h2 className="font-display text-2xl font-bold">Private project lookup</h2><p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Your project details only appear after entering the project ID provided by Indentina GFX.</p></section>;
}
