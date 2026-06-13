import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-BvdiZZTW.js";
import { r as requireSupabaseAuth } from "./auth-middleware-C3RV4CQq.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@supabase/supabase-js";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ADMIN_EMAILS = /* @__PURE__ */ new Set(["admin@filadelfia.app", "pastor@filadelfia.app"]);
const ensureChurchAdminRole_createServerFn_handler = createServerRpc({
  id: "482160fb7da9422a30997d8d1edf5b0380db76c51a523de7ff71d0b08feeace3",
  name: "ensureChurchAdminRole",
  filename: "src/lib/admin.functions.ts"
}, (opts) => ensureChurchAdminRole.__executeServer(opts));
const ensureChurchAdminRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(ensureChurchAdminRole_createServerFn_handler, async ({
  context
}) => {
  const email = typeof context.claims.email === "string" ? context.claims.email.toLowerCase() : "";
  const emailVerified = Boolean(context.claims.email_verified);
  if (!ADMIN_EMAILS.has(email) || !emailVerified) return {
    isAdmin: false
  };
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.js");
  const {
    error
  } = await supabaseAdmin.from("user_roles").upsert({
    user_id: context.userId,
    role: "admin"
  }, {
    onConflict: "user_id,role"
  });
  if (error) throw new Error("Não foi possível ativar o acesso administrativo.");
  return {
    isAdmin: true
  };
});
export {
  ensureChurchAdminRole_createServerFn_handler
};
