import { c as createServerRpc } from "./createServerRpc-vn8wjfLW.js";
import { a as createServerFn } from "./server-atXGQ379.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-DNGwyVTU.js";
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
const ADMIN_EMAILS = /* @__PURE__ */ new Set(["adm_filadelfiaconecta@gmail.com"]);
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
    error: roleError
  } = await supabaseAdmin.from("user_roles").upsert({
    user_id: context.userId,
    role: "admin"
  }, {
    onConflict: "user_id,role"
  });
  if (roleError) throw new Error("Não foi possível ativar o acesso administrativo.");
  const {
    error: profileError
  } = await supabaseAdmin.from("profiles").upsert({
    id: context.userId,
    full_name: "Administrador Filadélfia Conecta",
    person_kind: "member",
    membership_status: "verified",
    onboarding_complete: true,
    photo_consent: false
  }, {
    onConflict: "id"
  });
  if (profileError) throw new Error("Não foi possível preparar o perfil administrativo.");
  return {
    isAdmin: true
  };
});
const AdminMutationSchema = z.discriminatedUnion("action", [z.object({
  action: z.literal("set-member-status"),
  id: z.string().uuid(),
  status: z.enum(["verified", "rejected"])
}), z.object({
  action: z.literal("set-gallery-status"),
  id: z.string().uuid(),
  approved: z.boolean()
}), z.object({
  action: z.literal("delete-gallery"),
  id: z.string().uuid()
}), z.object({
  action: z.literal("save-society"),
  id: z.string().uuid(),
  whatsappUrl: z.string().url().max(500).nullable()
}), z.object({
  action: z.literal("save-content"),
  id: z.string().uuid().nullable(),
  contentType: z.enum(["notice", "event", "liturgy", "social_action", "about"]),
  title: z.string().trim().min(2).max(160),
  body: z.string().trim().max(1e4).nullable()
}), z.object({
  action: z.literal("delete-content"),
  id: z.string().uuid()
}), z.object({
  action: z.literal("add-library-item"),
  title: z.string().trim().min(2).max(200),
  author: z.string().trim().max(160).nullable(),
  pdfPath: z.string().min(1).max(500)
})]);
const runAdminMutation_createServerFn_handler = createServerRpc({
  id: "7f1fe6ef732d27112fd53eeb4934121b20106ffe754a469974bd1dbf06a05fe1",
  name: "runAdminMutation",
  filename: "src/lib/admin.functions.ts"
}, (opts) => runAdminMutation.__executeServer(opts));
const runAdminMutation = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => AdminMutationSchema.parse(input)).handler(runAdminMutation_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: role
  } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (role?.role !== "admin") throw new Error("Acesso administrativo não autorizado.");
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.js");
  let error = null;
  if (data.action === "set-member-status") ({
    error
  } = await supabaseAdmin.from("profiles").update({
    membership_status: data.status
  }).eq("id", data.id));
  if (data.action === "set-gallery-status") ({
    error
  } = await supabaseAdmin.from("gallery_items").update({
    is_approved: data.approved
  }).eq("id", data.id));
  if (data.action === "delete-gallery") ({
    error
  } = await supabaseAdmin.from("gallery_items").delete().eq("id", data.id));
  if (data.action === "save-society") ({
    error
  } = await supabaseAdmin.from("society_groups").update({
    whatsapp_url: data.whatsappUrl
  }).eq("id", data.id));
  if (data.action === "delete-content") ({
    error
  } = await supabaseAdmin.from("church_content").delete().eq("id", data.id));
  if (data.action === "save-content") {
    const payload = {
      content_type: data.contentType,
      title: data.title,
      body: data.body,
      created_by: context.userId
    };
    ({
      error
    } = data.id ? await supabaseAdmin.from("church_content").update(payload).eq("id", data.id) : await supabaseAdmin.from("church_content").insert(payload));
  }
  if (data.action === "add-library-item") {
    const result = await supabaseAdmin.from("library_items").insert({
      title: data.title,
      author: data.author,
      pdf_path: data.pdfPath,
      uploaded_by: context.userId,
      is_free_licensed: true
    });
    error = result.error;
  }
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  ensureChurchAdminRole_createServerFn_handler,
  runAdminMutation_createServerFn_handler
};
