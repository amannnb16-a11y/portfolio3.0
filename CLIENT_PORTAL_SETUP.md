# Indentina GFX Client Portal Setup

This project now includes:

- `/clients` - client project lookup page
- `/admin` - private admin dashboard
- Supabase database connection
- Admin login with email/password
- Project editor with 0%, 50%, and 100% payment buttons
- Timeline checkboxes for drafting/rendering, final payment, and files delivered
- Analytics for orders, earned revenue, expected remaining revenue, and total project value
- One-review-per-project client review form with 1 to 5 stars
- Admin review viewer under each project

## Files added or changed

- `src/routes/clients.tsx`
- `src/routes/admin.tsx`
- `src/lib/supabase.ts`
- `supabase/setup.sql`
- `package.json`
- `src/routeTree.gen.ts`

## Step 1 - Upload this project to GitHub

Upload this updated project to your existing GitHub repository.

The important thing is that these files make it into GitHub:

```txt
src/routes/clients.tsx
src/routes/admin.tsx
src/lib/supabase.ts
supabase/setup.sql
package.json
```

## Step 2 - Create a Supabase project

1. Go to Supabase.
2. Create a new project.
3. Choose a project name like `indentina-gfx`.
4. Save your database password somewhere safe.
5. Wait for the project to finish creating.

## Step 3 - Create your database tables

1. In Supabase, open your project.
2. Go to **SQL Editor**.
3. Open the file in this repo called:

```txt
supabase/setup.sql
```

4. Copy the whole file.
5. Paste it into Supabase SQL Editor.
6. Click **Run**.

This creates your `projects` table, `project_reviews` table, `admin_users` table, secure rules, client lookup function, and review submit/view functions.

## Step 4 - Create your admin login account

1. In Supabase, go to **Authentication**.
2. Go to **Users**.
3. Click **Add user** or **Create user**.
4. Use your own email and password.
5. Confirm/create the user.

## Step 5 - Approve your email as admin

1. Go back to **SQL Editor**.
2. Run this SQL, but replace the email with the exact email you used for your Supabase user:

```sql
insert into public.admin_users (email)
values ('your-email@example.com')
on conflict (email) do nothing;
```

Example:

```sql
insert into public.admin_users (email)
values ('indentina@gmail.com')
on conflict (email) do nothing;
```

Only emails in `admin_users` can use the admin dashboard.

## Step 6 - Get your Supabase project keys

1. In Supabase, go to **Project Settings**.
2. Go to **API**.
3. Copy your **Project URL**.
4. Copy your **anon public** key.

Do **not** use the service role key in your website.

## Step 7 - Add the keys to Netlify

1. Go to Netlify.
2. Open your website project.
3. Go to **Site configuration** or **Site settings**.
4. Go to **Environment variables**.
5. Add these two variables:

```txt
VITE_SUPABASE_URL
```

Value: your Supabase Project URL.

```txt
VITE_SUPABASE_ANON_KEY
```

Value: your Supabase anon public key.

6. Save.

## Step 8 - Redeploy your site

1. In Netlify, go to **Deploys**.
2. Click **Trigger deploy**.
3. Choose **Deploy site**.
4. Wait until it finishes.

## Step 9 - Test the admin page

Go to:

```txt
https://your-site-name.netlify.app/admin
```

Log in with the email/password you created in Supabase.

If you are not approved in `admin_users`, the page may log in but database edits will fail. That means Step 5 needs to be checked.

## Step 10 - Create your first project

In `/admin`:

1. Click **New project**.
2. Keep or edit the generated project ID, for example:

```txt
IND-8K42X
```

3. Enter the client name.
4. Enter the project name.
5. Enter the total price.
6. Set payment status:

```txt
Not Paid / 50% Paid / 100% Paid
```

7. Add PayPal links.
8. Set expected delivery date.
9. Click **Save**.

## Step 11 - Test the client page

Go to:

```txt
https://your-site-name.netlify.app/clients
```

Enter the project ID you created.

The client should see:

- Project name
- Price
- Payment progress bar
- PayPal payment button
- Timeline
- Expected delivery date
- Client review form after the timeline


## Step 12 - Test client reviews

On the `/clients` page, after a client looks up their project, they will see a review section under everything else.

The client can:

- Pick 1 to 5 stars
- Write a review
- Submit once

After submitting, the form turns into the submitted review. The database blocks a second review for the same project, which helps prevent spam or duplicate reviews.

To see the review as admin:

1. Go to `/admin`.
2. Open that project.
3. Scroll to **Client review** under the project editor.

## How payment works

This version is manual and safe:

1. Client clicks PayPal link.
2. Client pays you on PayPal.
3. You verify payment in PayPal.
4. You go to `/admin`.
5. You choose `50% Paid` or `100% Paid`.
6. Client page updates automatically.

## Security notes

- `/admin` is not linked anywhere on the main website.
- Someone typing `/admin` only sees a login page.
- The database only allows approved admin emails to create, edit, or archive projects.
- Clients do not get accounts. They can only look up a visible project by exact project ID.
- Clients can submit only one review per project. Reviews are connected to the project in Supabase.
- Keep project IDs random, like `IND-8K42X`, not `IND-001`.

## Important warning

Never put your Supabase `service_role` key in Netlify as a public frontend variable. Only use the anon public key for this website.
