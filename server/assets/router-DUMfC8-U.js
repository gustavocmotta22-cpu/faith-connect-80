import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { X, Share2, Download } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const appCss = "/assets/styles-BC1o2APZ.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        hero: "bg-primary-foreground text-primary shadow-lg hover:bg-primary-foreground/90",
        pastoral: "bg-accent text-accent-foreground shadow-sm hover:bg-accent/85",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        touch: "h-12 rounded-xl px-5 text-sm font-semibold",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || "standalone" in window.navigator && Boolean(window.navigator.standalone);
}
function InstallAppPrompt() {
  const [installEvent, setInstallEvent] = useState(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isStandalone()) return;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;
    const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIos) {
      const timer = window.setTimeout(() => {
        setShowIosHelp(true);
        setVisible(true);
      }, 1200);
      return () => window.clearTimeout(timer);
    }
    const handlePrompt = (event) => {
      event.preventDefault();
      setInstallEvent(event);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);
  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
    setInstallEvent(null);
  }
  if (!visible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-end bg-foreground/35 p-4 sm:items-center sm:justify-center", role: "dialog", "aria-modal": "true", "aria-labelledby": "install-title", children: /* @__PURE__ */ jsxs("section", { className: "relative w-full max-w-md rounded-3xl border bg-card p-5 shadow-pastoral", children: [
    /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-3 top-3 rounded-full", onClick: () => setVisible(false), "aria-label": "Fechar convite de instalação", children: /* @__PURE__ */ jsx(X, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pr-9", children: [
      /* @__PURE__ */ jsx("img", { src: "/icons/app-icon-192.png", alt: "Ícone da Igreja Presbiteriana Filadélfia", className: "size-20 rounded-2xl border object-cover shadow-sm" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[0.12em] text-primary", children: "Filadélfia Conecta" }),
        /* @__PURE__ */ jsx("h2", { id: "install-title", className: "mt-1 font-display text-2xl font-bold", children: "Salve o aplicativo no celular" })
      ] })
    ] }),
    showIosHelp ? /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl bg-secondary p-4 text-base leading-7 text-secondary-foreground", children: [
      /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsx(Share2, { className: "size-5" }),
        " No iPhone ou iPad"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2", children: [
        "Toque em ",
        /* @__PURE__ */ jsx("strong", { children: "Compartilhar" }),
        " no navegador e depois em ",
        /* @__PURE__ */ jsx("strong", { children: "Adicionar à Tela de Início" }),
        "."
      ] })
    ] }) : /* @__PURE__ */ jsxs(Button, { size: "touch", className: "mt-5 w-full text-base", onClick: install, children: [
      /* @__PURE__ */ jsx(Download, { className: "size-5" }),
      " Instalar aplicativo"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-center text-sm leading-5 text-muted-foreground", children: "O ícone da igreja ficará na tela inicial, como os outros aplicativos." })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Filadélfia Conecta" },
      { name: "description", content: "Comunidade digital da Igreja Presbiteriana Filadélfia." },
      { name: "author", content: "Igreja Presbiteriana Filadélfia" },
      { name: "theme-color", content: "#0F4D3A" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Filadélfia" },
      { property: "og:title", content: "Filadélfia Conecta" },
      { property: "og:description", content: "Comunidade digital da Igreja Presbiteriana Filadélfia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Filadélfia Conecta" },
      { name: "twitter:description", content: "Comunidade digital da Igreja Presbiteriana Filadélfia." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/df39b4f0-603c-4200-871e-887ad4ed9c5c/id-preview-891f1796--f22f7921-ac90-4c2e-a786-4792c856758c.lovable.app-1781320010323.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/df39b4f0-603c-4200-871e-887ad4ed9c5c/id-preview-891f1796--f22f7921-ac90-4c2e-a786-4792c856758c.lovable.app-1781320010323.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/icons/app-icon-192.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/icons/apple-touch-icon.png"
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(InstallAppPrompt, {})
  ] });
}
const BASE_URL = "";
const Route$1 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          `  <url>`,
          `    <loc>${BASE_URL}/</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>1.0</priority>`,
          `  </url>`,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter = () => import("./index-THd1nLnq.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Filadélfia Conecta | Igreja Presbiteriana"
    }, {
      name: "description",
      content: "Cultos, avisos, oração, sociedades e biblioteca da Igreja Presbiteriana Filadélfia em São Gonçalo."
    }, {
      property: "og:title",
      content: "Filadélfia Conecta"
    }, {
      property: "og:description",
      content: "A comunidade digital da Igreja Presbiteriana Filadélfia."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$1.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$2
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  SitemapDotxmlRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  cn as c,
  router as r
};
