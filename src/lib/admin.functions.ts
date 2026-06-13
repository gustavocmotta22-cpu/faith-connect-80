import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_EMAILS = new Set(["adm_filadelfiaconecta@gmail.com"]);

export const ensureChurchAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = typeof context.claims.email === "string" ? context.claims.email.toLowerCase() : "";
    const emailVerified = Boolean(context.claims.email_verified);

    if (!ADMIN_EMAILS.has(email) || !emailVerified) return { isAdmin: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: context.userId, role: "admin" }, { onConflict: "user_id,role" });

    if (roleError) throw new Error("Não foi possível ativar o acesso administrativo.");
    const { error: profileError } = await supabaseAdmin.from("profiles").upsert({
      id: context.userId,
      full_name: "Administrador Filadélfia Conecta",
      person_kind: "member",
      membership_status: "verified",
      onboarding_complete: true,
      photo_consent: false,
    }, { onConflict: "id" });
    if (profileError) throw new Error("Não foi possível preparar o perfil administrativo.");
    return { isAdmin: true };
  });