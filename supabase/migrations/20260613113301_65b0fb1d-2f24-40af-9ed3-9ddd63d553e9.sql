CREATE TABLE public.devotionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  devotional_date DATE NOT NULL UNIQUE,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 2 AND 160),
  verse_text TEXT NOT NULL CHECK (char_length(verse_text) BETWEEN 2 AND 2000),
  verse_reference TEXT NOT NULL CHECK (char_length(verse_reference) BETWEEN 2 AND 120),
  reflection TEXT NOT NULL CHECK (char_length(reflection) BETWEEN 2 AND 10000),
  application TEXT NOT NULL CHECK (char_length(application) BETWEEN 2 AND 5000),
  prayer TEXT,
  author TEXT,
  bible_version TEXT NOT NULL DEFAULT 'ARA' CHECK (bible_version = 'ARA'),
  source TEXT NOT NULL DEFAULT 'admin' CHECK (source IN ('admin', 'generated')),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.devotionals TO authenticated;
GRANT ALL ON public.devotionals TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.devotionals TO authenticated;
ALTER TABLE public.devotionals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered users view devotionals" ON public.devotionals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins create devotionals" ON public.devotionals FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) AND source = 'admin' AND created_by = auth.uid() AND bible_version = 'ARA');
CREATE POLICY "Admins update devotionals" ON public.devotionals FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) AND bible_version = 'ARA');
CREATE POLICY "Admins delete devotionals" ON public.devotionals FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER set_devotionals_updated_at BEFORE UPDATE ON public.devotionals FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();