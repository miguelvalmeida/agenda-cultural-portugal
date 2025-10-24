import { createServerClient } from "@supabase/ssr";

import type { Database } from "./types";

export function createClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op - don't set any cookies
        },
      },
    }
  );
}
