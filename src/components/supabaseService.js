const SUPABASE_URL = 'https://ykepqxdishygirotpjab.supabase.co'; // e.g., https://xyz.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZXBxeGRpc2h5Z2lyb3RwamFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE4NDk4MiwiZXhwIjoyMDk2NzYwOTgyfQ.mobJ29q6rwCFcHCH1xEi2hdTb_NnKe1VW7N1Et-jq1g'; // The long eyJ... string

/**
 * Sends a new product to the Supabase Vault
 */
export async function addProductToDatabase(newItem) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(newItem)
  });

  if (!response.ok) {
    throw new Error('Failed to save to Supabase');
  }
  
  return true; // Successfully uploaded
}

/**
 * Fetches all products from the Supabase Vault
 */
export async function getProductsFromDatabase() {
  // We add ?select=* to tell Supabase we want all columns
  // We add &order=id.desc to put the newest items at the top!
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=id.desc`, {
    method: 'GET',
    headers: { 
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Supabase');
  }
  
  return await response.json(); // Hands the data back to React
}