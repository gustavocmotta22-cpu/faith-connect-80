import { useEffect, useState, type FormEvent } from "react";
import { Camera, Loader2, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";
import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { getTodayDevotional } from "@/lib/devotional.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type Devotional = Tables<"devotionals">;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/); const lines: string[] = []; let line = "";
  for (const word of words) { const next = line ? `${line} ${word}` : word; if (context.measureText(next).width > maxWidth && line) { lines.push(line); line = word; } else line = next; }
  if (line) lines.push(line); return lines;
}

async function shareImage(item: Devotional) {
  const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1350;
  const context = canvas.getContext("2d"); if (!context) return;
  const gradient = context.createLinearGradient(0, 0, 1080, 1350); gradient.addColorStop(0, "#123f31"); gradient.addColorStop(1, "#28664d"); context.fillStyle = gradient; context.fillRect(0, 0, 1080, 1350);
  context.fillStyle = "#e9c978"; context.font = "700 28px sans-serif"; context.fillText("DEVOCIONAL DO DIA · ARA", 80, 100);
  context.fillStyle = "#ffffff"; context.font = "700 64px serif"; let y = 190;
  for (const line of wrapText(context, item.title, 920).slice(0, 3)) { context.fillText(line, 80, y); y += 76; }
  context.fillStyle = "#f8f2df"; context.font = "italic 38px serif"; y += 35;
  for (const line of wrapText(context, `“${item.verse_text}”`, 920).slice(0, 8)) { context.fillText(line, 80, y); y += 54; }
  context.fillStyle = "#e9c978"; context.font = "700 34px sans-serif"; context.fillText(`${item.verse_reference} · ARA`, 80, y + 20);
  context.fillStyle = "#ffffff"; context.font = "700 30px sans-serif"; context.fillText("IGREJA PRESBITERIANA FILADÉLFIA", 80, 1260);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png")); if (!blob) return;
  const file = new File([blob], `devocional-${item.devotional_date}.png`, { type: "image/png" });
  if (navigator.share && navigator.canShare?.({ files: [file] })) await navigator.share({ title: item.title, files: [file] });
  else { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = file.name; link.click(); URL.revokeObjectURL(url); }
}

export function DevotionalView() {
  const fetchToday = useServerFn(getTodayDevotional); const [item, setItem] = useState<Devotional | null>(null); const [error, setError] = useState("");
  useEffect(() => { fetchToday().then(setItem).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Não foi possível carregar o devocional.")); }, [fetchToday]);
  if (error) return <div className="mx-auto max-w-3xl px-5 py-6"><div className="rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">{error}</div></div>;
  if (!item) return <div className="grid min-h-72 place-items-center"><div className="text-center"><Loader2 className="mx-auto animate-spin text-primary" /><p className="mt-3 text-sm text-muted-foreground">Preparando o devocional de hoje...</p></div></div>;
  return <div className="mx-auto max-w-3xl space-y-4 px-5 py-6">
    <article className="overflow-hidden rounded-3xl border bg-card shadow-pastoral">
      <header className="pastoral-gradient p-6 text-primary-foreground"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/70">{formatDate(item.devotional_date)}</p><h2 className="mt-3 font-display text-3xl font-bold leading-tight">{item.title}</h2><blockquote className="mt-5 border-l-4 border-gold pl-4 text-lg italic leading-8">“{item.verse_text}”</blockquote><p className="mt-3 font-bold text-gold-soft">{item.verse_reference} · ARA</p></header>
      <div className="space-y-4 p-5"><section className="rounded-2xl bg-muted p-5"><h3 className="font-display text-xl font-bold text-primary">📚 Reflexão</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-muted-foreground">{item.reflection}</p></section><section className="rounded-2xl bg-gold-soft p-5"><h3 className="font-display text-xl font-bold text-accent-foreground">✋ Aplicação</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-accent-foreground">{item.application}</p></section><section className="rounded-2xl bg-secondary p-5"><h3 className="font-display text-xl font-bold text-primary">🙏 Oração</h3><p className="mt-2 whitespace-pre-wrap italic leading-7 text-secondary-foreground">{item.prayer || "Senhor, aplica esta Palavra ao nosso coração e guia nossos passos neste dia. Amém."}</p></section>{item.author && <p className="text-right text-xs text-muted-foreground">{item.author}</p>}</div>
    </article><Button size="touch" className="w-full" onClick={() => shareImage(item)}><Camera />📸 Compartilhar como Imagem</Button>
  </div>;
}

const emptyForm = { devotional_date: "", title: "", verse_text: "", verse_reference: "", reflection: "", application: "", prayer: "", author: "" };

export function AdminDevotionals({ items, session, reload }: { items: Devotional[]; session: Session; reload: () => Promise<void> }) {
  const [form, setForm] = useState(emptyForm); const [editingId, setEditingId] = useState<string | null>(null); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  function field(name: keyof typeof emptyForm) { return { value: form[name], onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [name]: event.target.value })) }; }
  async function save(event: FormEvent) { event.preventDefault(); setBusy(true); const payload = { ...form, prayer: form.prayer.trim() || null, author: form.author.trim() || null, bible_version: "ARA", source: "admin", created_by: session.user.id }; const result = editingId ? await supabase.from("devotionals").update(payload).eq("id", editingId) : await supabase.from("devotionals").insert(payload); setBusy(false); setMessage(result.error?.message || "Devocional salvo com sucesso."); if (!result.error) { setForm(emptyForm); setEditingId(null); await reload(); } }
  function edit(item: Devotional) { setEditingId(item.id); setForm({ devotional_date: item.devotional_date, title: item.title, verse_text: item.verse_text, verse_reference: item.verse_reference, reflection: item.reflection, application: item.application, prayer: item.prayer || "", author: item.author || "" }); window.scrollTo({ top: 0, behavior: "smooth" }); }
  async function remove(id: string) { if (!window.confirm("Excluir este devocional?")) return; const result = await supabase.from("devotionals").delete().eq("id", id); setMessage(result.error?.message || "Devocional excluído."); await reload(); }
  return <section className="space-y-5"><div><h2 className="font-display text-2xl font-bold">Admin · Devocionais</h2><p className="text-sm text-muted-foreground">Todo versículo deve ser copiado da versão ARA.</p></div><form onSubmit={save} className="space-y-4 rounded-2xl border bg-card p-4"><div className="space-y-2"><Label htmlFor="dev-date">Data *</Label><Input id="dev-date" type="date" required {...field("devotional_date")} /></div><div className="space-y-2"><Label htmlFor="dev-title">Título *</Label><Input id="dev-title" required minLength={2} maxLength={160} {...field("title")} /></div><div className="space-y-2"><Label htmlFor="dev-verse">Versículo ARA *</Label><Textarea id="dev-verse" required maxLength={2000} {...field("verse_text")} /></div><div className="space-y-2"><Label htmlFor="dev-ref">Referência *</Label><Input id="dev-ref" required maxLength={120} placeholder="Ex.: João 3:16" {...field("verse_reference")} /></div><div className="space-y-2"><Label htmlFor="dev-reflection">Reflexão *</Label><Textarea id="dev-reflection" required maxLength={10000} className="min-h-32" {...field("reflection")} /></div><div className="space-y-2"><Label htmlFor="dev-application">Aplicação *</Label><Textarea id="dev-application" required maxLength={5000} {...field("application")} /></div><div className="space-y-2"><Label htmlFor="dev-prayer">Oração (opcional)</Label><Textarea id="dev-prayer" maxLength={5000} {...field("prayer")} /></div><div className="space-y-2"><Label htmlFor="dev-author">Autor (opcional)</Label><Input id="dev-author" maxLength={160} {...field("author")} /></div>{message && <p className="rounded-xl bg-secondary p-3 text-sm">{message}</p>}<div className="flex gap-2"><Button disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : editingId ? <Pencil /> : <Plus />}{editingId ? "Salvar alterações" : "Cadastrar devocional"}</Button>{editingId && <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancelar</Button>}</div></form><div><h3 className="mb-3 font-display text-xl font-bold">30 mais recentes</h3><div className="space-y-2">{items.slice(0, 30).map((item) => <article key={item.id} className="flex items-center gap-3 rounded-2xl border bg-card p-4"><div className="min-w-0 flex-1"><p className="font-bold">{item.title}</p><p className="text-xs text-muted-foreground">{formatDate(item.devotional_date)} · {item.source === "admin" ? "ADM" : "Gemini"}</p></div><Button type="button" variant="outline" size="icon" onClick={() => edit(item)} aria-label={`Editar ${item.title}`}><Pencil /></Button><Button type="button" variant="destructive" size="icon" onClick={() => remove(item.id)} aria-label={`Excluir ${item.title}`}><Trash2 /></Button></article>)}{items.length === 0 && <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground"><Sparkles className="mr-2 inline size-4" />Nenhum devocional cadastrado.</p>}</div></div></section>;
}