import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  Church,
  Download,
  Gift,
  HeartHandshake,
  Home,
  Images,
  Library,
  Loader2,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import type { Tables } from "@/integrations/supabase/types";
import { ensureChurchAdminRole } from "@/lib/admin.functions";
import logoAsset from "@/assets/ipf-logo.jpg.asset.json";
import socialActionAsset from "@/assets/talentos-do-reino.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { InstallAppPrompt } from "@/components/install-app-prompt";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Profile = Tables<"profiles">;
type Birthday = Tables<"birthday_directory">;
type GalleryItem = Tables<"gallery_items">;
type LibraryItem = Tables<"library_items">;
type Society = Tables<"society_groups">;
type ChurchContent = Tables<"church_content">;
type Tab = "home" | "cultos" | "community" | "library" | "more";
type Detail = "birthdays" | "gallery" | "prayer" | "social" | "location" | "admin" | null;

const schedules = [
  ["Domingo", "09h00", "Culto de Adoração"],
  ["Domingo", "10h15", "Escola Bíblica Dominical"],
  ["Domingo", "18h30", "Culto Vespertino"],
  ["Terça", "19h00", "Culto de Oração"],
  ["Quinta", "19h00", "Estudo Bíblico"],
  ["Sábado", "08h00", "Consagração"],
];

const staticBooks = [
  {
    title: "Catecismo Maior de Westminster",
    author: "Assembleia de Westminster",
    url: "https://www.monergismo.com/wp-content/uploads/2016/01/catecismo_maior_westminster.pdf",
  },
  {
    title: "Breve Catecismo de Westminster",
    author: "Assembleia de Westminster",
    url: "https://www.monergismo.com/wp-content/uploads/2015/01/breve_catecismo_westminster.pdf",
  },
  {
    title: "As Institutas da Religião Cristã",
    author: "João Calvino",
    url: "https://www.monergismo.com/wp-content/uploads/2016/01/institutos_religiao_crista_calvino.pdf",
  },
];

function Message({ text, danger = false }: { text: string; danger?: boolean }) {
  return (
    <div className={danger ? "rounded-xl bg-destructive/10 p-3 text-sm text-destructive" : "rounded-xl bg-secondary p-3 text-sm text-secondary-foreground"}>
      {text}
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src={logoAsset.url} alt="Logo da Igreja Presbiteriana Filadélfia" className={compact ? "size-10 rounded-full border-2 border-primary-foreground/30 object-cover" : "size-16 rounded-full border-4 border-card object-cover shadow-lg"} />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/65">Igreja Presbiteriana</p>
        <p className={compact ? "font-display text-xl text-primary-foreground" : "font-display text-2xl text-primary-foreground"}>Filadélfia</p>
      </div>
    </div>
  );
}

function AuthScreen() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const result = mode === "signup"
      ? await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword({ email: email.trim(), password });
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

  return (
    <main className="min-h-screen bg-background paper-texture">
      <section className="pastoral-gradient rounded-b-[2.5rem] px-6 pb-14 pt-12 shadow-pastoral">
        <div className="mx-auto max-w-md animate-gentle-rise">
          <Brand />
          <h1 className="mt-12 max-w-xs font-display text-4xl leading-tight text-primary-foreground">Uma igreja conectada para servir e caminhar junta.</h1>
          <p className="mt-4 text-sm leading-6 text-primary-foreground/70">Entre para acompanhar cultos, avisos, oração, sociedades e nossa biblioteca.</p>
        </div>
      </section>
      <section className="mx-auto -mt-7 max-w-md px-5 pb-10">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-pastoral">
          <div className="mb-5 flex rounded-xl bg-muted p-1">
            <Button type="button" variant={mode === "signup" ? "default" : "ghost"} className="h-10 flex-1 rounded-lg" onClick={() => setMode("signup")}>Criar cadastro</Button>
            <Button type="button" variant={mode === "login" ? "default" : "ghost"} className="h-10 flex-1 rounded-lg" onClick={() => setMode("login")}>Já tenho acesso</Button>
          </div>
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2"><Label htmlFor="auth-email">E-mail</Label><Input id="auth-email" type="email" autoComplete="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" placeholder="seu@email.com" /></div>
            <div className="space-y-2"><Label htmlFor="auth-password">Senha</Label><Input id="auth-password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={8} maxLength={72} value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl" placeholder="Mínimo de 8 caracteres" /></div>
            {message && <Message text={message} danger={!message.startsWith("Confira")} />}
            <Button size="touch" className="w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" />}{mode === "signup" ? "Continuar" : "Entrar"}</Button>
          </form>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou<span className="h-px flex-1 bg-border" /></div>
          <Button type="button" variant="outline" size="touch" className="w-full" onClick={googleLogin} disabled={busy}>Continuar com Google</Button>
          <p className="mt-5 text-center text-xs leading-5 text-muted-foreground"><LockKeyhole className="mr-1 inline size-3" /> Seus dados são protegidos e usados somente para o cuidado da comunidade.</p>
        </div>
      </section>
    </main>
  );
}

function Onboarding({ session, onDone }: { session: Session; onDone: (profile: Profile) => void }) {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [kind, setKind] = useState<"member" | "visitor" | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [hasReligion, setHasReligion] = useState<boolean | null>(null);
  const [religion, setReligion] = useState("");
  const [denomination, setDenomination] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!kind || fullName.trim().length < 3) return setError("Informe seu nome completo e escolha membro ou visitante.");
    if (kind === "member" && (!phone.trim() || !birthDate || !photo)) return setError("Para membros, telefone, nascimento e foto são necessários.");
    setBusy(true);
    setError("");
    let photoPath: string | null = null;
    if (photo) {
      if (!photo.type.startsWith("image/") || photo.size > 8 * 1024 * 1024) {
        setBusy(false);
        return setError("Escolha uma imagem de até 8 MB.");
      }
      photoPath = `${session.user.id}/profile-${Date.now()}.${photo.name.split(".").pop()?.toLowerCase() || "jpg"}`;
      const uploaded = await supabase.storage.from("profile-photos").upload(photoPath, photo, { upsert: true, contentType: photo.type });
      if (uploaded.error) { setBusy(false); return setError(uploaded.error.message); }
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
      onboarding_complete: true,
    } as const;
    const { data, error: saveError } = await supabase.from("profiles").insert(payload).select().single();
    setBusy(false);
    if (saveError) setError(saveError.message); else onDone(data);
  }

  return (
    <main className="min-h-screen bg-background pb-10">
      <header className="pastoral-gradient rounded-b-[2rem] px-5 pb-8 pt-10"><div className="mx-auto max-w-md"><Brand compact /><p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">Boas-vindas</p><h1 className="mt-2 font-display text-3xl text-primary-foreground">Vamos conhecer você?</h1><p className="mt-2 text-sm leading-6 text-primary-foreground/70">É um cadastro breve. Nenhuma resposta religiosa impede seu acesso.</p></div></header>
      <form onSubmit={submit} className="mx-auto max-w-md space-y-5 px-5 pt-6">
        <fieldset><legend className="mb-3 text-sm font-bold">Você é...</legend><div className="grid grid-cols-2 gap-3"><Button type="button" variant={kind === "member" ? "default" : "outline"} size="touch" onClick={() => setKind("member")}><Church />Membro</Button><Button type="button" variant={kind === "visitor" ? "default" : "outline"} size="touch" onClick={() => setKind("visitor")}><HeartHandshake />Visitante</Button></div></fieldset>
        {kind && <div className="animate-gentle-rise space-y-5">
          <div className="space-y-2"><Label htmlFor="full-name">Nome completo</Label><Input id="full-name" required minLength={3} maxLength={120} className="h-12 rounded-xl" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="phone">Telefone {kind === "visitor" && "(opcional)"}</Label><Input id="phone" type="tel" required={kind === "member"} maxLength={24} className="h-12 rounded-xl" placeholder="(21) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            {kind === "member" && <div className="space-y-2"><Label htmlFor="birth-date">Data de nascimento</Label><Input id="birth-date" type="date" required max={new Date().toISOString().slice(0, 10)} className="h-12 rounded-xl" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></div>}
          </div>
          {kind === "visitor" && <fieldset className="space-y-3 rounded-2xl bg-muted p-4"><legend className="px-1 text-sm font-bold">Você tem uma religião?</legend><div className="flex gap-2"><Button type="button" variant={hasReligion === true ? "default" : "outline"} onClick={() => setHasReligion(true)}>Sim</Button><Button type="button" variant={hasReligion === false ? "default" : "outline"} onClick={() => setHasReligion(false)}>Não</Button></div>{hasReligion === true && <><div className="space-y-2"><Label htmlFor="religion">Qual religião?</Label><Input id="religion" maxLength={100} value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="Ex.: cristã, católica..." /></div><div className="space-y-2"><Label htmlFor="denomination">Igreja ou denominação (se houver)</Label><Input id="denomination" maxLength={160} value={denomination} onChange={(e) => setDenomination(e.target.value)} /></div></>}</fieldset>}
          <div className="rounded-2xl border border-dashed border-primary/35 bg-secondary/40 p-4"><div className="flex items-start gap-3"><Camera className="mt-0.5 text-primary" /><div><Label className="text-sm font-bold">{kind === "member" ? "Foto de rosto" : "Foto para a igreja conhecer você (opcional)"}</Label><p className="mt-1 text-xs leading-5 text-muted-foreground">Escolha se deseja tirar uma foto agora ou buscar uma imagem salva no celular.</p></div></div><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"><Button type="button" variant="outline" size="touch" className="w-full bg-card" onClick={() => cameraInputRef.current?.click()}><Camera />Abrir câmera</Button><Button type="button" variant="outline" size="touch" className="w-full bg-card" onClick={() => galleryInputRef.current?.click()}><Images />Buscar na galeria</Button></div><Input ref={cameraInputRef} type="file" accept="image/*" capture="user" className="sr-only" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} /><Input ref={galleryInputRef} type="file" accept="image/*" className="sr-only" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />{photo && <p className="mt-3 truncate rounded-xl bg-card px-3 py-2 text-xs text-muted-foreground">Selecionada: {photo.name}</p>}{photo && <label className="mt-4 flex items-start gap-3 text-xs leading-5"><Checkbox checked={photoConsent} onCheckedChange={(v) => setPhotoConsent(v === true)} /><span>Autorizo o uso desta foto no diretório de aniversariantes e para identificação pastoral.</span></label>}</div>
          {kind === "member" && <Message text="Seu aniversário será incluído automaticamente no mês correspondente. O cadastro como membro ficará pendente de confirmação administrativa antes de liberar uploads no álbum." />}
          {error && <Message text={error} danger />}
          <Button size="touch" className="w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" />}Concluir cadastro</Button>
        </div>}
      </form>
    </main>
  );
}

function PageHeader({ title, subtitle, onBack }: { title: string; subtitle?: string; onBack: () => void }) {
  return <header className="pastoral-gradient px-5 pb-8 pt-8 text-primary-foreground shadow-pastoral"><div className="mx-auto max-w-3xl"><Button variant="ghost" size="sm" onClick={onBack} className="mb-5 -ml-2 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">← Voltar</Button><h1 className="font-display text-4xl font-bold tracking-tight">{title}</h1>{subtitle && <p className="mt-2 text-base text-primary-foreground/80">{subtitle}</p>}</div></header>;
}

function BirthdayView({ items, signedUrls }: { items: Birthday[]; signedUrls: Record<string, string> }) {
  const currentMonth = new Date().getMonth();
  const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date());
  const filtered = items.filter((item) => new Date(`${item.birth_date}T12:00:00`).getMonth() === currentMonth).sort((a, b) => Number(a.birth_date.slice(8)) - Number(b.birth_date.slice(8)));
  return <div className="mx-auto max-w-3xl space-y-3 px-5 py-6"><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Aniversariantes de {monthName}</h2>{filtered.length === 0 ? <Message text="Nenhum aniversariante cadastrado neste mês." /> : filtered.map((item) => <article key={item.profile_id} className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm"><div className="grid size-12 place-items-center rounded-xl bg-primary font-display text-xl text-primary-foreground">{item.birth_date.slice(8)}</div>{item.photo_path && signedUrls[item.photo_path] ? <img src={signedUrls[item.photo_path]} alt={`Foto de ${item.full_name}`} className="size-14 rounded-full object-cover" /> : <div className="grid size-14 place-items-center rounded-full bg-gold-soft text-xl">🎂</div>}<div><h3 className="font-bold">{item.full_name}</h3><p className="text-xs text-muted-foreground">Que Deus abençoe sua vida!</p></div></article>)}</div>;
}

function GalleryView({ profile, session, items, signedUrls, reload }: { profile: Profile; session: Session; items: GalleryItem[]; signedUrls: Record<string, string>; reload: () => Promise<void> }) {
  const [caption, setCaption] = useState(""); const [file, setFile] = useState<File | null>(null); const [accepted, setAccepted] = useState(false); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); if (!file || caption.trim().length < 3 || !accepted) return setMessage("Escolha uma foto, escreva uma descrição e aceite o termo."); if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) return setMessage("Escolha uma imagem de até 10 MB."); setBusy(true); const path = `${session.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`; const up = await supabase.storage.from("church-gallery").upload(path, file, { contentType: file.type }); if (up.error) { setBusy(false); return setMessage(up.error.message); } const saved = await supabase.from("gallery_items").insert({ uploader_id: session.user.id, uploader_name: profile.full_name, caption: caption.trim(), photo_path: path, responsibility_accepted: true }); setBusy(false); if (saved.error) setMessage(saved.error.message); else { setCaption(""); setFile(null); setAccepted(false); setMessage("Foto enviada para aprovação da administração."); await reload(); } }
  return <div className="mx-auto max-w-3xl px-5 py-6"><div className="rounded-2xl border border-gold/30 bg-gold-soft p-4 text-sm leading-6 text-accent-foreground"><ShieldCheck className="mb-2 text-gold" /><strong>Responsabilidade no envio.</strong> As fotografias devem ser exclusivamente de atividades espirituais ou ações que motivem a igreja a louvar e glorificar a Deus. Somente membros verificados podem enviar.</div>{profile.person_kind === "member" && profile.membership_status === "verified" && <form onSubmit={submit} className="my-6 space-y-4 rounded-2xl border bg-card p-4"><h2 className="font-bold">Compartilhar uma fotografia</h2><Input type="file" accept="image/*" capture="environment" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /><Textarea maxLength={500} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Descreva a atividade, culto ou momento..." /><label className="flex items-start gap-3 text-xs leading-5"><Checkbox checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} /><span>Li e assumo responsabilidade pela imagem e pelas pessoas que aparecem nela.</span></label>{message && <Message text={message} danger={!message.startsWith("Foto enviada")} />}<Button disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <Upload />}Enviar para aprovação</Button></form>}<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{items.filter((i) => i.is_approved).map((item) => <figure key={item.id} className="overflow-hidden rounded-2xl border bg-card"><img src={signedUrls[item.photo_path]} alt={item.caption} className="aspect-square w-full object-cover" loading="lazy" /><figcaption className="p-3 text-xs leading-5"><span className="block font-semibold">{item.caption}</span><span className="text-muted-foreground">Enviada por {item.uploader_name}</span></figcaption></figure>)}</div></div>;
}

function LibraryView({ items, signedUrls, isAdmin, session, reload }: { items: LibraryItem[]; signedUrls: Record<string, string>; isAdmin: boolean; session: Session; reload: () => Promise<void> }) {
  const [title, setTitle] = useState(""); const [author, setAuthor] = useState(""); const [file, setFile] = useState<File | null>(null); const [licensed, setLicensed] = useState(false); const [message, setMessage] = useState("");
  async function upload(event: FormEvent) { event.preventDefault(); if (!file || file.type !== "application/pdf" || !licensed || title.trim().length < 2) return setMessage("Informe o título, escolha um PDF e confirme a licença gratuita."); const path = `${session.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`; const up = await supabase.storage.from("library-pdfs").upload(path, file, { contentType: "application/pdf" }); if (up.error) return setMessage(up.error.message); const saved = await supabase.from("library_items").insert({ title: title.trim(), author: author.trim() || null, pdf_path: path, uploaded_by: session.user.id, is_free_licensed: true }); if (saved.error) setMessage(saved.error.message); else { setMessage("Livro publicado."); setTitle(""); setAuthor(""); setFile(null); setLicensed(false); await reload(); } }
  const all = [...staticBooks.map((b, i) => ({ id: `static-${i}`, ...b })), ...items.map((b) => ({ id: b.id, title: b.title, author: b.author || "", url: signedUrls[b.pdf_path] }))];
  return <div className="mx-auto max-w-3xl px-5 py-6">{isAdmin && <form onSubmit={upload} className="mb-6 space-y-3 rounded-2xl border bg-card p-4"><h2 className="font-bold">Adicionar PDF à biblioteca</h2><Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} placeholder="Título" /><Input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={160} placeholder="Autor" /><Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /><label className="flex gap-3 text-xs leading-5"><Checkbox checked={licensed} onCheckedChange={(v) => setLicensed(v === true)} /><span>Confirmo que esta cópia pode ser distribuída gratuitamente.</span></label>{message && <Message text={message} />}<Button><Upload />Publicar livro</Button></form>}<div className="space-y-3">{all.map((book) => <article key={book.id} className="flex items-center gap-4 rounded-2xl border bg-card p-4"><div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><BookOpen /></div><div className="min-w-0 flex-1"><h3 className="font-bold">{book.title}</h3><p className="truncate text-xs text-muted-foreground">{book.author}</p></div><Button asChild variant="outline" size="icon"><a href={book.url} target="_blank" rel="noreferrer" aria-label={`Ler ou baixar ${book.title}`}><Download /></a></Button></article>)}</div><p className="mt-5 text-xs leading-5 text-muted-foreground">Os títulos originais são oferecidos por repositório externo gratuito. A administração deve confirmar os direitos antes de adicionar novos PDFs.</p></div>;
}

function AdminView({ profiles, gallery, societies, session, reload }: { profiles: Profile[]; gallery: GalleryItem[]; societies: Society[]; session: Session; reload: () => Promise<void> }) {
  const [message, setMessage] = useState(""); const [contentType, setContentType] = useState("notice"); const [title, setTitle] = useState(""); const [body, setBody] = useState("");
  async function verify(id: string, status: "verified" | "rejected") { const result = await supabase.from("profiles").update({ membership_status: status }).eq("id", id); setMessage(result.error?.message || "Cadastro atualizado."); await reload(); }
  async function approve(id: string, approved: boolean) { const result = await supabase.from("gallery_items").update({ is_approved: approved }).eq("id", id); setMessage(result.error?.message || "Fotografia atualizada."); await reload(); }
  async function saveSociety(id: string, value: string) { const result = await supabase.from("society_groups").update({ whatsapp_url: value.trim() || null }).eq("id", id); setMessage(result.error?.message || "Link atualizado."); await reload(); }
  async function createContent(event: FormEvent) { event.preventDefault(); const result = await supabase.from("church_content").insert({ content_type: contentType, title: title.trim(), body: body.trim() || null, created_by: session.user.id }); setMessage(result.error?.message || "Conteúdo publicado."); if (!result.error) { setTitle(""); setBody(""); } await reload(); }
  return <div className="mx-auto max-w-3xl space-y-7 px-5 py-6">{message && <Message text={message} />}<section><h2 className="mb-3 font-display text-2xl">Membros aguardando confirmação</h2><div className="space-y-2">{profiles.filter((p) => p.person_kind === "member" && p.membership_status === "pending").map((p) => <div key={p.id} className="rounded-2xl border bg-card p-4"><p className="font-bold">{p.full_name}</p><p className="text-xs text-muted-foreground">{p.phone} · {p.birth_date}</p><div className="mt-3 flex gap-2"><Button size="sm" onClick={() => verify(p.id, "verified")}><CheckCircle2 />Confirmar membro</Button><Button size="sm" variant="outline" onClick={() => verify(p.id, "rejected")}>Recusar</Button></div></div>)}</div></section><section><h2 className="mb-3 font-display text-2xl">Fotos aguardando aprovação</h2><div className="space-y-2">{gallery.filter((g) => !g.is_approved).map((g) => <div key={g.id} className="rounded-2xl border bg-card p-4"><p className="font-bold">{g.caption}</p><p className="text-xs text-muted-foreground">Enviada por {g.uploader_name}</p><div className="mt-3 flex gap-2"><Button size="sm" onClick={() => approve(g.id, true)}>Aprovar</Button><Button size="sm" variant="destructive" onClick={() => supabase.from("gallery_items").delete().eq("id", g.id).then(reload)}>Apagar</Button></div></div>)}</div></section><section><h2 className="mb-3 font-display text-2xl">Links dos grupos de WhatsApp</h2><div className="space-y-3">{societies.map((s) => <form key={s.id} className="rounded-2xl border bg-card p-4" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); saveSociety(s.id, String(fd.get("url") || "")); }}><Label>{s.acronym} · {s.name}</Label><div className="mt-2 flex gap-2"><Input name="url" type="url" defaultValue={s.whatsapp_url || ""} placeholder="https://chat.whatsapp.com/..." /><Button type="submit">Salvar</Button></div></form>)}</div></section><section><h2 className="mb-3 font-display text-2xl">Publicar informação</h2><form onSubmit={createContent} className="space-y-3 rounded-2xl border bg-card p-4"><select aria-label="Tipo de conteúdo" className="h-11 w-full rounded-xl border bg-background px-3 text-sm" value={contentType} onChange={(e) => setContentType(e.target.value)}><option value="notice">Aviso</option><option value="event">Agenda</option><option value="devotional">Devocional</option><option value="liturgy">Liturgia</option><option value="social_action">Ação social</option><option value="about">Quem somos</option></select><Input required minLength={2} maxLength={160} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" /><Textarea maxLength={10000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Informação completa" /><Button><Plus />Publicar</Button></form></section></div>;
}

export function FiladelfiaApp() {
  const [session, setSession] = useState<Session | null>(null); const [profile, setProfile] = useState<Profile | null>(null); const [authReady, setAuthReady] = useState(false); const [tab, setTab] = useState<Tab>("home"); const [detail, setDetail] = useState<Detail>(null); const [isAdmin, setIsAdmin] = useState(false);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]); const [gallery, setGallery] = useState<GalleryItem[]>([]); const [books, setBooks] = useState<LibraryItem[]>([]); const [societies, setSocieties] = useState<Society[]>([]); const [content, setContent] = useState<ChurchContent[]>([]); const [profiles, setProfiles] = useState<Profile[]>([]); const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  async function loadData(userId: string) { await ensureChurchAdminRole(); const [p, role, b, g, l, s, c] = await Promise.all([supabase.from("profiles").select("*").eq("id", userId).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(), supabase.from("birthday_directory").select("*").order("birth_date"), supabase.from("gallery_items").select("*").order("created_at", { ascending: false }), supabase.from("library_items").select("*").order("created_at", { ascending: false }), supabase.from("society_groups").select("*").order("acronym"), supabase.from("church_content").select("*").order("created_at", { ascending: false })]); setProfile(p.data); setIsAdmin(role.data?.role === "admin"); setBirthdays(b.data || []); setGallery(g.data || []); setBooks(l.data || []); setSocieties(s.data || []); setContent(c.data || []); if (role.data?.role === "admin") { const all = await supabase.from("profiles").select("*").order("created_at", { ascending: false }); setProfiles(all.data || []); } const paths: Array<{ bucket: string; path: string }> = []; (b.data || []).forEach((x) => { if (x.photo_path) paths.push({ bucket: "profile-photos", path: x.photo_path }); }); (g.data || []).forEach((x) => paths.push({ bucket: "church-gallery", path: x.photo_path })); (l.data || []).forEach((x) => paths.push({ bucket: "library-pdfs", path: x.pdf_path })); const urls: Record<string, string> = {}; await Promise.all(paths.map(async ({ bucket, path }) => { const result = await supabase.storage.from(bucket).createSignedUrl(path, 3600); if (result.data) urls[path] = result.data.signedUrl; })); setSignedUrls(urls); }
  useEffect(() => { supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true); if (data.session) loadData(data.session.user.id); }); const { data } = supabase.auth.onAuthStateChange((event, next) => { if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) { setSession(next); if (next) setTimeout(() => loadData(next.user.id), 0); else setProfile(null); } }); return () => data.subscription.unsubscribe(); }, []);
  const nextCult = useMemo(() => ({ day: "Domingo", time: "09h00", title: "Culto de Adoração" }), []);
  if (!authReady) return <><div className="grid min-h-screen place-items-center bg-background"><Loader2 className="size-7 animate-spin text-primary" /></div><InstallAppPrompt /></>;
  if (!session) return <><AuthScreen /><InstallAppPrompt /></>;
  if (!profile?.onboarding_complete) return <><Onboarding session={session} onDone={(p) => { setProfile(p); loadData(session.user.id); }} /><InstallAppPrompt /></>;
  const reload = () => loadData(session.user.id);
  if (detail) return <main className="min-h-screen bg-background pb-10"><PageHeader title={detail === "birthdays" ? "Aniversariantes" : detail === "gallery" ? "Aconteceu e Foi Bom" : detail === "prayer" ? "Pedido de Oração" : detail === "social" ? "Ação Social" : detail === "location" ? "Como chegar" : "Central Administrativa"} subtitle={detail === "gallery" ? "Memórias que testemunham a graça de Deus" : detail === "social" ? "Uma igreja em movimento, servindo ao próximo" : undefined} onBack={() => setDetail(null)} />{detail === "birthdays" && <BirthdayView items={birthdays} signedUrls={signedUrls} />}{detail === "gallery" && <GalleryView profile={profile} session={session} items={gallery} signedUrls={signedUrls} reload={reload} />}{detail === "prayer" && <PrayerView session={session} />}{detail === "social" && <div className="mx-auto max-w-3xl space-y-5 px-5 py-6"><article className="overflow-hidden rounded-3xl border bg-card shadow-pastoral"><img src={socialActionAsset.url} alt="Curso de costura e modelagem para iniciantes — Talentos do Reino" className="aspect-[3/2] w-full object-cover" /><div className="p-5 sm:p-7"><span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-sm font-bold text-accent-foreground">Projeto em destaque</span><h2 className="mt-4 font-display text-3xl font-bold text-primary">Talentos do Reino</h2><p className="mt-3 text-lg leading-8 text-muted-foreground">Curso de costura e modelagem para iniciantes, com proposta evangelística, social e de inserção no mercado de trabalho.</p></div></article><article className="rounded-3xl border-2 border-primary/20 bg-card p-5 shadow-sm sm:p-7"><div className="flex items-center gap-4"><div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">✂️</div><div className="min-w-0"><h2 className="font-display text-2xl font-bold text-primary">Curso de corte e costura</h2><p className="text-base text-muted-foreground">Coordenação: Irmã Patrícia</p></div></div><p className="mt-5 text-lg leading-8 text-muted-foreground">O projeto <strong className="text-primary">Talentos do Reino</strong> é uma iniciativa da IPF que oferece curso de costura básica para mulheres da comunidade, com duplo objetivo: evangelístico e social, proporcionando qualificação profissional.</p><blockquote className="mt-5 rounded-2xl border-l-4 border-primary bg-secondary/50 p-5 text-lg italic leading-8 text-primary">“Uma igreja, uma pessoa — glorificar a Deus transformando vidas através do serviço ao próximo.”</blockquote><div className="mt-5 rounded-2xl bg-gold-soft p-4 text-base leading-7 text-accent-foreground"><strong>Mais informações:</strong> compareça à igreja na terça-feira, às 17h, e procure a irmã Patrícia ou o irmão Eduardo.</div></article></div>}{detail === "location" && <div className="mx-auto max-w-3xl px-5 py-6"><div className="overflow-hidden rounded-3xl border bg-card"><iframe title="Mapa da Igreja Presbiteriana Filadélfia" className="h-64 w-full border-0" src="https://maps.google.com/maps?q=Rua+Vicente+de+Lima+Cleto,+250,+Nova+Cidade,+São+Gonçalo,+RJ&output=embed&z=15" loading="lazy" /><div className="p-5"><p className="font-bold">Rua Vicente de Lima Cleto, 250</p><p className="text-sm text-muted-foreground">Nova Cidade · São Gonçalo, RJ</p><Button asChild className="mt-4"><a href="https://www.google.com/maps/search/?api=1&query=Rua+Vicente+de+Lima+Cleto+250+São+Gonçalo+RJ" target="_blank" rel="noreferrer">Abrir no mapa</a></Button></div></div></div>}{detail === "admin" && isAdmin && <AdminView profiles={profiles} gallery={gallery} societies={societies} session={session} reload={reload} />}</main>;
  return <main className="min-h-screen bg-background pb-24"><header className="pastoral-gradient rounded-b-[2rem] px-5 pb-8 pt-9 text-primary-foreground"><div className="mx-auto max-w-3xl"><div className="flex items-center justify-between"><Brand compact /><Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => supabase.auth.signOut()} aria-label="Sair"><LogOut /></Button></div>{tab === "home" && <><p className="mt-8 text-sm text-primary-foreground/65">Olá, {profile.full_name.split(" ")[0]}</p><h1 className="mt-1 font-display text-3xl">Paz seja com você.</h1></>}{tab !== "home" && <h1 className="mt-8 font-display text-3xl">{tab === "cultos" ? "Cultos" : tab === "community" ? "Comunidade" : tab === "library" ? "Biblioteca" : "Mais"}</h1>}</div></header><div className="mx-auto max-w-3xl">{tab === "home" && <HomeView nextCult={nextCult} content={content} setDetail={setDetail} setTab={setTab} />}{tab === "cultos" && <CultosView />}{tab === "community" && <CommunityView societies={societies} />}{tab === "library" && <LibraryView items={books} signedUrls={signedUrls} isAdmin={isAdmin} session={session} reload={reload} />}{tab === "more" && <MoreView isAdmin={isAdmin} setDetail={setDetail} signOut={() => supabase.auth.signOut()} />}</div><nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-3xl border-t bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur"><div className="grid grid-cols-5">{([{ id: "home", label: "Início", icon: Home }, { id: "cultos", label: "Cultos", icon: Church }, { id: "community", label: "Comunidade", icon: Users }, { id: "library", label: "Livros", icon: Library }, { id: "more", label: "Mais", icon: Menu }] as const).map(({ id, label, icon: Icon }) => <Button key={id} variant="ghost" className={tab === id ? "h-14 flex-col gap-1 rounded-xl text-primary" : "h-14 flex-col gap-1 rounded-xl text-muted-foreground"} onClick={() => { setTab(id); setDetail(null); }}><Icon className="size-5" /><span className="text-[10px]">{label}</span></Button>)}</div></nav></main>;
}

function PrayerView({ session }: { session: Session }) { const [subject, setSubject] = useState(""); const [message, setMessage] = useState(""); const [status, setStatus] = useState(""); async function submit(e: FormEvent) { e.preventDefault(); const r = await supabase.from("prayer_requests").insert({ requester_id: session.user.id, subject: subject.trim(), message: message.trim(), is_private: true }); setStatus(r.error?.message || "Pedido enviado. Estaremos orando por você."); if (!r.error) { setSubject(""); setMessage(""); } } return <form onSubmit={submit} className="mx-auto max-w-3xl space-y-4 px-5 py-6"><blockquote className="rounded-2xl bg-secondary p-5 font-display text-lg leading-7 text-secondary-foreground">“Em tudo sejam os vossos pedidos conhecidos diante de Deus.”<footer className="mt-2 font-sans text-xs font-bold">Filipenses 4:6</footer></blockquote><div className="space-y-2"><Label htmlFor="prayer-subject">Assunto</Label><Input id="prayer-subject" required minLength={3} maxLength={160} value={subject} onChange={(e) => setSubject(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="prayer-message">Seu pedido</Label><Textarea id="prayer-message" required minLength={5} maxLength={3000} className="min-h-36" value={message} onChange={(e) => setMessage(e.target.value)} /></div>{status && <Message text={status} />}<Button size="touch"><HeartHandshake />Enviar pedido</Button></form>; }

function HomeView({ nextCult, content, setDetail, setTab }: { nextCult: { day: string; time: string; title: string }; content: ChurchContent[]; setDetail: (d: Detail) => void; setTab: (t: Tab) => void }) { const actions = [{ label: "Pedido de Oração", description: "Compartilhe seu pedido", icon: HeartHandshake, go: () => setDetail("prayer") }, { label: "Aniversariantes", description: "Celebre com a comunidade", icon: Gift, go: () => setDetail("birthdays") }, { label: "Aconteceu e Foi Bom", description: "Veja nossas memórias", icon: Images, go: () => setDetail("gallery") }, { label: "Ação Social", description: "Conheça o Talentos do Reino", icon: Sparkles, go: () => setDetail("social") }, { label: "Localização", description: "Encontre nossa igreja", icon: MapPin, go: () => setDetail("location") }, { label: "Sociedades", description: "Participe dos grupos", icon: Users, go: () => setTab("community") }]; return <div className="px-5 py-6"><section className="rounded-3xl bg-forest-deep p-6 text-primary-foreground shadow-pastoral"><p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground/70">Próximo culto</p><div className="mt-4 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"><div className="min-w-0"><h2 className="font-display text-3xl font-bold">{nextCult.title}</h2><p className="mt-2 text-base text-primary-foreground/80">{nextCult.day} · {nextCult.time}</p></div><Button variant="hero" size="touch" onClick={() => setTab("cultos")}>Ver cultos</Button></div></section><h2 className="mb-4 mt-8 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">Acesso rápido</h2><div className="space-y-3">{actions.map(({ label, description, icon: Icon, go }) => <Button key={label} variant="outline" onClick={go} className="grid h-auto min-h-20 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 whitespace-normal rounded-2xl border-2 bg-card p-4 text-left shadow-sm"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-6" /></span><span className="min-w-0"><span className="block text-lg font-bold leading-6">{label}</span><span className="block text-base font-normal leading-6 text-muted-foreground">{description}</span></span><ChevronRight className="shrink-0 text-primary" /></Button>)}</div><section className="mt-8"><div className="flex items-center justify-between"><h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">Avisos recentes</h2><Bell className="size-5 text-primary" /></div><div className="mt-4 space-y-3">{content.filter((c) => c.content_type === "notice").slice(0, 3).map((c) => <article key={c.id} className="rounded-2xl border-2 bg-card p-5"><h3 className="text-lg font-bold">{c.title}</h3><p className="mt-2 line-clamp-3 text-base leading-7 text-muted-foreground">{c.body || c.summary}</p></article>)}{content.filter((c) => c.content_type === "notice").length === 0 && <Message text="Nenhum aviso publicado no momento." />}</div></section></div>; }

function CultosView() { return <div className="px-5 py-6"><div className="space-y-3">{schedules.map(([day, time, title], index) => <article key={`${day}-${time}`} className="flex items-center gap-4 rounded-2xl border bg-card p-4"><div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-sm font-bold text-primary">{time}</div><div className="flex-1"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{day}</p><h2 className="font-bold">{title}</h2></div>{index === 0 && <span className="rounded-full bg-gold-soft px-2 py-1 text-[10px] font-bold text-accent-foreground">PRÓXIMO</span>}</article>)}</div><div className="mt-5 grid grid-cols-2 gap-3"><Button asChild variant="outline" size="touch"><a href="https://www.google.com/maps/search/?api=1&query=Rua+Vicente+de+Lima+Cleto+250+São+Gonçalo+RJ" target="_blank" rel="noreferrer"><MapPin />Como chegar</a></Button><Button asChild size="touch"><a href="https://www.youtube.com/@IPBFilad%C3%A9lfiaems%C3%A3ogon%C3%A7alo/streams" target="_blank" rel="noreferrer">Culto online</a></Button></div></div>; }

function CommunityView({ societies }: { societies: Society[] }) { return <div className="px-5 py-6"><p className="mb-5 text-sm leading-6 text-muted-foreground">Conheça as sociedades e ministérios. Quando um convite oficial estiver cadastrado, o botão abre diretamente o grupo no WhatsApp.</p><div className="space-y-3">{societies.map((s) => <article key={s.id} className="flex items-center gap-4 rounded-2xl border bg-card p-4"><div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary font-display text-sm text-primary">{s.acronym.slice(0, 4)}</div><div className="min-w-0 flex-1"><h2 className="font-bold">{s.name}</h2><p className="line-clamp-1 text-xs text-muted-foreground">{s.description}</p></div>{s.whatsapp_url ? <Button asChild variant="pastoral" size="icon"><a href={s.whatsapp_url} target="_blank" rel="noreferrer" aria-label={`Entrar no grupo ${s.name}`}><MessageCircle /></a></Button> : <span className="text-[10px] text-muted-foreground">Link pendente</span>}</article>)}</div></div>; }

function MoreView({ isAdmin, setDetail, signOut }: { isAdmin: boolean; setDetail: (d: Detail) => void; signOut: () => void }) { const items = [{ label: "Fale com o Pastor", icon: MessageCircle, href: "https://wa.me/5521987361216" }, { label: "Contribuições", icon: HeartHandshake, href: "#" }, { label: "Como chegar", icon: MapPin, action: () => setDetail("location") }]; return <div className="px-5 py-6"><div className="overflow-hidden rounded-2xl border bg-card">{items.map(({ label, icon: Icon, href, action }) => href && href !== "#" ? <a key={label} href={href} target="_blank" rel="noreferrer" className="flex min-h-16 items-center gap-4 border-b px-4 last:border-0"><Icon className="text-primary" /><span className="flex-1 font-semibold">{label}</span><ChevronRight className="text-muted-foreground" /></a> : <Button key={label} variant="ghost" onClick={action || (() => {})} className="h-16 w-full justify-start gap-4 rounded-none border-b px-4 last:border-0"><Icon className="text-primary" /><span className="flex-1 text-left font-semibold">{label}</span><ChevronRight className="text-muted-foreground" /></Button>)}{isAdmin && <Button variant="ghost" onClick={() => setDetail("admin")} className="h-16 w-full justify-start gap-4 rounded-none border-b px-4"><ShieldCheck className="text-primary" /><span className="flex-1 text-left font-semibold">Central Administrativa</span><ChevronRight className="text-muted-foreground" /></Button>}<Button variant="ghost" onClick={signOut} className="h-16 w-full justify-start gap-4 rounded-none px-4 text-destructive"><LogOut /><span className="font-semibold">Sair</span></Button></div></div>; }