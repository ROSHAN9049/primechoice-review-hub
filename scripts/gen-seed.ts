import { reviews } from "../src/data/reviews";
import { posts } from "../src/data/posts";
import { categories } from "../src/data/categories";
import { guides } from "../src/data/guides";
import { comparisons } from "../src/data/comparisons";

const imgKey = (p: string) => {
  const m = String(p).split("/").pop() || "";
  return m.replace(/\.[a-z0-9]+$/i, "").replace(/-[A-Za-z0-9_]{8}$/, "");
};
const q = (v: unknown) => v === undefined || v === null ? "NULL" : `'${String(v).replace(/'/g, "''")}'`;
const j = (v: unknown) => `'${JSON.stringify(v ?? null).replace(/'/g, "''")}'::jsonb`;
const out: string[] = [];

categories.forEach((c, i) => out.push(
  `INSERT INTO public.categories (slug,name,description,icon,sort_order) VALUES (${q(c.slug)},${q(c.name)},${q(c.description)},${q(c.icon)},${i}) ON CONFLICT (slug) DO NOTHING;`));

const brands = [...new Set(reviews.map(r => r.vendor))];
brands.forEach(b => out.push(
  `INSERT INTO public.brands (slug,name) VALUES (${q(b.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''))},${q(b)}) ON CONFLICT (slug) DO NOTHING;`));

reviews.forEach(r => {
  const { slug,title,product,vendor,category,image,excerpt,rating,productId,featured,updated,...rest } = r as any;
  out.push(`INSERT INTO public.reviews (slug,title,product,vendor,category,image,excerpt,content,rating,affiliate_product_id,featured,status,publish_date) VALUES (${q(slug)},${q(title)},${q(product)},${q(vendor)},${q(category)},${q(imgKey(image))},${q(excerpt)},${j(rest)},${rating},${q(productId)},${!!featured},'published',${q(updated)}) ON CONFLICT (slug) DO NOTHING;`);
  out.push(`INSERT INTO public.products (slug,title,description,images,category,brand,rating,affiliate_links,specifications,pros,cons) VALUES (${q(slug)},${q(product)},${q(excerpt)},${j([imgKey(image)])},${q(category)},${q(vendor)},${rating},${j(productId?[{network:'digistore24',productId}]:[])},${j(rest.specs ?? [])},${j(rest.pros ?? [])},${j(rest.cons ?? [])}) ON CONFLICT (slug) DO NOTHING;`);
});

posts.forEach(p => out.push(
  `INSERT INTO public.blog_posts (slug,title,excerpt,category,image,author,sections,reading_time,status,publish_date) VALUES (${q(p.slug)},${q(p.title)},${q(p.excerpt)},${q(p.category)},${q(imgKey(p.image))},${j(p.author)},${j(p.sections)},${p.readingTime},'published',${q(p.date)}) ON CONFLICT (slug) DO NOTHING;`));

guides.forEach(g => { const { slug,title,excerpt,category,image,updated,...rest } = g as any;
  out.push(`INSERT INTO public.guides (slug,title,category,excerpt,payload,status,publish_date) VALUES (${q(slug)},${q(title)},${q(category)},${q(excerpt)},${j({ image: imgKey(image), updated, ...rest })},'published',${q(updated)}) ON CONFLICT (slug) DO NOTHING;`); });

comparisons.forEach(c => { const { slug,title,excerpt,category,image,updated,...rest } = c as any;
  out.push(`INSERT INTO public.comparisons (slug,title,category,excerpt,payload,status,publish_date) VALUES (${q(slug)},${q(title)},${q(category)},${q(excerpt)},${j({ image: imgKey(image), updated, ...rest })},'published',${q(updated)}) ON CONFLICT (slug) DO NOTHING;`); });

reviews.filter(r => (r as any).deal).forEach(r => { const d = (r as any).deal;
  out.push(`INSERT INTO public.deals (title,detail,coupon_code,network,target_slug,expiry_date,active) VALUES (${q(d.headline)},${q(d.detail)},${q(d.coupon)},'digistore24',${q(r.slug)},NULL,true);`); });

await Bun.write("/tmp/seed/seed.sql", out.join("\n"));
console.log("statements", out.length);
