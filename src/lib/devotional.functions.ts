/* eslint-disable prettier/prettier */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const BibleVerseSchema = z.object({
  book: z.object({ name: z.string(), abbrev: z.object({ pt: z.string() }).optional() }),
  chapter: z.number(),
  number: z.number(),
  text: z.string().min(1),
});

const GeneratedDevotionalSchema = z.object({
  title: z.string().min(2).max(160),
  reflection: z.string().min(2).max(10000),
  application: z.string().min(2).max(5000),
  prayer: z.string().min(2).max(5000),
});

const araFallbackVerses = [
  { book: { name: "Salmos" }, chapter: 46, number: 1, text: "Deus é o nosso refúgio e fortaleza, socorro bem-presente nas tribulações." },
  { book: { name: "Salmos" }, chapter: 119, number: 105, text: "Lâmpada para os meus pés é a tua palavra e, luz para os meus caminhos." },
  { book: { name: "Provérbios" }, chapter: 3, number: 5, text: "Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento." },
  { book: { name: "Isaías" }, chapter: 41, number: 10, text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel." },
  { book: { name: "Mateus" }, chapter: 11, number: 28, text: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei." },
  { book: { name: "Romanos" }, chapter: 8, number: 28, text: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito." },
  { book: { name: "Filipenses" }, chapter: 4, number: 6, text: "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças." },
  { book: { name: "1 Pedro" }, chapter: 5, number: 7, text: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós." },
] satisfies Array<z.infer<typeof BibleVerseSchema>>;

function fallbackVerseForDate(date: string) {
  const dateSeed = Number(date.replaceAll("-", ""));
  return araFallbackVerses[dateSeed % araFallbackVerses.length];
}

async function fetchAraVerse(today: string) {
  try {
    const verseResponse = await fetch("https://www.abibliadigital.com.br/api/verses/ara/random", {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!verseResponse.ok) return fallbackVerseForDate(today);
    const parsed = BibleVerseSchema.safeParse(await verseResponse.json());
    return parsed.success ? parsed.data : fallbackVerseForDate(today);
  } catch {
    return fallbackVerseForDate(today);
  }
}

export const getTodayDevotional = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const existing = await context.supabase
      .from("devotionals")
      .select("*")
      .eq("devotional_date", today)
      .maybeSingle();
    if (existing.error) throw new Error("Não foi possível consultar o devocional de hoje.");
    if (existing.data) return existing.data;

    const verse = await fetchAraVerse(today);
    const reference = `${verse.book.name} ${verse.chapter}:${verse.number}`;

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("A geração do devocional está temporariamente indisponível.");
    const [{ generateText, Output }, { createLovableAiGatewayProvider }] = await Promise.all([
      import("ai"),
      import("@/lib/ai-gateway.server"),
    ]);
    const gateway = createLovableAiGatewayProvider(key);
    const { output } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      output: Output.object({ schema: GeneratedDevotionalSchema }),
      system: "Você escreve devocionais cristãos reformados, fiéis ao texto bíblico e acolhedores. Nunca altere, complete ou parafraseie o versículo informado.",
      prompt: `Crie um devocional em português brasileiro baseado exclusivamente neste versículo da versão ARA: “${verse.text}” (${reference}). Produza título, reflexão meditativa, uma aplicação prática e específica para hoje, e uma oração breve. Não repita o versículo nos campos gerados.`,
    });

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const saved = await supabaseAdmin
      .from("devotionals")
      .upsert({
        devotional_date: today,
        title: output.title,
        verse_text: verse.text,
        verse_reference: reference,
        reflection: output.reflection,
        application: output.application,
        prayer: output.prayer,
        author: "Gerado com Gemini",
        bible_version: "ARA",
        source: "generated",
        created_by: null,
      }, { onConflict: "devotional_date" })
      .select("*")
      .single();
    if (saved.error) throw new Error("Não foi possível salvar o devocional de hoje.");
    return saved.data;
  });