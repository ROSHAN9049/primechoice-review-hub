// Supabase browser client. The publishable key is intentionally safe to expose in the browser.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const DEFAULT_SUPABASE_URL = 'https://whtbrmzkbtlnndpnxgyz.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_pwtvSMbXIvjhZerLBBs0nA_BliSKeVX';

function normalizeSupabaseUrl(value: string): string {
  // Vercel/Lovable environment variables must contain the project root URL,
  // not /rest/v1, /auth/v1, or another API path. Normalize old/misconfigured
  // values so the client cannot generate URLs such as /rest/v1/auth/v1/authorize.
  const trimmed = value.trim().replace(/\/+$/, '');
  return trimmed.replace(/\/rest\/v1(?:\/.*)?$/i, '').replace(/\/auth\/v1(?:\/.*)?$/i, '');
}

function createSupabaseClient() {
  // Vite replaces import.meta.env at build time. The public fallback keeps
  // production working even when Vercel's VITE_* variables are unavailable.
  const rawSupabaseUrl =
    import.meta.env['VITE_SUPABASE_URL'] ||
    import.meta.env['VITE_SUPABASE_PROJECT_URL'] ||
    DEFAULT_SUPABASE_URL;

  const SUPABASE_URL = normalizeSupabaseUrl(rawSupabaseUrl);

  const SUPABASE_PUBLISHABLE_KEY =
    import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ||
    import.meta.env['VITE_SUPABASE_ANON_KEY'] ||
    DEFAULT_SUPABASE_PUBLISHABLE_KEY;

  // Put apikey in the client's global headers as well as letting supabase-js
  // manage its normal auth headers. This guarantees the Supabase gateway gets
  // the required apikey header on every REST request.
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
      },
    },
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
