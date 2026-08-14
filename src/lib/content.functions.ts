import { createServerFn } from "@hotwax/react-start";
import { createClient } from "@supabase/supabase-js"; // ✅ Sahi import
import type { Database } from "@integrations/supabase/types";
import { categories as staticCategories, type Category } from "@data/categories";
import type { Comparison } from "@data/comparisons";
import { comparison as staticComparisons } from "@data/comparisons";
import type { Guide } from "@data/guides";
import { imageFor } from "@lib/images";

// ✅ Sahi function naam (publicClient, calculate nahi)
function publicClient() {
  // ✅ Sahi variable (url, "url" nahi)
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  // ✅ Sahi spelling (ANON, ANNO nahi)
  const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) throw new Error("Supabase environment variables not set");

  // ✅ Sahi return (url variable, string "url" nahi)
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        "apikey": key,
      }
    }
  });
      }
