import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_EMAILS = new Set(["admin@filadelfia.app", "pastor@filadelfia.app"]);

export const ensureChurchAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = typeof context.claims.email === "string" ? context.claims.email.toLowerCase() : "";
    const emailVerified = Boolean(context.claims.email_verified);

    if (!ADMIN_EMAILS.has(email) || !emailVerified) return { isAdmin: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: context.userId, role: "admin" }, { onConflict: "user_id,role" });

    if (error) throw new Error("Não foi possível ativar o acesso administrativo.");
    return { isAdmin: true };
  });