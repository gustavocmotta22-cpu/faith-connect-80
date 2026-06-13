DROP POLICY "Registered users view birthday directory" ON public.birthday_directory;
CREATE POLICY "Registered users view consented birthdays" ON public.birthday_directory FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = profile_id AND p.photo_consent = true)
);
DROP POLICY "Registered users read consented birthday photos" ON storage.objects;
CREATE POLICY "Registered users read consented birthday photos" ON storage.objects FOR SELECT TO authenticated USING (
  bucket_id = 'profile-photos'
  AND EXISTS (
    SELECT 1 FROM public.birthday_directory b
    JOIN public.profiles p ON p.id = b.profile_id
    WHERE b.photo_path = name AND p.photo_consent = true
  )
);
CREATE OR REPLACE FUNCTION private.sync_birthday_directory()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, private AS $$
BEGIN
  IF NEW.person_kind = 'member' AND NEW.onboarding_complete = true AND NEW.birth_date IS NOT NULL AND NEW.photo_consent = true THEN
    INSERT INTO public.birthday_directory (profile_id, full_name, birth_date, photo_path, updated_at)
    VALUES (NEW.id, NEW.full_name, NEW.birth_date, NEW.photo_path, now())
    ON CONFLICT (profile_id) DO UPDATE SET full_name = EXCLUDED.full_name, birth_date = EXCLUDED.birth_date, photo_path = EXCLUDED.photo_path, updated_at = now();
  ELSE
    DELETE FROM public.birthday_directory WHERE profile_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION private.sync_birthday_directory() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.sync_birthday_directory() TO service_role;