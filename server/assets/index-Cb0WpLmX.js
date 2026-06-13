import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { Check, Loader2, LogOut, Home, Church, Users, Library, Menu, LockKeyhole, HeartHandshake, Camera, Images, ShieldCheck, Upload, CheckCircle2, Plus, Gift, Sparkles, MapPin, ChevronRight, Bell, MessageCircle, BookOpen, Download } from "lucide-react";
import { s as supabase } from "./client-ycPsap7o.js";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { c as cn, B as Button } from "./router-cVL4NQ9S.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
const url$1 = "/__l5e/assets-v1/dd9aa310-1325-4147-b635-25cf525f18be/ipf-logo.jpg";
const logoAsset = {
  url: url$1
};
const url = "/__l5e/assets-v1/6ccb30b0-df65-48d7-b2bd-8cbcee81fefd/talentos-do-reino.jpg";
const socialActionAsset = {
  url
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const schedules = [
  ["Domingo", "09h00", "Culto de Adoração"],
  ["Domingo", "10h15", "Escola Bíblica Dominical"],
  ["Domingo", "18h30", "Culto Vespertino"],
  ["Terça", "19h00", "Culto de Oração"],
  ["Quinta", "19h00", "Estudo Bíblico"],
  ["Sábado", "08h00", "Consagração"]
];
const staticBooks = [
  {
    title: "Catecismo Maior de Westminster",
    author: "Assembleia de Westminster",
    url: "https://www.monergismo.com/wp-content/uploads/2016/01/catecismo_maior_westminster.pdf"
  },
  {
    title: "Breve Catecismo de Westminster",
    author: "Assembleia de Westminster",
    url: "https://www.monergismo.com/wp-content/uploads/2015/01/breve_catecismo_westminster.pdf"
  },
  {
    title: "As Institutas da Religião Cristã",
    author: "João Calvino",
    url: "https://www.monergismo.com/wp-content/uploads/2016/01/institutos_religiao_crista_calvino.pdf"
  }
];
function Message({ text, danger = false }) {
  return /* @__PURE__ */ jsx("div", { className: danger ? "rounded-xl bg-destructive/10 p-3 text-sm text-destructive" : "rounded-xl bg-secondary p-3 text-sm text-secondary-foreground", children: text });
}
function Brand({ compact = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("img", { src: logoAsset.url, alt: "Logo da Igreja Presbiteriana Filadélfia", className: compact ? "size-10 rounded-full border-2 border-primary-foreground/30 object-cover" : "size-16 rounded-full border-4 border-card object-cover shadow-lg" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/65", children: "Igreja Presbiteriana" }),
      /* @__PURE__ */ jsx("p", { className: compact ? "font-display text-xl text-primary-foreground" : "font-display text-2xl text-primary-foreground", children: "Filadélfia" })
    ] })
  ] });
}
function AuthScreen() {
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const result = mode === "signup" ? await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin } }) : await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (result.error) setMessage(result.error.message);
    else if (mode === "signup") setMessage("Confira seu e-mail para confirmar o cadastro e entrar.");
  }
  async function googleLogin() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setMessage(result.error.message);
    setBusy(false);
  }
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background paper-texture", children: [
    /* @__PURE__ */ jsx("section", { className: "pastoral-gradient rounded-b-[2.5rem] px-6 pb-14 pt-12 shadow-pastoral", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md animate-gentle-rise", children: [
      /* @__PURE__ */ jsx(Brand, {}),
      /* @__PURE__ */ jsx("h1", { className: "mt-12 max-w-xs font-display text-4xl leading-tight text-primary-foreground", children: "Uma igreja conectada para servir e caminhar junta." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-6 text-primary-foreground/70", children: "Entre para acompanhar cultos, avisos, oração, sociedades e nossa biblioteca." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto -mt-7 max-w-md px-5 pb-10", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-5 shadow-pastoral", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex rounded-xl bg-muted p-1", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: mode === "signup" ? "default" : "ghost", className: "h-10 flex-1 rounded-lg", onClick: () => setMode("signup"), children: "Criar cadastro" }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: mode === "login" ? "default" : "ghost", className: "h-10 flex-1 rounded-lg", onClick: () => setMode("login"), children: "Já tenho acesso" })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "auth-email", children: "E-mail" }),
          /* @__PURE__ */ jsx(Input, { id: "auth-email", type: "email", autoComplete: "email", required: true, maxLength: 255, value: email, onChange: (e) => setEmail(e.target.value), className: "h-12 rounded-xl", placeholder: "seu@email.com" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "auth-password", children: "Senha" }),
          /* @__PURE__ */ jsx(Input, { id: "auth-password", type: "password", autoComplete: mode === "signup" ? "new-password" : "current-password", required: true, minLength: 8, maxLength: 72, value: password, onChange: (e) => setPassword(e.target.value), className: "h-12 rounded-xl", placeholder: "Mínimo de 8 caracteres" })
        ] }),
        message && /* @__PURE__ */ jsx(Message, { text: message, danger: !message.startsWith("Confira") }),
        /* @__PURE__ */ jsxs(Button, { size: "touch", className: "w-full", disabled: busy, children: [
          busy && /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
          mode === "signup" ? "Continuar" : "Entrar"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-5 flex items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" }),
        "ou",
        /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "touch", className: "w-full", onClick: googleLogin, disabled: busy, children: "Continuar com Google" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-5 text-center text-xs leading-5 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(LockKeyhole, { className: "mr-1 inline size-3" }),
        " Seus dados são protegidos e usados somente para o cuidado da comunidade."
      ] })
    ] }) })
  ] });
}
function Onboarding({ session, onDone }) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [kind, setKind] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [hasReligion, setHasReligion] = useState(null);
  const [religion, setReligion] = useState("");
  const [denomination, setDenomination] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (!kind || fullName.trim().length < 3) return setError("Informe seu nome completo e escolha membro ou visitante.");
    if (kind === "member" && (!phone.trim() || !birthDate || !photo)) return setError("Para membros, telefone, nascimento e foto são necessários.");
    setBusy(true);
    setError("");
    let photoPath = null;
    if (photo) {
      if (!photo.type.startsWith("image/") || photo.size > 8 * 1024 * 1024) {
        setBusy(false);
        return setError("Escolha uma imagem de até 8 MB.");
      }
      photoPath = `${session.user.id}/profile-${Date.now()}.${photo.name.split(".").pop()?.toLowerCase() || "jpg"}`;
      const uploaded = await supabase.storage.from("profile-photos").upload(photoPath, photo, { upsert: true, contentType: photo.type });
      if (uploaded.error) {
        setBusy(false);
        return setError(uploaded.error.message);
      }
    }
    const payload = {
      id: session.user.id,
      full_name: fullName.trim(),
      person_kind: kind,
      phone: phone.trim() || null,
      birth_date: birthDate || null,
      has_religion: kind === "visitor" ? hasReligion : true,
      religion: kind === "visitor" ? religion.trim() || null : "Cristã",
      church_denomination: kind === "visitor" ? denomination.trim() || null : "Igreja Presbiteriana Filadélfia",
      photo_path: photoPath,
      photo_consent: Boolean(photo && photoConsent),
      onboarding_complete: true
    };
    const { data, error: saveError } = await supabase.from("profiles").insert(payload).select().single();
    setBusy(false);
    if (saveError) setError(saveError.message);
    else onDone(data);
  }
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background pb-10", children: [
    /* @__PURE__ */ jsx("header", { className: "pastoral-gradient rounded-b-[2rem] px-5 pb-8 pt-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md", children: [
      /* @__PURE__ */ jsx(Brand, { compact: true }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60", children: "Boas-vindas" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-3xl text-primary-foreground", children: "Vamos conhecer você?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-primary-foreground/70", children: "É um cadastro breve. Nenhuma resposta religiosa impede seu acesso." })
    ] }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mx-auto max-w-md space-y-5 px-5 pt-6", children: [
      /* @__PURE__ */ jsxs("fieldset", { children: [
        /* @__PURE__ */ jsx("legend", { className: "mb-3 text-sm font-bold", children: "Você é..." }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: kind === "member" ? "default" : "outline", size: "touch", onClick: () => setKind("member"), children: [
            /* @__PURE__ */ jsx(Church, {}),
            "Membro"
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: kind === "visitor" ? "default" : "outline", size: "touch", onClick: () => setKind("visitor"), children: [
            /* @__PURE__ */ jsx(HeartHandshake, {}),
            "Visitante"
          ] })
        ] })
      ] }),
      kind && /* @__PURE__ */ jsxs("div", { className: "animate-gentle-rise space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "full-name", children: "Nome completo" }),
          /* @__PURE__ */ jsx(Input, { id: "full-name", required: true, minLength: 3, maxLength: 120, className: "h-12 rounded-xl", value: fullName, onChange: (e) => setFullName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "phone", children: [
              "Telefone ",
              kind === "visitor" && "(opcional)"
            ] }),
            /* @__PURE__ */ jsx(Input, { id: "phone", type: "tel", required: kind === "member", maxLength: 24, className: "h-12 rounded-xl", placeholder: "(21) 99999-9999", value: phone, onChange: (e) => setPhone(e.target.value) })
          ] }),
          kind === "member" && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "birth-date", children: "Data de nascimento" }),
            /* @__PURE__ */ jsx(Input, { id: "birth-date", type: "date", required: true, max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), className: "h-12 rounded-xl", value: birthDate, onChange: (e) => setBirthDate(e.target.value) })
          ] })
        ] }),
        kind === "visitor" && /* @__PURE__ */ jsxs("fieldset", { className: "space-y-3 rounded-2xl bg-muted p-4", children: [
          /* @__PURE__ */ jsx("legend", { className: "px-1 text-sm font-bold", children: "Você tem uma religião?" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Button, { type: "button", variant: hasReligion === true ? "default" : "outline", onClick: () => setHasReligion(true), children: "Sim" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: hasReligion === false ? "default" : "outline", onClick: () => setHasReligion(false), children: "Não" })
          ] }),
          hasReligion === true && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "religion", children: "Qual religião?" }),
              /* @__PURE__ */ jsx(Input, { id: "religion", maxLength: 100, value: religion, onChange: (e) => setReligion(e.target.value), placeholder: "Ex.: cristã, católica..." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "denomination", children: "Igreja ou denominação (se houver)" }),
              /* @__PURE__ */ jsx(Input, { id: "denomination", maxLength: 160, value: denomination, onChange: (e) => setDenomination(e.target.value) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-primary/35 bg-secondary/40 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Camera, { className: "mt-0.5 text-primary" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-sm font-bold", children: kind === "member" ? "Foto de rosto" : "Foto para a igreja conhecer você (opcional)" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Escolha se deseja tirar uma foto agora ou buscar uma imagem salva no celular." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "touch", className: "w-full bg-card", onClick: () => cameraInputRef.current?.click(), children: [
              /* @__PURE__ */ jsx(Camera, {}),
              "Abrir câmera"
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "touch", className: "w-full bg-card", onClick: () => galleryInputRef.current?.click(), children: [
              /* @__PURE__ */ jsx(Images, {}),
              "Buscar na galeria"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Input, { ref: cameraInputRef, type: "file", accept: "image/*", capture: "user", className: "sr-only", onChange: (e) => setPhoto(e.target.files?.[0] ?? null) }),
          /* @__PURE__ */ jsx(Input, { ref: galleryInputRef, type: "file", accept: "image/*", className: "sr-only", onChange: (e) => setPhoto(e.target.files?.[0] ?? null) }),
          photo && /* @__PURE__ */ jsxs("p", { className: "mt-3 truncate rounded-xl bg-card px-3 py-2 text-xs text-muted-foreground", children: [
            "Selecionada: ",
            photo.name
          ] }),
          photo && /* @__PURE__ */ jsxs("label", { className: "mt-4 flex items-start gap-3 text-xs leading-5", children: [
            /* @__PURE__ */ jsx(Checkbox, { checked: photoConsent, onCheckedChange: (v) => setPhotoConsent(v === true) }),
            /* @__PURE__ */ jsx("span", { children: "Autorizo o uso desta foto no diretório de aniversariantes e para identificação pastoral." })
          ] })
        ] }),
        kind === "member" && /* @__PURE__ */ jsx(Message, { text: "Seu aniversário será incluído automaticamente no mês correspondente. O cadastro como membro ficará pendente de confirmação administrativa antes de liberar uploads no álbum." }),
        error && /* @__PURE__ */ jsx(Message, { text: error, danger: true }),
        /* @__PURE__ */ jsxs(Button, { size: "touch", className: "w-full", disabled: busy, children: [
          busy && /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
          "Concluir cadastro"
        ] })
      ] })
    ] })
  ] });
}
function PageHeader({ title, subtitle, onBack }) {
  return /* @__PURE__ */ jsx("header", { className: "pastoral-gradient px-5 pb-8 pt-8 text-primary-foreground shadow-pastoral", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: onBack, className: "mb-5 -ml-2 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground", children: "← Voltar" }),
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl font-bold tracking-tight", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "mt-2 text-base text-primary-foreground/80", children: subtitle })
  ] }) });
}
function BirthdayView({ items, signedUrls }) {
  const currentMonth = (/* @__PURE__ */ new Date()).getMonth();
  const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(/* @__PURE__ */ new Date());
  const filtered = items.filter((item) => (/* @__PURE__ */ new Date(`${item.birth_date}T12:00:00`)).getMonth() === currentMonth).sort((a, b) => Number(a.birth_date.slice(8)) - Number(b.birth_date.slice(8)));
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-3 px-5 py-6", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground", children: [
      "Aniversariantes de ",
      monthName
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsx(Message, { text: "Nenhum aniversariante cadastrado neste mês." }) : filtered.map((item) => /* @__PURE__ */ jsxs("article", { className: "flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "grid size-12 place-items-center rounded-xl bg-primary font-display text-xl text-primary-foreground", children: item.birth_date.slice(8) }),
      item.photo_path && signedUrls[item.photo_path] ? /* @__PURE__ */ jsx("img", { src: signedUrls[item.photo_path], alt: `Foto de ${item.full_name}`, className: "size-14 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "grid size-14 place-items-center rounded-full bg-gold-soft text-xl", children: "🎂" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold", children: item.full_name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Que Deus abençoe sua vida!" })
      ] })
    ] }, item.profile_id))
  ] });
}
function GalleryView({ profile, session, items, signedUrls, reload }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (!file || caption.trim().length < 3 || !accepted) return setMessage("Escolha uma foto, escreva uma descrição e aceite o termo.");
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) return setMessage("Escolha uma imagem de até 10 MB.");
    setBusy(true);
    const path = `${session.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const up = await supabase.storage.from("church-gallery").upload(path, file, { contentType: file.type });
    if (up.error) {
      setBusy(false);
      return setMessage(up.error.message);
    }
    const saved = await supabase.from("gallery_items").insert({ uploader_id: session.user.id, uploader_name: profile.full_name, caption: caption.trim(), photo_path: path, responsibility_accepted: true });
    setBusy(false);
    if (saved.error) setMessage(saved.error.message);
    else {
      setCaption("");
      setFile(null);
      setAccepted(false);
      setMessage("Foto enviada para aprovação da administração.");
      await reload();
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-5 py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gold/30 bg-gold-soft p-4 text-sm leading-6 text-accent-foreground", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mb-2 text-gold" }),
      /* @__PURE__ */ jsx("strong", { children: "Responsabilidade no envio." }),
      " As fotografias devem ser exclusivamente de atividades espirituais ou ações que motivem a igreja a louvar e glorificar a Deus. Somente membros verificados podem enviar."
    ] }),
    profile.person_kind === "member" && profile.membership_status === "verified" && /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "my-6 space-y-4 rounded-2xl border bg-card p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "Compartilhar uma fotografia" }),
      /* @__PURE__ */ jsx(Input, { type: "file", accept: "image/*", capture: "environment", onChange: (e) => setFile(e.target.files?.[0] ?? null) }),
      /* @__PURE__ */ jsx(Textarea, { maxLength: 500, value: caption, onChange: (e) => setCaption(e.target.value), placeholder: "Descreva a atividade, culto ou momento..." }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 text-xs leading-5", children: [
        /* @__PURE__ */ jsx(Checkbox, { checked: accepted, onCheckedChange: (v) => setAccepted(v === true) }),
        /* @__PURE__ */ jsx("span", { children: "Li e assumo responsabilidade pela imagem e pelas pessoas que aparecem nela." })
      ] }),
      message && /* @__PURE__ */ jsx(Message, { text: message, danger: !message.startsWith("Foto enviada") }),
      /* @__PURE__ */ jsxs(Button, { disabled: busy, children: [
        busy ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Upload, {}),
        "Enviar para aprovação"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3", children: items.filter((i) => i.is_approved).map((item) => /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-2xl border bg-card", children: [
      /* @__PURE__ */ jsx("img", { src: signedUrls[item.photo_path], alt: item.caption, className: "aspect-square w-full object-cover", loading: "lazy" }),
      /* @__PURE__ */ jsxs("figcaption", { className: "p-3 text-xs leading-5", children: [
        /* @__PURE__ */ jsx("span", { className: "block font-semibold", children: item.caption }),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          "Enviada por ",
          item.uploader_name
        ] })
      ] })
    ] }, item.id)) })
  ] });
}
function LibraryView({ items, signedUrls, isAdmin, session, reload }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [licensed, setLicensed] = useState(false);
  const [message, setMessage] = useState("");
  async function upload(event) {
    event.preventDefault();
    if (!file || file.type !== "application/pdf" || !licensed || title.trim().length < 2) return setMessage("Informe o título, escolha um PDF e confirme a licença gratuita.");
    const path = `${session.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const up = await supabase.storage.from("library-pdfs").upload(path, file, { contentType: "application/pdf" });
    if (up.error) return setMessage(up.error.message);
    const saved = await supabase.from("library_items").insert({ title: title.trim(), author: author.trim() || null, pdf_path: path, uploaded_by: session.user.id, is_free_licensed: true });
    if (saved.error) setMessage(saved.error.message);
    else {
      setMessage("Livro publicado.");
      setTitle("");
      setAuthor("");
      setFile(null);
      setLicensed(false);
      await reload();
    }
  }
  const all = [...staticBooks.map((b, i) => ({ id: `static-${i}`, ...b })), ...items.map((b) => ({ id: b.id, title: b.title, author: b.author || "", url: signedUrls[b.pdf_path] }))];
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-5 py-6", children: [
    isAdmin && /* @__PURE__ */ jsxs("form", { onSubmit: upload, className: "mb-6 space-y-3 rounded-2xl border bg-card p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "Adicionar PDF à biblioteca" }),
      /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), maxLength: 200, placeholder: "Título" }),
      /* @__PURE__ */ jsx(Input, { value: author, onChange: (e) => setAuthor(e.target.value), maxLength: 160, placeholder: "Autor" }),
      /* @__PURE__ */ jsx(Input, { type: "file", accept: "application/pdf", onChange: (e) => setFile(e.target.files?.[0] ?? null) }),
      /* @__PURE__ */ jsxs("label", { className: "flex gap-3 text-xs leading-5", children: [
        /* @__PURE__ */ jsx(Checkbox, { checked: licensed, onCheckedChange: (v) => setLicensed(v === true) }),
        /* @__PURE__ */ jsx("span", { children: "Confirmo que esta cópia pode ser distribuída gratuitamente." })
      ] }),
      message && /* @__PURE__ */ jsx(Message, { text: message }),
      /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Upload, {}),
        "Publicar livro"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: all.map((book) => /* @__PURE__ */ jsxs("article", { className: "flex items-center gap-4 rounded-2xl border bg-card p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary", children: /* @__PURE__ */ jsx(BookOpen, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold", children: book.title }),
        /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", children: book.author })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "icon", children: /* @__PURE__ */ jsx("a", { href: book.url, target: "_blank", rel: "noreferrer", "aria-label": `Ler ou baixar ${book.title}`, children: /* @__PURE__ */ jsx(Download, {}) }) })
    ] }, book.id)) }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-xs leading-5 text-muted-foreground", children: "Os títulos originais são oferecidos por repositório externo gratuito. A administração deve confirmar os direitos antes de adicionar novos PDFs." })
  ] });
}
function AdminView({ profiles, gallery, societies, session, reload }) {
  const [message, setMessage] = useState("");
  const [contentType, setContentType] = useState("notice");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  async function verify(id, status) {
    const result = await supabase.from("profiles").update({ membership_status: status }).eq("id", id);
    setMessage(result.error?.message || "Cadastro atualizado.");
    await reload();
  }
  async function approve(id, approved) {
    const result = await supabase.from("gallery_items").update({ is_approved: approved }).eq("id", id);
    setMessage(result.error?.message || "Fotografia atualizada.");
    await reload();
  }
  async function saveSociety(id, value) {
    const result = await supabase.from("society_groups").update({ whatsapp_url: value.trim() || null }).eq("id", id);
    setMessage(result.error?.message || "Link atualizado.");
    await reload();
  }
  async function createContent(event) {
    event.preventDefault();
    const result = await supabase.from("church_content").insert({ content_type: contentType, title: title.trim(), body: body.trim() || null, created_by: session.user.id });
    setMessage(result.error?.message || "Conteúdo publicado.");
    if (!result.error) {
      setTitle("");
      setBody("");
    }
    await reload();
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-7 px-5 py-6", children: [
    message && /* @__PURE__ */ jsx(Message, { text: message }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 font-display text-2xl", children: "Membros aguardando confirmação" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: profiles.filter((p) => p.person_kind === "member" && p.membership_status === "pending").map((p) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: p.full_name }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          p.phone,
          " · ",
          p.birth_date
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => verify(p.id, "verified"), children: [
            /* @__PURE__ */ jsx(CheckCircle2, {}),
            "Confirmar membro"
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => verify(p.id, "rejected"), children: "Recusar" })
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 font-display text-2xl", children: "Fotos aguardando aprovação" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: gallery.filter((g) => !g.is_approved).map((g) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: g.caption }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Enviada por ",
          g.uploader_name
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => approve(g.id, true), children: "Aprovar" }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "destructive", onClick: () => supabase.from("gallery_items").delete().eq("id", g.id).then(reload), children: "Apagar" })
        ] })
      ] }, g.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 font-display text-2xl", children: "Links dos grupos de WhatsApp" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: societies.map((s) => /* @__PURE__ */ jsxs("form", { className: "rounded-2xl border bg-card p-4", onSubmit: (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        saveSociety(s.id, String(fd.get("url") || ""));
      }, children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          s.acronym,
          " · ",
          s.name
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2", children: [
          /* @__PURE__ */ jsx(Input, { name: "url", type: "url", defaultValue: s.whatsapp_url || "", placeholder: "https://chat.whatsapp.com/..." }),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: "Salvar" })
        ] })
      ] }, s.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 font-display text-2xl", children: "Publicar informação" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: createContent, className: "space-y-3 rounded-2xl border bg-card p-4", children: [
        /* @__PURE__ */ jsxs("select", { "aria-label": "Tipo de conteúdo", className: "h-11 w-full rounded-xl border bg-background px-3 text-sm", value: contentType, onChange: (e) => setContentType(e.target.value), children: [
          /* @__PURE__ */ jsx("option", { value: "notice", children: "Aviso" }),
          /* @__PURE__ */ jsx("option", { value: "event", children: "Agenda" }),
          /* @__PURE__ */ jsx("option", { value: "devotional", children: "Devocional" }),
          /* @__PURE__ */ jsx("option", { value: "liturgy", children: "Liturgia" }),
          /* @__PURE__ */ jsx("option", { value: "social_action", children: "Ação social" }),
          /* @__PURE__ */ jsx("option", { value: "about", children: "Quem somos" })
        ] }),
        /* @__PURE__ */ jsx(Input, { required: true, minLength: 2, maxLength: 160, value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Título" }),
        /* @__PURE__ */ jsx(Textarea, { maxLength: 1e4, value: body, onChange: (e) => setBody(e.target.value), placeholder: "Informação completa" }),
        /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, {}),
          "Publicar"
        ] })
      ] })
    ] })
  ] });
}
function FiladelfiaApp() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [tab, setTab] = useState("home");
  const [detail, setDetail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [birthdays, setBirthdays] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [books, setBooks] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [content, setContent] = useState([]);
  const [publicPrayers, setPublicPrayers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [signedUrls, setSignedUrls] = useState({});
  async function loadData(userId) {
    const [p, role, b, g, l, s, c, prayers] = await Promise.all([supabase.from("profiles").select("*").eq("id", userId).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(), supabase.from("birthday_directory").select("*").order("birth_date"), supabase.from("gallery_items").select("*").order("created_at", { ascending: false }), supabase.from("library_items").select("*").order("created_at", { ascending: false }), supabase.from("society_groups").select("*").order("acronym"), supabase.from("church_content").select("*").order("created_at", { ascending: false }), supabase.from("prayer_publications").select("*").order("created_at", { ascending: false })]);
    setProfile(p.data);
    setIsAdmin(role.data?.role === "admin");
    setBirthdays(b.data || []);
    setGallery(g.data || []);
    setBooks(l.data || []);
    setSocieties(s.data || []);
    setContent(c.data || []);
    setPublicPrayers(prayers.data || []);
    if (role.data?.role === "admin") {
      const all = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      setProfiles(all.data || []);
    }
    const paths = [];
    (b.data || []).forEach((x) => {
      if (x.photo_path) paths.push({ bucket: "profile-photos", path: x.photo_path });
    });
    (g.data || []).forEach((x) => paths.push({ bucket: "church-gallery", path: x.photo_path }));
    (l.data || []).forEach((x) => paths.push({ bucket: "library-pdfs", path: x.pdf_path }));
    const urls = {};
    await Promise.all(paths.map(async ({ bucket, path }) => {
      const result = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
      if (result.data) urls[path] = result.data.signedUrl;
    }));
    setSignedUrls(urls);
  }
  useEffect(() => {
    supabase.auth.getSession().then(({ data: data2 }) => {
      setSession(data2.session);
      setAuthReady(true);
      if (data2.session) loadData(data2.session.user.id);
    });
    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) {
        setSession(next);
        if (next) setTimeout(() => loadData(next.user.id), 0);
        else setProfile(null);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);
  const nextCult = useMemo(() => ({ day: "Domingo", time: "09h00", title: "Culto de Adoração" }), []);
  if (!authReady) return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-background", children: /* @__PURE__ */ jsx(Loader2, { className: "size-7 animate-spin text-primary" }) });
  if (!session) return /* @__PURE__ */ jsx(AuthScreen, {});
  if (!profile?.onboarding_complete) return /* @__PURE__ */ jsx(Onboarding, { session, onDone: (p) => {
    setProfile(p);
    loadData(session.user.id);
  } });
  const reload = () => loadData(session.user.id);
  if (detail) return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background pb-10", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: detail === "birthdays" ? "Aniversariantes" : detail === "gallery" ? "Aconteceu e Foi Bom" : detail === "prayer" ? "Pedidos de Oração" : detail === "social" ? "Ação Social" : detail === "location" ? "Como chegar" : "Central Administrativa", subtitle: detail === "gallery" ? "Memórias que testemunham a graça de Deus" : detail === "social" ? "Uma igreja em movimento, servindo ao próximo" : void 0, onBack: () => setDetail(null) }),
    detail === "birthdays" && /* @__PURE__ */ jsx(BirthdayView, { items: birthdays, signedUrls }),
    detail === "gallery" && /* @__PURE__ */ jsx(GalleryView, { profile, session, items: gallery, signedUrls, reload }),
    detail === "prayer" && /* @__PURE__ */ jsx(PrayerView, { session, profile, publicPrayers, reload }),
    detail === "social" && /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-5 px-5 py-6", children: [
      /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-3xl border bg-card shadow-pastoral", children: [
        /* @__PURE__ */ jsx("img", { src: socialActionAsset.url, alt: "Curso de costura e modelagem para iniciantes — Talentos do Reino", className: "aspect-[3/2] w-full object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-7", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full bg-gold-soft px-3 py-1 text-sm font-bold text-accent-foreground", children: "Projeto em destaque" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 font-display text-3xl font-bold text-primary", children: "Talentos do Reino" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg leading-8 text-muted-foreground", children: "Curso de costura e modelagem para iniciantes, com proposta evangelística, social e de inserção no mercado de trabalho." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "rounded-3xl border-2 border-primary/20 bg-card p-5 shadow-sm sm:p-7", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "grid size-14 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl", children: "✂️" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold text-primary", children: "Curso de corte e costura" }),
            /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground", children: "Coordenação: Irmã Patrícia" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-5 text-lg leading-8 text-muted-foreground", children: [
          "O projeto ",
          /* @__PURE__ */ jsx("strong", { className: "text-primary", children: "Talentos do Reino" }),
          " é uma iniciativa da IPF que oferece curso de costura básica para mulheres da comunidade, com duplo objetivo: evangelístico e social, proporcionando qualificação profissional."
        ] }),
        /* @__PURE__ */ jsx("blockquote", { className: "mt-5 rounded-2xl border-l-4 border-primary bg-secondary/50 p-5 text-lg italic leading-8 text-primary", children: "“Uma igreja, uma pessoa — glorificar a Deus transformando vidas através do serviço ao próximo.”" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl bg-gold-soft p-4 text-base leading-7 text-accent-foreground", children: [
          /* @__PURE__ */ jsx("strong", { children: "Mais informações:" }),
          " compareça à igreja na terça-feira, às 17h, e procure a irmã Patrícia ou o irmão Eduardo."
        ] })
      ] })
    ] }),
    detail === "location" && /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl px-5 py-6", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-3xl border bg-card", children: [
      /* @__PURE__ */ jsx("iframe", { title: "Mapa da Igreja Presbiteriana Filadélfia", className: "h-64 w-full border-0", src: "https://maps.google.com/maps?q=Rua+Vicente+de+Lima+Cleto,+250,+Nova+Cidade,+São+Gonçalo,+RJ&output=embed&z=15", loading: "lazy" }),
      /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Rua Vicente de Lima Cleto, 250" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Nova Cidade · São Gonçalo, RJ" }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsx("a", { href: "https://www.google.com/maps/search/?api=1&query=Rua+Vicente+de+Lima+Cleto+250+São+Gonçalo+RJ", target: "_blank", rel: "noreferrer", children: "Abrir no mapa" }) })
      ] })
    ] }) }),
    detail === "admin" && isAdmin && /* @__PURE__ */ jsx(AdminView, { profiles, gallery, societies, session, reload })
  ] });
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background pb-24", children: [
    /* @__PURE__ */ jsx("header", { className: "pastoral-gradient rounded-b-[2rem] px-5 pb-8 pt-9 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Brand, { compact: true }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "text-primary-foreground hover:bg-primary-foreground/10", onClick: () => supabase.auth.signOut(), "aria-label": "Sair", children: /* @__PURE__ */ jsx(LogOut, {}) })
      ] }),
      tab === "home" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-8 text-sm text-primary-foreground/65", children: [
          "Olá, ",
          profile.full_name.split(" ")[0]
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 font-display text-3xl", children: "Paz seja com você." })
      ] }),
      tab !== "home" && /* @__PURE__ */ jsx("h1", { className: "mt-8 font-display text-3xl", children: tab === "cultos" ? "Cultos" : tab === "community" ? "Comunidade" : tab === "library" ? "Biblioteca" : "Mais" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      tab === "home" && /* @__PURE__ */ jsx(HomeView, { nextCult, content, setDetail, setTab }),
      tab === "cultos" && /* @__PURE__ */ jsx(CultosView, {}),
      tab === "community" && /* @__PURE__ */ jsx(CommunityView, { societies }),
      tab === "library" && /* @__PURE__ */ jsx(LibraryView, { items: books, signedUrls, isAdmin, session, reload }),
      tab === "more" && /* @__PURE__ */ jsx(MoreView, { isAdmin, setDetail, signOut: () => supabase.auth.signOut() })
    ] }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Navegação principal", className: "fixed inset-x-0 bottom-0 z-40 mx-auto max-w-3xl border-t bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5", children: [{ id: "home", label: "Início", icon: Home }, { id: "cultos", label: "Cultos", icon: Church }, { id: "community", label: "Comunidade", icon: Users }, { id: "library", label: "Livros", icon: Library }, { id: "more", label: "Mais", icon: Menu }].map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: tab === id ? "h-14 flex-col gap-1 rounded-xl text-primary" : "h-14 flex-col gap-1 rounded-xl text-muted-foreground", onClick: () => {
      setTab(id);
      setDetail(null);
    }, children: [
      /* @__PURE__ */ jsx(Icon, { className: "size-5" }),
      /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: label })
    ] }, id)) }) })
  ] });
}
function PrayerView({ session, profile, publicPrayers, reload }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [showName, setShowName] = useState(true);
  const [directedTo, setDirectedTo] = useState("conselho");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();
    const cleanPhone = phone.replace(/[^0-9+()\-\s]/g, "").trim();
    if (cleanSubject.length < 3 || cleanMessage.length < 5) return setStatus("Escreva o assunto e o pedido de oração.");
    if (cleanPhone && cleanPhone.replace(/\D/g, "").length < 8) return setStatus("Confira o telefone ou deixe o campo vazio.");
    setBusy(true);
    setStatus("");
    const saved = await supabase.from("prayer_requests").insert({
      requester_id: session.user.id,
      requester_name: showName ? profile.full_name : null,
      subject: cleanSubject,
      message: cleanMessage,
      is_private: !isPublic,
      publication_status: isPublic ? "published" : "private",
      directed_to: directedTo,
      contact_phone: cleanPhone || null,
      contact_authorized: Boolean(cleanPhone)
    });
    setBusy(false);
    if (saved.error) return setStatus("Não foi possível enviar agora. Tente novamente.");
    const destination = directedTo === "pastor" ? "Pastor" : directedTo === "igreja" ? "Igreja" : "Conselho";
    const whatsappText = [
      "*Novo pedido de oração — Filadélfia Conecta*",
      `Destino: ${destination}`,
      `Nome: ${showName ? profile.full_name : "Não informado"}`,
      `Assunto: ${cleanSubject}`,
      `Pedido: ${cleanMessage}`,
      `Telefone para contato: ${cleanPhone || "Não compartilhado"}`,
      `Visibilidade: ${isPublic ? "Público no mural de oração" : "Reservado"}`
    ].join("\n");
    setSubject("");
    setMessage("");
    setPhone("");
    setStatus("Pedido registrado. O WhatsApp será aberto para encaminhamento ao cuidado pastoral.");
    await reload();
    window.location.assign(`https://wa.me/5521987361216?text=${encodeURIComponent(whatsappText)}`);
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-8 px-5 py-6", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("blockquote", { className: "rounded-2xl bg-secondary p-5 font-display text-lg leading-7 text-secondary-foreground", children: [
        "“Em tudo sejam os vossos pedidos conhecidos diante de Deus.”",
        /* @__PURE__ */ jsx("footer", { className: "mt-2 font-sans text-xs font-bold", children: "Filipenses 4:6" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "prayer-subject", children: "Assunto" }),
        /* @__PURE__ */ jsx(Input, { id: "prayer-subject", required: true, minLength: 3, maxLength: 160, value: subject, onChange: (e) => setSubject(e.target.value), placeholder: "Por quem ou pelo que devemos orar?" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "prayer-message", children: "Seu pedido" }),
        /* @__PURE__ */ jsx(Textarea, { id: "prayer-message", required: true, minLength: 5, maxLength: 3e3, className: "min-h-36", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Escreva aqui seu pedido de oração..." })
      ] }),
      /* @__PURE__ */ jsxs("fieldset", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("legend", { className: "text-sm font-bold", children: "Quem deve receber este pedido?" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-3", children: [["conselho", "Conselho"], ["pastor", "Pastor"], ["igreja", "Toda a igreja"]].map(([value, label]) => /* @__PURE__ */ jsx(Button, { type: "button", variant: directedTo === value ? "default" : "outline", onClick: () => setDirectedTo(value), children: label }, value)) })
      ] }),
      /* @__PURE__ */ jsxs("fieldset", { className: "rounded-2xl border bg-card p-4", children: [
        /* @__PURE__ */ jsx("legend", { className: "px-1 text-sm font-bold", children: "Este pedido pode aparecer no mural?" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: isPublic ? "default" : "outline", onClick: () => setIsPublic(true), children: "Sim, pedido público" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: !isPublic ? "default" : "outline", onClick: () => setIsPublic(false), children: "Não, pedido reservado" })
        ] }),
        isPublic && /* @__PURE__ */ jsxs("label", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsx(Checkbox, { checked: showName, onCheckedChange: (value) => setShowName(value === true) }),
          /* @__PURE__ */ jsx("span", { children: "Mostrar meu nome junto ao pedido público" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs leading-5 text-muted-foreground", children: "Seu telefone nunca será publicado no mural." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-2xl bg-gold-soft p-4", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "prayer-phone", children: "Telefone para contato (opcional)" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-6 text-accent-foreground", children: "Deseja compartilhar seu telefone para que as pessoas responsáveis entrem em contato, conversem e orem pessoalmente com você?" }),
        /* @__PURE__ */ jsx(Input, { id: "prayer-phone", type: "tel", inputMode: "tel", maxLength: 24, value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "(21) 99999-9999 — opcional" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-accent-foreground", children: "Deixe em branco se não desejar receber contato." })
      ] }),
      status && /* @__PURE__ */ jsx(Message, { text: status, danger: status.startsWith("Não") || status.startsWith("Confira") || status.startsWith("Escreva") }),
      /* @__PURE__ */ jsxs(Button, { size: "touch", className: "w-full", disabled: busy, children: [
        busy ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(HeartHandshake, {}),
        busy ? "Enviando..." : "Enviar pedido de oração"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { "aria-labelledby": "prayer-wall-title", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground", children: "Comunidade em oração" }),
        /* @__PURE__ */ jsx("h2", { id: "prayer-wall-title", className: "font-display text-3xl font-bold text-primary", children: "Pedidos públicos" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Ore por uma necessidade específica da nossa comunidade." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: publicPrayers.length === 0 ? /* @__PURE__ */ jsx(Message, { text: "Ainda não há pedidos públicos. Você pode ser a primeira pessoa a compartilhar." }) : publicPrayers.map((prayer) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-primary", children: prayer.subject }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: prayer.requester_name })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground", children: "🙏 Orando" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground", children: prayer.message })
      ] }, prayer.prayer_request_id)) })
    ] })
  ] });
}
function HomeView({ nextCult, content, setDetail, setTab }) {
  const actions = [{ label: "Pedido de Oração", description: "Compartilhe seu pedido", icon: HeartHandshake, go: () => setDetail("prayer") }, { label: "Aniversariantes", description: "Celebre com a comunidade", icon: Gift, go: () => setDetail("birthdays") }, { label: "Aconteceu e Foi Bom", description: "Veja nossas memórias", icon: Images, go: () => setDetail("gallery") }, { label: "Ação Social", description: "Conheça o Talentos do Reino", icon: Sparkles, go: () => setDetail("social") }, { label: "Localização", description: "Encontre nossa igreja", icon: MapPin, go: () => setDetail("location") }, { label: "Sociedades", description: "Participe dos grupos", icon: Users, go: () => setTab("community") }];
  return /* @__PURE__ */ jsxs("div", { className: "px-5 py-6", children: [
    /* @__PURE__ */ jsxs("section", { className: "rounded-3xl bg-forest-deep p-6 text-primary-foreground shadow-pastoral", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground/70", children: "Próximo culto" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: nextCult.title }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-base text-primary-foreground/80", children: [
            nextCult.day,
            " · ",
            nextCult.time
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "hero", size: "touch", onClick: () => setTab("cultos"), children: "Ver cultos" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mb-4 mt-8 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground", children: "Acesso rápido" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: actions.map(({ label, description, icon: Icon, go }) => /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: go, className: "grid h-auto min-h-20 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 whitespace-normal rounded-2xl border-2 bg-card p-4 text-left shadow-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "size-6" }) }),
      /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-lg font-bold leading-6", children: label }),
        /* @__PURE__ */ jsx("span", { className: "block text-base font-normal leading-6 text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "shrink-0 text-primary" })
    ] }, label)) }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground", children: "Avisos recentes" }),
        /* @__PURE__ */ jsx(Bell, { className: "size-5 text-primary" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3", children: [
        content.filter((c) => c.content_type === "notice").slice(0, 3).map((c) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border-2 bg-card p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: c.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-base leading-7 text-muted-foreground", children: c.body || c.summary })
        ] }, c.id)),
        content.filter((c) => c.content_type === "notice").length === 0 && /* @__PURE__ */ jsx(Message, { text: "Nenhum aviso publicado no momento." })
      ] })
    ] })
  ] });
}
function CultosView() {
  return /* @__PURE__ */ jsxs("div", { className: "px-5 py-6", children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: schedules.map(([day, time, title], index) => /* @__PURE__ */ jsxs("article", { className: "flex items-center gap-4 rounded-2xl border bg-card p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-sm font-bold text-primary", children: time }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: day }),
        /* @__PURE__ */ jsx("h2", { className: "font-bold", children: title })
      ] }),
      index === 0 && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-gold-soft px-2 py-1 text-[10px] font-bold text-accent-foreground", children: "PRÓXIMO" })
    ] }, `${day}-${time}`)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "touch", children: /* @__PURE__ */ jsxs("a", { href: "https://www.google.com/maps/search/?api=1&query=Rua+Vicente+de+Lima+Cleto+250+São+Gonçalo+RJ", target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsx(MapPin, {}),
        "Como chegar"
      ] }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "touch", children: /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/@IPBFilad%C3%A9lfiaems%C3%A3ogon%C3%A7alo/streams", target: "_blank", rel: "noreferrer", children: "Culto online" }) })
    ] })
  ] });
}
function CommunityView({ societies }) {
  return /* @__PURE__ */ jsxs("div", { className: "px-5 py-6", children: [
    /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm leading-6 text-muted-foreground", children: "Conheça as sociedades e ministérios. Quando um convite oficial estiver cadastrado, o botão abre diretamente o grupo no WhatsApp." }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: societies.map((s) => /* @__PURE__ */ jsxs("article", { className: "flex items-center gap-4 rounded-2xl border bg-card p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid size-12 shrink-0 place-items-center rounded-xl bg-secondary font-display text-sm text-primary", children: s.acronym.slice(0, 4) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold", children: s.name }),
        /* @__PURE__ */ jsx("p", { className: "line-clamp-1 text-xs text-muted-foreground", children: s.description })
      ] }),
      s.whatsapp_url ? /* @__PURE__ */ jsx(Button, { asChild: true, variant: "pastoral", size: "icon", children: /* @__PURE__ */ jsx("a", { href: s.whatsapp_url, target: "_blank", rel: "noreferrer", "aria-label": `Entrar no grupo ${s.name}`, children: /* @__PURE__ */ jsx(MessageCircle, {}) }) }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground", children: "Link pendente" })
    ] }, s.id)) })
  ] });
}
function MoreView({ isAdmin, setDetail, signOut }) {
  const items = [{ label: "Fale com o Pastor", icon: MessageCircle, href: "https://wa.me/5521987361216" }, { label: "Contribuições", icon: HeartHandshake, href: "#" }, { label: "Como chegar", icon: MapPin, action: () => setDetail("location") }];
  return /* @__PURE__ */ jsx("div", { className: "px-5 py-6", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl border bg-card", children: [
    items.map(({ label, icon: Icon, href, action }) => href && href !== "#" ? /* @__PURE__ */ jsxs("a", { href, target: "_blank", rel: "noreferrer", className: "flex min-h-16 items-center gap-4 border-b px-4 last:border-0", children: [
      /* @__PURE__ */ jsx(Icon, { className: "text-primary" }),
      /* @__PURE__ */ jsx("span", { className: "flex-1 font-semibold", children: label }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "text-muted-foreground" })
    ] }, label) : /* @__PURE__ */ jsxs(Button, { variant: "ghost", onClick: action || (() => {
    }), className: "h-16 w-full justify-start gap-4 rounded-none border-b px-4 last:border-0", children: [
      /* @__PURE__ */ jsx(Icon, { className: "text-primary" }),
      /* @__PURE__ */ jsx("span", { className: "flex-1 text-left font-semibold", children: label }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "text-muted-foreground" })
    ] }, label)),
    isAdmin && /* @__PURE__ */ jsxs(Button, { variant: "ghost", onClick: () => setDetail("admin"), className: "h-16 w-full justify-start gap-4 rounded-none border-b px-4", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "text-primary" }),
      /* @__PURE__ */ jsx("span", { className: "flex-1 text-left font-semibold", children: "Central Administrativa" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxs(Button, { variant: "ghost", onClick: signOut, className: "h-16 w-full justify-start gap-4 rounded-none px-4 text-destructive", children: [
      /* @__PURE__ */ jsx(LogOut, {}),
      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Sair" })
    ] })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsx(FiladelfiaApp, {});
}
export {
  Index as component
};
