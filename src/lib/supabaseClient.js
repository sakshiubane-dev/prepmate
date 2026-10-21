import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY environment configuration.');
}

const supabaseProjectUrl = new URL(supabaseUrl);
if (supabaseProjectUrl.pathname !== '/' || supabaseProjectUrl.search || supabaseProjectUrl.hash) {
  throw new Error('VITE_SUPABASE_URL must be the base project URL without an API path, query, or fragment.');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);