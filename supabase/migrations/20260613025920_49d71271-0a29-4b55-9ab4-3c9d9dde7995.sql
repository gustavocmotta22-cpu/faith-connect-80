CREATE TABLE public.birthday_directory (
  profile_id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  photo_path TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.birthday_directory TO authenticated;
GRANT ALL ON public.birthday_directory TO service_role;
ALTER TABLE public.birthday_directory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered users view birthday directory" ON public.birthday_directory FOR SELECT TO authenticated USING (true);

CREATE OR REPLACE FUNCTION private.sync_birthday_directory()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, private AS $$
BEGIN
  IF NEW.person_kind = 'member' AND NEW.onboarding_complete = true AND NEW.birth_date IS NOT NULL THEN
    INSERT INTO public.birthday_directory (profile_id, full_name, birth_date, photo_path, updated_at)
    VALUES (NEW.id, NEW.full_name, NEW.birth_date, CASE WHEN NEW.photo_consent THEN NEW.photo_path ELSE NULL END, now())
    ON CONFLICT (profile_id) DO UPDATE SET full_name = EXCLUDED.full_name, birth_date = EXCLUDED.birth_date, photo_path = EXCLUDED.photo_path, updated_at = now();
  ELSE
    DELETE FROM public.birthday_directory WHERE profile_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION private.sync_birthday_directory() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.sync_birthday_directory() TO service_role;
CREATE TRIGGER sync_profile_birthday AFTER INSERT OR UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION private.sync_birthday_directory();
CREATE POLICY "Registered users read consented birthday photos" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'profile-photos' AND EXISTS (SELECT 1 FROM public.birthday_directory b WHERE b.photo_path = name));