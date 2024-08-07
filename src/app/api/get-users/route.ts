// app/api/get-users/route.ts
import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET() {
  const { data, error } = await createClient().from("users").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ users: data });
}
