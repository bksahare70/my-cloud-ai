// MY CLOUD AI: Supabase browser client. Uses only the public anon key + database RLS.
(function () {
  const cfg = window.MY_CLOUD_CONFIG || {};
  const ready = cfg.supabaseUrl && cfg.supabaseAnonKey &&
    !cfg.supabaseUrl.includes("YOUR-PROJECT") &&
    !cfg.supabaseAnonKey.includes("YOUR_SUPABASE");
  window.MY_CLOUD = { ready, client: null, user: null };
  if (!ready) return;
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  script.onload = async () => {
    const sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    window.MY_CLOUD.client = sb;
    const { data } = await sb.auth.getSession();
    window.MY_CLOUD.user = data.session?.user || null;
    document.dispatchEvent(new Event("mycloud-ready"));
  };
  script.onerror = () => console.error("Could not load Supabase client library.");
  document.head.appendChild(script);
})();
