import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// GET 요청을 처리하는 Serverless Function
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;

    // Supabase 클라이언트 생성
    const supabase = createClient();

    // Supabase를 통해 auth.users 테이블에서 사용자 정보 가져오기
    const { data, error } = await supabase
        .from("profiles") // profiles 테이블을 사용합니다.
        .select("*") // 모든 컬럼을 선택합니다. 필요에 따라 특정 컬럼만 선택할 수 있습니다.
        .eq("id", id)
        .single(); // 단일 레코드를 가져옵니다.

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
}
