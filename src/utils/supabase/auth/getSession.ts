import { createClient } from "../client";
import { Session as SupabaseSession } from "@supabase/auth-js";

async function getSession(): Promise<
  { session: SupabaseSession } | { session: null }
> {
  const { data, error } = await createClient().auth.getSession();

  if (error) {
    throw new Error("Failed to get session");
  }

  return data;
}

export default getSession;
