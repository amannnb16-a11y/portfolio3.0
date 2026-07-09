import { createClient } from "@supabase/supabase-js";

export type PaymentStatus = "not_paid" | "deposit_paid" | "paid_full";

export type ClientProject = {
  id: string;
  project_code: string;
  client_name: string;
  project_name: string;
  description: string | null;
  total_price: number;
  currency: string;
  payment_status: PaymentStatus;
  drafting_rendering_complete: boolean;
  expected_delivery_date: string | null;
  files_delivered: boolean;
  paypal_deposit_url: string | null;
  paypal_final_url: string | null;
  client_notes: string | null;
  is_visible: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectReview = {
  id: string;
  project_id: string;
  rating: number;
  review_text: string;
  created_at: string;
};

export type ProjectInsert = Omit<ClientProject, "id" | "created_at" | "updated_at">;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export function paymentPercent(status: PaymentStatus) {
  if (status === "paid_full") return 100;
  if (status === "deposit_paid") return 50;
  return 0;
}

export function earnedAmount(total: number, status: PaymentStatus) {
  return Math.round(total * paymentPercent(status)) / 100;
}

export function formatMoney(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount || 0);
}

export function formatDate(date: string | null) {
  if (!date) return "Not set yet";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
