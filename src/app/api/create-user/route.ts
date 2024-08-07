// app/api/create-user/route.ts
import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const supabase = createClient();

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email }]);

    console.log("data", data);

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User created successfully!", data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
