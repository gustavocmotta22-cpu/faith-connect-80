CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.person_kind AS ENUM ('member', 'visitor');
CREATE TYPE public.membership_status AS ENUM ('pending', 'verified', 'rejected');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 3 AND 120),
  person_kind public.person_kind NOT NULL,
  membership_status public.membership_status NOT NULL DEFAULT 'pending',
  phone TEXT CHECK (phone IS NULL OR char_length(phone) BETWEEN 8 AND 24),
  birth_date DATE,
  has_religion BOOLEAN,
  religion TEXT CHECK (religion IS NULL OR char_length(religion) <= 100),
  church_denomination TEXT CHECK (church_denomination IS NULL OR char_length(church_denomination) <= 160),
  photo_path TEXT,
  photo_consent BOOLEAN NOT NULL DEFAULT false,
  onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_verified_member(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = _user_id AND person_kind = 'member' AND membership_status = 'verified')
$$;

CREATE POLICY "Users view own profile and admins view all" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid() AND membership_status = 'pending');
CREATE POLICY "Users update safe own profile or admins update all" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin')) WITH CHECK ((id = auth.uid() AND membership_status = (SELECT p.membership_status FROM public.profiles p WHERE p.id = auth.uid())) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete profiles" ON public.profiles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users view own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.church_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('devotional','event','notice','liturgy','birthday_note','social_action','about')),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 2 AND 160),
  summary TEXT CHECK (summary IS NULL OR char_length(summary) <= 500),
  body TEXT CHECK (body IS NULL OR char_length(body) <= 10000),
  event_at TIMESTAMPTZ,
  image_path TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.church_content TO authenticated;
GRANT ALL ON public.church_content TO service_role;
ALTER TABLE public.church_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered users view published content" ON public.church_content FOR SELECT TO authenticated USING (is_published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create content" ON public.church_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());
CREATE POLICY "Admins update content" ON public.church_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete content" ON public.church_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id UUID NOT NULL,
  uploader_name TEXT NOT NULL CHECK (char_length(uploader_name) BETWEEN 3 AND 120),
  caption TEXT NOT NULL CHECK (char_length(caption) BETWEEN 3 AND 500),
  photo_path TEXT NOT NULL,
  responsibility_accepted BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered users view approved gallery" ON public.gallery_items FOR SELECT TO authenticated USING (is_approved OR uploader_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Verified members submit gallery photos" ON public.gallery_items FOR INSERT TO authenticated WITH CHECK (uploader_id = auth.uid() AND public.is_verified_member(auth.uid()) AND responsibility_accepted = true AND is_approved = false);
CREATE POLICY "Admins update gallery" ON public.gallery_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners or admins delete gallery" ON public.gallery_items FOR DELETE TO authenticated USING (uploader_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.library_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 2 AND 200),
  author TEXT CHECK (author IS NULL OR char_length(author) <= 160),
  description TEXT CHECK (description IS NULL OR char_length(description) <= 1000),
  pdf_path TEXT NOT NULL,
  is_free_licensed BOOLEAN NOT NULL DEFAULT false,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.library_items TO authenticated;
GRANT ALL ON public.library_items TO service_role;
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered users view library" ON public.library_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins add books" ON public.library_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND uploaded_by = auth.uid() AND is_free_licensed = true);
CREATE POLICY "Admins update books" ON public.library_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete books" ON public.library_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.society_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  acronym TEXT NOT NULL UNIQUE CHECK (char_length(acronym) BETWEEN 2 AND 12),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  description TEXT CHECK (description IS NULL OR char_length(description) <= 500),
  whatsapp_url TEXT CHECK (whatsapp_url IS NULL OR whatsapp_url ~ '^https://(chat\.whatsapp\.com|wa\.me)/'),
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.society_groups TO authenticated;
GRANT ALL ON public.society_groups TO service_role;
ALTER TABLE public.society_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registered users view societies" ON public.society_groups FOR SELECT TO authenticated USING (is_active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create societies" ON public.society_groups FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update societies" ON public.society_groups FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete societies" ON public.society_groups FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL,
  subject TEXT NOT NULL CHECK (char_length(subject) BETWEEN 3 AND 160),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 5 AND 3000),
  is_private BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prayer_requests TO authenticated;
GRANT ALL ON public.prayer_requests TO service_role;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners and admins view prayer requests" ON public.prayer_requests FOR SELECT TO authenticated USING (requester_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users create own prayer requests" ON public.prayer_requests FOR INSERT TO authenticated WITH CHECK (requester_id = auth.uid());
CREATE POLICY "Owners or admins update prayer requests" ON public.prayer_requests FOR UPDATE TO authenticated USING (requester_id = auth.uid() OR public.has_role(auth.uid(), 'admin')) WITH CHECK (requester_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners or admins delete prayer requests" ON public.prayer_requests FOR DELETE TO authenticated USING (requester_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER church_content_updated_at BEFORE UPDATE ON public.church_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER gallery_items_updated_at BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER library_items_updated_at BEFORE UPDATE ON public.library_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER societies_updated_at BEFORE UPDATE ON public.society_groups FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER prayer_requests_updated_at BEFORE UPDATE ON public.prayer_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Users manage own profile photo" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users read own profile photo and admins read all" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'profile-photos' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Users update own profile photo" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text) WITH CHECK (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users delete own profile photo" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'profile-photos' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Verified members upload gallery files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'church-gallery' AND (storage.foldername(name))[1] = auth.uid()::text AND public.is_verified_member(auth.uid()));
CREATE POLICY "Registered users read gallery files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'church-gallery');
CREATE POLICY "Owners or admins delete gallery files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'church-gallery' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Admins upload library PDFs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'library-pdfs' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Registered users read library PDFs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'library-pdfs');
CREATE POLICY "Admins update library PDFs" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'library-pdfs' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'library-pdfs' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete library PDFs" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'library-pdfs' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO public.society_groups (acronym, name, description) VALUES
('SAF','Sociedade Auxiliadora Feminina','Comunhão e serviço das mulheres da igreja.'),
('UPH','União Presbiteriana de Homens','Comunhão e serviço dos homens da igreja.'),
('UMP','União de Mocidade Presbiteriana','Comunhão e discipulado de jovens.'),
('UPA','União Presbiteriana de Adolescentes','Comunhão e discipulado de adolescentes.'),
('UCP','União de Crianças Presbiterianas','Formação e comunhão das crianças.'),
('EBD','Escola Bíblica Dominical','Ensino bíblico para todas as idades.'),
('CORAL','Coral da Igreja','Ministério de louvor coral.'),
('MISSÕES','Missões','Ações missionárias da igreja.');

INSERT INTO public.church_content (content_type, title, summary, body, created_by) VALUES
('social_action','Curso de corte e costura — Talentos do Reino','Informações presenciais toda terça-feira, às 17h.','Para maiores informações sobre o curso, compareça à igreja na terça-feira, às 17h, e procure a irmã Patrícia ou o irmão Eduardo.', '00000000-0000-0000-0000-000000000000');