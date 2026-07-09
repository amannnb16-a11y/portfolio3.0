import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, CircleDollarSign, Eye, EyeOff, Loader2, LogOut, Plus, Save, Shield, Star, Trash2 } from "lucide-react";
import { earnedAmount, formatMoney, hasSupabaseConfig, paymentPercent, type ClientProject, type PaymentStatus, type ProjectReview, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Indentina GFX" }] }),
  component: AdminPage,
});

const emptyForm = {
  project_code: "",
  client_name: "",
  project_name: "",
  description: "",
  total_price: 0,
  currency: "USD",
  payment_status: "not_paid" as PaymentStatus,
  drafting_rendering_complete: false,
  expected_delivery_date: "",
  files_delivered: false,
  paypal_deposit_url: "",
  paypal_final_url: "",
  client_notes: "",
  is_visible: true,
  is_archived: false,
};

type ProjectForm = typeof emptyForm;

function AdminPage() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [reviews, setReviews] = useState<ProjectReview[]>([]);
  const [selectedId, setSelectedId] = useState<string | "new">("new");
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (sessionEmail) void loadProjects();
  }, [sessionEmail]);

  const activeProjects = useMemo(() => projects.filter((project) => !project.is_archived), [projects]);
  const selectedReview = useMemo(() => reviews.find((review) => review.project_id === selectedId) ?? null, [reviews, selectedId]);
  const analytics = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    return activeProjects.reduce(
      (totals, project) => {
        const earned = earnedAmount(Number(project.total_price), project.payment_status);
        const total = Number(project.total_price) || 0;
        if (new Date(project.created_at) >= thirtyDaysAgo) totals.ordersPastMonth += 1;
        totals.revenueEarned += earned;
        totals.expectedRevenue += Math.max(total - earned, 0);
        totals.totalProjectValue += total;
        return totals;
      },
      { ordersPastMonth: 0, revenueEarned: 0, expectedRevenue: 0, totalProjectValue: 0 },
    );
  }, [activeProjects]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setAuthError("");
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setProjects([]);
    setReviews([]);
    setSelectedId("new");
    setForm(emptyForm);
  }

  async function loadProjects() {
    if (!supabase) return;
    setLoadingProjects(true);
    setMessage("");
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: reviewData, error: reviewError } = await supabase
      .from("project_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(`Could not load projects: ${error.message}`);
    } else if (reviewError) {
      setMessage(`Projects loaded, but reviews could not load: ${reviewError.message}`);
      setProjects((data ?? []) as ClientProject[]);
    } else {
      setProjects((data ?? []) as ClientProject[]);
      setReviews((reviewData ?? []) as ProjectReview[]);
    }
    setLoadingProjects(false);
  }

  function chooseProject(project: ClientProject) {
    setSelectedId(project.id);
    setForm({
      project_code: project.project_code,
      client_name: project.client_name,
      project_name: project.project_name,
      description: project.description ?? "",
      total_price: Number(project.total_price) || 0,
      currency: project.currency || "USD",
      payment_status: project.payment_status,
      drafting_rendering_complete: project.drafting_rendering_complete,
      expected_delivery_date: project.expected_delivery_date ?? "",
      files_delivered: project.files_delivered,
      paypal_deposit_url: project.paypal_deposit_url ?? "",
      paypal_final_url: project.paypal_final_url ?? "",
      client_notes: project.client_notes ?? "",
      is_visible: project.is_visible,
      is_archived: project.is_archived,
    });
    setMessage("");
  }

  function newProject() {
    setSelectedId("new");
    setForm({ ...emptyForm, project_code: `IND-${Math.random().toString(36).slice(2, 7).toUpperCase()}` });
    setMessage("");
  }

  function setPaymentStatus(status: PaymentStatus) {
    setForm((current) => ({ ...current, payment_status: status }));
  }

  async function saveProject(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setMessage("");

    const payload = {
      ...form,
      project_code: form.project_code.trim().toUpperCase(),
      client_name: form.client_name.trim(),
      project_name: form.project_name.trim(),
      description: form.description.trim() || null,
      total_price: Number(form.total_price) || 0,
      expected_delivery_date: form.expected_delivery_date || null,
      paypal_deposit_url: form.paypal_deposit_url.trim() || null,
      paypal_final_url: form.paypal_final_url.trim() || null,
      client_notes: form.client_notes.trim() || null,
    };

    const request = selectedId === "new"
      ? supabase.from("projects").insert(payload).select("*").single()
      : supabase.from("projects").update(payload).eq("id", selectedId).select("*").single();

    const { data, error } = await request;
    if (error) {
      setMessage(`Save failed: ${error.message}`);
    } else if (data) {
      setMessage("Saved successfully.");
      await loadProjects();
      chooseProject(data as ClientProject);
    }
    setSaving(false);
  }

  async function archiveProject() {
    if (!supabase || selectedId === "new") return;
    setSaving(true);
    const { error } = await supabase.from("projects").update({ is_archived: true, is_visible: false }).eq("id", selectedId);
    setMessage(error ? `Archive failed: ${error.message}` : "Project archived.");
    await loadProjects();
    newProject();
    setSaving(false);
  }

  if (!hasSupabaseConfig) {
    return <SetupMissing />;
  }

  if (authLoading) {
    return <FullPageMessage icon={<Loader2 className="h-6 w-6 animate-spin" />} title="Loading admin" text="Checking your secure login." />;
  }

  if (!sessionEmail) {
    return (
      <div className="min-h-screen bg-background px-4 py-12 text-foreground">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-surface/80 p-6 shadow-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-cyan p-3 text-primary-foreground"><Shield className="h-6 w-6" /></div>
            <div>
              <h1 className="font-display text-2xl font-bold">Admin login</h1>
              <p className="text-sm text-muted-foreground">Only your approved Supabase admin email can edit projects.</p>
            </div>
          </div>
          <form onSubmit={signIn} className="space-y-4">
            <label className="block text-sm font-medium">Email
              <input className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-cyan/40 focus:ring-2" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
            </label>
            <label className="block text-sm font-medium">Password
              <input className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-cyan/40 focus:ring-2" value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
            </label>
            {authError ? <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">{authError}</p> : null}
            <button className="w-full rounded-xl bg-gradient-cyan px-5 py-3 font-semibold text-primary-foreground glow-cyan" type="submit">Log in</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-border bg-surface/70 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan">Indentina GFX</p>
            <h1 className="mt-1 font-display text-3xl font-bold">Admin dashboard</h1>
            <p className="text-sm text-muted-foreground">Logged in as {sessionEmail}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={newProject} className="inline-flex items-center gap-2 rounded-xl bg-gradient-cyan px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> New project</button>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold"><LogOut className="h-4 w-4" /> Log out</button>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <AnalyticsCard label="Orders past 30 days" value={String(analytics.ordersPastMonth)} />
          <AnalyticsCard label="Revenue earned" value={formatMoney(analytics.revenueEarned)} />
          <AnalyticsCard label="Expected remaining" value={formatMoney(analytics.expectedRevenue)} />
          <AnalyticsCard label="Total project value" value={formatMoney(analytics.totalProjectValue)} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl border border-border bg-surface/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Projects</h2>
              {loadingProjects ? <Loader2 className="h-4 w-4 animate-spin text-cyan" /> : null}
            </div>
            <div className="space-y-3">
              {activeProjects.map((project) => (
                <button key={project.id} onClick={() => chooseProject(project)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedId === project.id ? "border-cyan bg-cyan/10" : "border-border bg-background/40 hover:border-cyan/50"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{project.project_name}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.project_code}</p>
                    </div>
                    {project.is_visible ? <Eye className="h-4 w-4 text-cyan" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-gold" style={{ width: `${paymentPercent(project.payment_status)}%` }} /></div>
                  <p className="mt-2 text-xs text-muted-foreground">{project.client_name} • {formatMoney(Number(project.total_price), project.currency)}</p>
                </button>
              ))}
              {!activeProjects.length ? <p className="rounded-2xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">No projects yet. Click New project to make your first client portal entry.</p> : null}
            </div>
          </aside>

          <form onSubmit={saveProject} className="rounded-3xl border border-border bg-surface/70 p-5">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold">{selectedId === "new" ? "Create project" : "Edit project"}</h2>
                <p className="text-sm text-muted-foreground">Client sees only visible fields on /clients.</p>
              </div>
              <div className="flex gap-2">
                {selectedId !== "new" ? <button type="button" onClick={archiveProject} className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive-foreground"><Trash2 className="h-4 w-4" /> Archive</button> : null}
                <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-gradient-cyan px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"><Save className="h-4 w-4" /> {saving ? "Saving" : "Save"}</button>
              </div>
            </div>

            {message ? <p className="mb-5 rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm">{message}</p> : null}

            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Project ID" value={form.project_code} onChange={(value) => setForm({ ...form, project_code: value })} placeholder="IND-8K42X" required />
              <TextField label="Client name" value={form.client_name} onChange={(value) => setForm({ ...form, client_name: value })} placeholder="Client name" required />
              <TextField label="Project name" value={form.project_name} onChange={(value) => setForm({ ...form, project_name: value })} placeholder="Anime thumbnail pack" required />
              <TextField label="Total price" type="number" value={String(form.total_price)} onChange={(value) => setForm({ ...form, total_price: Number(value) })} placeholder="120" required />
              <TextField label="Expected delivery date" type="date" value={form.expected_delivery_date} onChange={(value) => setForm({ ...form, expected_delivery_date: value })} />
              <TextField label="Currency" value={form.currency} onChange={(value) => setForm({ ...form, currency: value.toUpperCase() })} placeholder="USD" />
            </div>

            <label className="mt-4 block text-sm font-medium">Description
              <textarea className="mt-2 min-h-24 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-cyan/40 focus:ring-2" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Short project description shown to the client." />
            </label>

            <div className="mt-6 rounded-2xl border border-border bg-background/40 p-4">
              <h3 className="mb-3 font-display text-lg font-semibold">Payment progress</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                <PaymentButton active={form.payment_status === "not_paid"} onClick={() => setPaymentStatus("not_paid")} label="Not Paid" />
                <PaymentButton active={form.payment_status === "deposit_paid"} onClick={() => setPaymentStatus("deposit_paid")} label="50% Paid" />
                <PaymentButton active={form.payment_status === "paid_full"} onClick={() => setPaymentStatus("paid_full")} label="100% Paid" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background/40 p-4">
              <h3 className="mb-3 font-display text-lg font-semibold">Timeline checkboxes</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <CheckRow checked={form.drafting_rendering_complete} onChange={(checked) => setForm({ ...form, drafting_rendering_complete: checked })} label="Drafting / rendering complete" />
                <CheckRow checked={form.payment_status === "paid_full"} onChange={(checked) => setPaymentStatus(checked ? "paid_full" : "deposit_paid")} label="Final payment received" />
                <CheckRow checked={form.files_delivered} onChange={(checked) => setForm({ ...form, files_delivered: checked })} label="Files delivered" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <TextField label="PayPal deposit link" value={form.paypal_deposit_url} onChange={(value) => setForm({ ...form, paypal_deposit_url: value })} placeholder="https://paypal.me/..." />
              <TextField label="PayPal final payment link" value={form.paypal_final_url} onChange={(value) => setForm({ ...form, paypal_final_url: value })} placeholder="https://paypal.me/..." />
            </div>

            <label className="mt-4 block text-sm font-medium">Client notes
              <textarea className="mt-2 min-h-24 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-cyan/40 focus:ring-2" value={form.client_notes} onChange={(event) => setForm({ ...form, client_notes: event.target.value })} placeholder="Public notes visible to the client." />
            </label>

            <div className="mt-6 flex flex-wrap gap-4">
              <CheckRow checked={form.is_visible} onChange={(checked) => setForm({ ...form, is_visible: checked })} label="Visible in client portal" />
            </div>

            {selectedId !== "new" ? (
              <div className="mt-6 rounded-2xl border border-border bg-background/40 p-4">
                <h3 className="mb-3 font-display text-lg font-semibold">Client review</h3>
                {selectedReview ? (
                  <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <div className="flex items-center gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className={`h-5 w-5 ${index < selectedReview.rating ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm">{selectedReview.review_text}</p>
                    <p className="mt-3 text-xs text-muted-foreground">Submitted from the client portal.</p>
                  </div>
                ) : (
                  <p className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted-foreground">No review has been submitted for this project yet.</p>
                )}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

function SetupMissing() {
  return <FullPageMessage icon={<Shield className="h-6 w-6" />} title="Supabase is not connected yet" text="Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify after creating your Supabase project." />;
}

function FullPageMessage({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground"><div className="max-w-md rounded-3xl border border-border bg-surface/80 p-6 text-center shadow-2xl"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cyan text-primary-foreground">{icon}</div><h1 className="font-display text-2xl font-bold">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{text}</p></div></div>;
}

function AnalyticsCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl border border-border bg-surface/70 p-5"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold"><CircleDollarSign className="h-5 w-5" /></div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl font-bold">{value}</p></div>;
}

function TextField({ label, value, onChange, type = "text", placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean }) {
  return <label className="block text-sm font-medium">{label}<input className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none ring-cyan/40 focus:ring-2" value={value} onChange={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} required={required} /></label>;
}

function PaymentButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button type="button" onClick={onClick} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${active ? "border-gold bg-gold/15 text-gold" : "border-border bg-surface hover:border-gold/50"}`}>{label}</button>;
}

function CheckRow({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium"><input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" className="h-4 w-4 accent-cyan" />{checked ? <CheckCircle2 className="h-4 w-4 text-cyan" /> : null}<span>{label}</span></label>;
}
