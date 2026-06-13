REVOKE ALL ON FUNCTION public.get_public_prayer_requests() FROM authenticated;
REVOKE ALL ON FUNCTION public.get_public_prayer_requests() FROM service_role;
DROP FUNCTION public.get_public_prayer_requests();

CREATE TABLE public.prayer_publications (
  prayer_request_id uuid PRIMARY KEY REFERENCES public.prayer_requests(id) ON DELETE CASCADE,
  requester_name text NOT NULL DEFAULT 'Pedido anônimo',
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.prayer_publications TO authenticated;
GRANT ALL ON public.prayer_publications TO service_role;
ALTER TABLE public.prayer_publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in members view public prayer requests"
  ON public.prayer_publications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.sync_prayer_publication()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_private = false AND NEW.publication_status = 'published' THEN
    INSERT INTO public.prayer_publications (
      prayer_request_id,
      requester_name,
      subject,
      message,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      COALESCE(NULLIF(NEW.requester_name, ''), 'Pedido anônimo'),
      NEW.subject,
      NEW.message,
      NEW.created_at,
      now()
    )
    ON CONFLICT (prayer_request_id) DO UPDATE SET
      requester_name = EXCLUDED.requester_name,
      subject = EXCLUDED.subject,
      message = EXCLUDED.message,
      updated_at = now();
  ELSE
    DELETE FROM public.prayer_publications WHERE prayer_request_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_prayer_publication() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sync_prayer_publication() FROM anon;
REVOKE ALL ON FUNCTION public.sync_prayer_publication() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.sync_prayer_publication() TO service_role;

CREATE TRIGGER sync_prayer_publication_after_write
AFTER INSERT OR UPDATE OF requester_name, subject, message, is_private, publication_status
ON public.prayer_requests
FOR EACH ROW
EXECUTE FUNCTION public.sync_prayer_publication();

CREATE TRIGGER set_prayer_publications_updated_at
BEFORE UPDATE ON public.prayer_publications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.prayer_publications (prayer_request_id, requester_name, subject, message, created_at, updated_at)
SELECT id, COALESCE(NULLIF(requester_name, ''), 'Pedido anônimo'), subject, message, created_at, updated_at
FROM public.prayer_requests
WHERE is_private = false AND publication_status = 'published'
ON CONFLICT (prayer_request_id) DO NOTHING;