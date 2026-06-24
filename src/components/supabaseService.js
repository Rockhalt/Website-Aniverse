import { createClient } from '@supabase/supabase-js';

// 1. PASTE YOUR KEYS HERE
export const SUPABASE_URL = 'https://ykepqxdishygirotpjab.supabase.co'; // e.g., https://xyz.supabase.co
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZXBxeGRpc2h5Z2lyb3RwamFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NDk4MiwiZXhwIjoyMDk2NzYwOTgyfQ.mobJ29q6rwCFcHCH1xEi2hdTb_NnKe1VW7N1Et-jq1g'; // The long eyJ... string

// ✦ 2. THIS IS THE LINE THAT FIXES YOUR LOGIN ERROR ✦
// It creates the official client and shares it with Signup.jsx and Login.jsx
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Sends a new product to the Supabase Vault
 */
export async function addProductToDatabase(newItem) {
  const { data, error } = await supabase
    .from('products')
    .insert([newItem]);

  if (error) {
    console.error("Upload Error:", error);
    throw new Error('Failed to save to Supabase');
  }
  
  return true; // Successfully uploaded
}

/**
 * Fetches all products from the Supabase Vault
 */
export async function getProductsFromDatabase() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false }); // Puts newest items at the top

  if (error) {
    console.error("Fetch Error:", error);
    throw new Error('Failed to fetch from Supabase');
  }
  
  return data; // Hands the data back to React
}