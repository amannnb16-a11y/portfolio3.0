import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-cyan">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That page doesn't exist. Head back to the work.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-cyan"
          >
            Back to Indentina GFX
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something broke loading this page
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-lg bg-gradient-cyan px-4 py-2 text-sm font-semibold text-primary-foreground glow-cyan"
          >
            Try again
          </button>
          <a href="/" className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:border-cyan/40">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Indentina GFX — Premium Roblox Icons, Thumbnails & Ad Creatives" },
      { name: "description", content: "Premium Roblox GFX for launches, updates and ad testing. Icons, thumbnails and ad creatives designed for genre fit and click appeal." },
      { name: "author", content: "Indentina GFX" },
      { property: "og:title", content: "Indentina GFX — Premium Roblox Icons, Thumbnails & Ad Creatives" },
      { property: "og:description", content: "Premium Roblox GFX for launches, updates and ad testing. Icons, thumbnails and ad creatives designed for genre fit and click appeal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Indentina GFX — Premium Roblox Icons, Thumbnails & Ad Creatives" },
      { name: "twitter:description", content: "Premium Roblox GFX for launches, updates and ad testing. Icons, thumbnails and ad creatives designed for genre fit and click appeal." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/db2263fa-71bb-4f41-bb48-ada584decefc/id-preview-585d73ab--b7d3637c-f41d-43c2-89c3-f33e951e1db3.lovable.app-1782588328498.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/db2263fa-71bb-4f41-bb48-ada584decefc/id-preview-585d73ab--b7d3637c-f41d-43c2-89c3-f33e951e1db3.lovable.app-1782588328498.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
