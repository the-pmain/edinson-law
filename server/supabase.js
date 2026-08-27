export function supabaseConfig(env = process.env) {
  const url = String(env.SUPABASE_URL || "").replace(/\/$/, "");
  const service = String(env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const anon = String(env.SUPABASE_ANON_KEY || "").trim();
  const key = service || anon;
  return { url, key, usingServiceRole: Boolean(service) };
}

export function supabaseHeaders(key, extra = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...extra,
  };
}

export function requireSupabase(env = process.env) {
  const config = supabaseConfig(env);
  if (!config.url || !config.key) {
    const error = new Error("Missing Supabase credentials.");
    error.status = 500;
    throw error;
  }
  return config;
}
