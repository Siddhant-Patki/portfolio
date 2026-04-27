import { createClient } from '@supabase/supabase-js';

const url = process.env['SUPABASE_URL'];
// Service key bypasses RLS — safe because this runs server-side only
const key = process.env['SUPABASE_SERVICE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];

if (!url || !key) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
}

export const supabase = createClient(url, key);
