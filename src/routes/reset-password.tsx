import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password.length < 8) return setMessage("A senha precisa ter pelo menos 8 caracteres.");
    if (password !== confirmPassword) return setMessage("As senhas não coincidem.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error)
      return setMessage(
        "O link expirou ou não é válido. Solicite um novo link na entrada administrativa.",
      );
    setMessage("Senha definida com segurança. Você já pode entrar como administrador.");
    await supabase.auth.signOut();
    window.setTimeout(() => navigate({ to: "/" }), 1200);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <section className="w-full max-w-md rounded-3xl border bg-card p-6 shadow-pastoral">
        <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary">
          <LockKeyhole />
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold text-primary">
          Definir senha administrativa
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Crie uma senha exclusiva. Ela não será exibida nem armazenada no aplicativo.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={72}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar senha</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={72}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          {message && (
            <p className="rounded-xl bg-secondary p-3 text-sm text-secondary-foreground">
              {message}
            </p>
          )}
          <Button className="w-full" size="touch" disabled={busy}>
            {busy && <Loader2 className="animate-spin" />}
            {busy ? "Salvando..." : "Salvar senha"}
          </Button>
        </form>
      </section>
    </main>
  );
}
