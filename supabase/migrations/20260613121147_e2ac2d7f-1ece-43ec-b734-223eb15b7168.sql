ALTER TABLE public.gallery_items ALTER COLUMN is_approved SET DEFAULT true;

DROP POLICY IF EXISTS "Verified members submit gallery photos" ON public.gallery_items;
CREATE POLICY "Verified members publish gallery photos"
ON public.gallery_items
FOR INSERT
TO authenticated
WITH CHECK (
  uploader_id = auth.uid()
  AND private.is_verified_member(auth.uid())
  AND responsibility_accepted = true
  AND is_approved = true
  AND uploader_name = (
    SELECT p.full_name
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.person_kind = 'member'::public.person_kind
      AND p.membership_status = 'verified'::public.membership_status
  )
);

DROP POLICY IF EXISTS "Registered users view approved gallery" ON public.gallery_items;
CREATE POLICY "Registered users view gallery"
ON public.gallery_items
FOR SELECT
TO authenticated
USING (is_approved OR uploader_id = auth.uid() OR private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins update gallery" ON public.gallery_items;
CREATE POLICY "Owners or admins update gallery"
ON public.gallery_items
FOR UPDATE
TO authenticated
USING (uploader_id = auth.uid() OR private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (
  (uploader_id = auth.uid() AND responsibility_accepted = true AND is_approved = true)
  OR private.has_role(auth.uid(), 'admin'::public.app_role)
);