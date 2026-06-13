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

    const verseResponse = await fetch("https://www.abibliadigital.com.br/api/verses/ara/random", {
      headers: { Accept: "application/json" },
    });
    if (!verseResponse.ok) throw new Error("A fonte bíblica está temporariamente indisponível. Tente novamente em instantes.");
    const verse = BibleVerseSchema.parse(await verseResponse.json());
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