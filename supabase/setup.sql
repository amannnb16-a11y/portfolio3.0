-- Indentina GFX client portal database setup
-- Paste this whole file into Supabase SQL Editor and click Run.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  project_code text not null unique,
  client_name text not null,
  project_name text not null,
  description text,
  total_price numeric(10,2) not null default 0,
  currency text not null default 'USD',
  payment_status text not null default 'not_paid' check (payment_status in ('not_paid', 'deposit_paid', 'paid_full')),
  drafting_rendering_complete boolean not null default false,
  expected_delivery_date date,
  files_delivered boolean not null default false,
  paypal_deposit_url text,
  paypal_final_url text,
  client_notes text,
  is_visible boolean not null default true,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Client lookup function. This lets clients see only the exact project code they enter.
create or replace function public.lookup_project(project_code_input text)
returns table (
  id uuid,
  project_code text,
  client_name text,
  project_name text,
  description text,
  total_price numeric,
  currency text,
  payment_status text,
  drafting_rendering_complete boolean,
  expected_delivery_date date,
  files_delivered boolean,
  paypal_deposit_url text,
  paypal_final_url text,
  client_notes text,
  is_visible boolean,
  is_archived boolean,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id,
    p.project_code,
    p.client_name,
    p.project_name,
    p.description,
    p.total_price,
    p.currency,
    p.payment_status,
    p.drafting_rendering_complete,
    p.expected_delivery_date,
    p.files_delivered,
    p.paypal_deposit_url,
    p.paypal_final_url,
    p.client_notes,
    p.is_visible,
    p.is_archived,
    p.created_at,
    p.updated_at
  from public.projects p
  where upper(p.project_code) = upper(trim(project_code_input))
    and p.is_visible = true
    and p.is_archived = false
  limit 1;
$$;

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read projects" on public.projects;
create policy "Admins can read projects"
on public.projects
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can insert projects" on public.projects;
create policy "Admins can insert projects"
on public.projects
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
on public.projects
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
on public.projects
for delete
to authenticated
using (public.is_admin());

-- IMPORTANT: after you create your Supabase Auth account, replace this email and run it once.
-- insert into public.admin_users (email) values ('your-email@example.com') on conflict (email) do nothing;

-- Client reviews: one review per project.
create table if not exists public.project_reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  review_text text not null check (char_length(trim(review_text)) >= 8 and char_length(review_text) <= 1000),
  created_at timestamptz not null default now(),
  unique (project_id)
);

alter table public.project_reviews enable row level security;

create or replace function public.get_project_review(project_id_input uuid)
returns table (
  id uuid,
  project_id uuid,
  rating integer,
  review_text text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    r.id,
    r.project_id,
    r.rating,
    r.review_text,
    r.created_at
  from public.project_reviews r
  join public.projects p on p.id = r.project_id
  where r.project_id = project_id_input
    and p.is_visible = true
    and p.is_archived = false
  limit 1;
$$;

create or replace function public.submit_project_review(
  project_id_input uuid,
  project_code_input text,
  rating_input integer,
  review_text_input text
)
returns table (
  id uuid,
  project_id uuid,
  rating integer,
  review_text text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_review public.project_reviews%rowtype;
begin
  if not exists (
    select 1
    from public.projects p
    where p.id = project_id_input
      and upper(p.project_code) = upper(trim(project_code_input))
      and p.is_visible = true
      and p.is_archived = false
  ) then
    raise exception 'Project not found';
  end if;

  insert into public.project_reviews (project_id, rating, review_text)
  values (project_id_input, rating_input, trim(review_text_input))
  returning * into inserted_review;

  return query
  select
    inserted_review.id,
    inserted_review.project_id,
    inserted_review.rating,
    inserted_review.review_text,
    inserted_review.created_at;
exception
  when unique_violation then
    raise exception 'This project already has a review';
end;
$$;

drop policy if exists "Admins can read project reviews" on public.project_reviews;
create policy "Admins can read project reviews"
on public.project_reviews
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can delete project reviews" on public.project_reviews;
create policy "Admins can delete project reviews"
on public.project_reviews
for delete
to authenticated
using (public.is_admin());
