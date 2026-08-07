-- ============ roles & profiles ============
CREATE TYPE public.app_role AS ENUM ('admin','editor','author','subscriber');
CREATE TYPE public.content_status AS ENUM ('draft','pending','published','archived');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'));
$$;

CREATE OR REPLACE FUNCTION public.can_write(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor','author'));
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (NEW.id, NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', split_part(COALESCE(NEW.email,'user'),'@',1)),
          NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'subscriber')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE POLICY "profiles readable by authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "roles readable by self or admin" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- ============ taxonomy ============
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Sparkles',
  sort_order int NOT NULL DEFAULT 0,
  region text NOT NULL DEFAULT 'all',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  logo_url text,
  website text,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  category text,
  brand text,
  rating numeric(3,2) NOT NULL DEFAULT 0,
  price numeric(12,2),
  currency text NOT NULL DEFAULT 'USD',
  region text NOT NULL DEFAULT 'global',
  affiliate_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  specifications jsonb NOT NULL DEFAULT '[]'::jsonb,
  pros jsonb NOT NULL DEFAULT '[]'::jsonb,
  cons jsonb NOT NULL DEFAULT '[]'::jsonb,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============ content ============
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  product text NOT NULL,
  vendor text NOT NULL DEFAULT '',
  category text NOT NULL,
  image text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  rating numeric(3,2) NOT NULL DEFAULT 0,
  product_ref uuid REFERENCES public.products(id) ON DELETE SET NULL,
  affiliate_product_id text,
  featured boolean NOT NULL DEFAULT false,
  status public.content_status NOT NULL DEFAULT 'published',
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  publish_date date NOT NULL DEFAULT current_date,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  category text NOT NULL,
  image text NOT NULL DEFAULT '',
  author jsonb NOT NULL DEFAULT '{}'::jsonb,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  reading_time int NOT NULL DEFAULT 5,
  status public.content_status NOT NULL DEFAULT 'published',
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  publish_date date NOT NULL DEFAULT current_date,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status public.content_status NOT NULL DEFAULT 'published',
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  publish_date date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status public.content_status NOT NULL DEFAULT 'published',
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  publish_date date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  detail text NOT NULL DEFAULT '',
  coupon_code text,
  discount text,
  network text,
  target_slug text,
  url text,
  expiry_date date,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.affiliate_networks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  affiliate_id text NOT NULL DEFAULT '',
  tracking_id text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT 'US',
  region text NOT NULL DEFAULT 'global',
  link_template text NOT NULL DEFAULT '',
  utm jsonb NOT NULL DEFAULT '{}'::jsonb,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'subscribed',
  source text NOT NULL DEFAULT 'site',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.analytics_events (
  id bigserial PRIMARY KEY,
  event_type text NOT NULL,
  path text NOT NULL DEFAULT '',
  ref_slug text,
  network text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX analytics_events_created_idx ON public.analytics_events (created_at DESC);
CREATE INDEX analytics_events_type_idx ON public.analytics_events (event_type);

CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============ grants ============
GRANT SELECT ON public.categories, public.brands, public.products, public.reviews,
  public.blog_posts, public.guides, public.comparisons, public.deals,
  public.affiliate_networks, public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories, public.brands, public.products, public.reviews,
  public.blog_posts, public.guides, public.comparisons, public.deals,
  public.affiliate_networks, public.site_settings TO authenticated;
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT INSERT ON public.analytics_events TO anon, authenticated;
GRANT SELECT ON public.analytics_events TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.analytics_events_id_seq TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============ RLS ============
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_networks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories public read" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories staff write" ON public.categories FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "brands public read" ON public.brands FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "brands staff write" ON public.brands FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "products public read" ON public.products FOR SELECT TO anon, authenticated USING (status = 'published' OR public.can_write(auth.uid()));
CREATE POLICY "products staff write" ON public.products FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "reviews public read" ON public.reviews FOR SELECT TO anon, authenticated USING (status = 'published' OR author_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "reviews staff write" ON public.reviews FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "reviews author insert" ON public.reviews FOR INSERT TO authenticated WITH CHECK (public.can_write(auth.uid()) AND author_id = auth.uid());
CREATE POLICY "reviews author update" ON public.reviews FOR UPDATE TO authenticated USING (author_id = auth.uid() AND public.can_write(auth.uid())) WITH CHECK (author_id = auth.uid());

CREATE POLICY "posts public read" ON public.blog_posts FOR SELECT TO anon, authenticated USING (status = 'published' OR author_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "posts staff write" ON public.blog_posts FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "posts author insert" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.can_write(auth.uid()) AND author_id = auth.uid());
CREATE POLICY "posts author update" ON public.blog_posts FOR UPDATE TO authenticated USING (author_id = auth.uid() AND public.can_write(auth.uid())) WITH CHECK (author_id = auth.uid());

CREATE POLICY "guides public read" ON public.guides FOR SELECT TO anon, authenticated USING (status = 'published' OR author_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "guides staff write" ON public.guides FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "comparisons public read" ON public.comparisons FOR SELECT TO anon, authenticated USING (status = 'published' OR author_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "comparisons staff write" ON public.comparisons FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "deals public read" ON public.deals FOR SELECT TO anon, authenticated USING (active OR public.is_staff(auth.uid()));
CREATE POLICY "deals staff write" ON public.deals FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "networks public read" ON public.affiliate_networks FOR SELECT TO anon, authenticated USING (enabled OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "networks admin write" ON public.affiliate_networks FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "settings public read" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings admin write" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "newsletter anyone subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "newsletter staff read" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "newsletter staff manage" ON public.newsletter_subscribers FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE POLICY "analytics anyone insert" ON public.analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "analytics staff read" ON public.analytics_events FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

-- updated_at triggers
CREATE TRIGGER categories_updated BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER brands_updated BEFORE UPDATE ON public.brands FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER reviews_updated BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER posts_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER guides_updated BEFORE UPDATE ON public.guides FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER comparisons_updated BEFORE UPDATE ON public.comparisons FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER deals_updated BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER networks_updated BEFORE UPDATE ON public.affiliate_networks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ seed: affiliate networks + settings ============
INSERT INTO public.affiliate_networks (key, name, affiliate_id, tracking_id, country, region, link_template) VALUES
 ('amazon_us','Amazon US','','primechoice-20','US','global','https://www.amazon.com/dp/{productId}?tag={trackingId}'),
 ('amazon_in','Amazon India','','primechoice-21','IN','india','https://www.amazon.in/dp/{productId}?tag={trackingId}'),
 ('digistore24','Digistore24','YOUR_DIGISTORE24_ID','','US','global','https://www.digistore24.com/redir/{productId}/{affiliateId}/'),
 ('clickbank','ClickBank','YOUR_CB_ID','','US','global','https://{affiliateId}.{productId}.hop.clickbank.net'),
 ('cj','CJ Affiliate','','','US','global','https://www.anrdoezrs.net/click-{affiliateId}-{productId}'),
 ('impact','Impact','','','US','global','https://imp.i{affiliateId}.net/{productId}'),
 ('shareasale','ShareASale','','','US','global','https://www.shareasale.com/r.cfm?b={productId}&u={affiliateId}');

INSERT INTO public.site_settings (key, value) VALUES
 ('region_mode','"global"'::jsonb),
 ('general', '{"siteName":"PrimeChoiceReviews","tagline":"Honest Reviews. Smarter Choices.","email":"hello@primechoicereviews.com"}'::jsonb),
 ('analytics', '{"ga4MeasurementId":"","clarityProjectId":"","searchConsoleVerification":""}'::jsonb);