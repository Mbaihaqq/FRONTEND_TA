import { createClient } from '@supabase/supabase-js';

export const API_BASE_URL = "https://ta-ppb-baihaqi-api.vercel.app/api";

const supabaseUrl = "https://YOUR_PROJECT_ID.supabase.co"; 
const supabaseKey = "YOUR_ANON_KEY"; 

export const supabase = createClient(supabaseUrl, supabaseKey);