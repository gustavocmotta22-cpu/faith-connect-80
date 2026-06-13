DROP POLICY "Registered users read gallery files" ON storage.objects;
CREATE POLICY "Gallery files follow moderation" ON storage.objects FOR SELECT TO authenticated USING (
  bucket_id = 'church-gallery'
  AND EXISTS (
    SELECT 1 FROM public.gallery_items g
    WHERE g.photo_path = name
      AND (g.is_approved = true OR g.uploader_id = auth.uid() OR private.has_role(auth.uid(), 'admin'))
  )
);