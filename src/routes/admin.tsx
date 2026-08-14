// Client-side (browser) aur Server-side (SSR) dono ke liye sahi URL aur Key
const supabaseUrl = typeof window === 'undefined' 
  ? process.env.SUPABASE_URL 
  : import.meta.env.VITE_SUPABASE_URL;

const supabaseKey = typeof window === 'undefined'
  ? process.env.SUPABASE_ANON_KEY 
  : import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY; // Yeh aapne pehle set kiya tha

const supabase = createClient(supabaseUrl!, supabaseKey!);
