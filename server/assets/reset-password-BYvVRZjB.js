import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LockKeyhole, Loader2 } from "lucide-react";
import { s as supabase } from "./client-ycPsap7o.js";
import { B as Button } from "./router-CBfMpBMY.js";
import { L as Label, I as Input } from "./label-D6jfJ59O.js";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (password.length < 8) return setMessage("A senha precisa ter pelo menos 8 caracteres.");
    if (password !== confirmPassword) return setMessage("As senhas não coincidem.");
    setBusy(true);
    const {
      error
    } = await supabase.auth.updateUser({
      password
    });
    setBusy(false);
    if (error) return setMessage("O link expirou ou não é válido. Solicite um novo link na entrada administrativa.");
    setMessage("Senha definida com segurança. Você já pode entrar como administrador.");
    await supabase.auth.signOut();
    window.setTimeout(() => navigate({
      to: "/"
    }), 1200);
  }
  return /* @__PURE__ */ jsx("main", { className: "grid min-h-screen place-items-center bg-background px-5", children: /* @__PURE__ */ jsxs("section", { className: "w-full max-w-md rounded-3xl border bg-card p-6 shadow-pastoral", children: [
    /* @__PURE__ */ jsx("span", { className: "grid size-14 place-items-center rounded-2xl bg-secondary text-primary", children: /* @__PURE__ */ jsx(LockKeyhole, {}) }),
    /* @__PURE__ */ jsx("h1", { className: "mt-5 font-display text-3xl font-bold text-primary", children: "Definir senha administrativa" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: "Crie uma senha exclusiva. Ela não será exibida nem armazenada no aplicativo." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-password", children: "Nova senha" }),
        /* @__PURE__ */ jsx(Input, { id: "new-password", type: "password", autoComplete: "new-password", required: true, minLength: 8, maxLength: 72, value: password, onChange: (event) => setPassword(event.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-password", children: "Confirmar senha" }),
        /* @__PURE__ */ jsx(Input, { id: "confirm-password", type: "password", autoComplete: "new-password", required: true, minLength: 8, maxLength: 72, value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value) })
      ] }),
      message && /* @__PURE__ */ jsx("p", { className: "rounded-xl bg-secondary p-3 text-sm text-secondary-foreground", children: message }),
      /* @__PURE__ */ jsxs(Button, { className: "w-full", size: "touch", disabled: busy, children: [
        busy && /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
        busy ? "Salvando..." : "Salvar senha"
      ] })
    ] })
  ] }) });
}
export {
  ResetPasswordPage as component
};
