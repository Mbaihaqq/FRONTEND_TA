import { createClient } from '@supabase/supabase-js';

// URL Backend Produk (Jangan dihapus, tetap dipakai untuk Catalog)
export const API_BASE_URL = "https://ta-ppb-baihaqi-api.vercel.app/api";

// --- TAMBAHAN BARU UNTUK LOGIN ---
// Ambil URL dan Key ini dari Dashboard Supabase:
// (Klik icon Gerigi/Settings -> API -> Project URL & Project API Keys)
const supabaseUrl = "https://iyfysslsdpfuqroahbfo.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Znlzc2xzZHBmdXFyb2FoYmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjA5NzgsImV4cCI6MjA3OTkzNjk3OH0.p-pL7LfU56B3Sds6xWBl52Z_NQZqGFUl_kW46aTWbPg"; 

export const supabase = createClient(supabaseUrl, supabaseKey);