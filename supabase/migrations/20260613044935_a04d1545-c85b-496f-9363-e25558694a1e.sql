ALTER TABLE public.prayer_requests
  ADD COLUMN requester_name text,
  ADD COLUMN contact_phone text,
  ADD COLUMN contact_authorized boolean NOT NULL DEFAULT false,
  ADD COLUMN directed_to text NOT NULL DEFAULT 'conselho',
  ADD COLUMN publication_status text NOT NULL DEFAULT 'published';

ALTER TABLE public.prayer_requests
  ADD CONSTRAINT prayer_requests_requester_name_length CHECK (requester_name IS NULL OR char_length(requester_name) BETWEEN 2 AND 120),
  ADD CONSTRAINT prayer_requests_contact_phone_length CHECK (contact_phone IS NULL OR char_length(contact_phone) BETWEEN 8 AND 24),
  ADD CONSTRAINT prayer_requests_contact_authorization_consistency CHECK (contact_phone IS NULL OR contact_authorized = true),
  ADD CONSTRAINT prayer_requests_directed_to_values CHECK (directed_to IN ('conselho', 'pastor', 'igreja')),
  ADD CONSTRAINT prayer_requests_publication_status_values CHECK (publication_status IN ('published', 'private'));

CREATE OR REPLACE FUNCTION public.get_public_prayer_requests()
RETURNS TABLE (
  id uuid,
  requester_name text,
  subject text,
  message text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    prayer_requests.id,
    COALESCE(NULLIF(prayer_requests.requester_name, ''), 'Pedido anônimo'),
    prayer_requests.subject,
    prayer_requests.message,
    prayer_requests.created_at
  FROM public.prayer_requests
  WHERE prayer_requests.is_private = false
    AND prayer_requests.publication_status = 'published'
  ORDER BY prayer_requests.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.get_public_prayer_requests() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_prayer_requests() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_prayer_requests() TO service_role;