import { createClient } from "@/utils/supabase/client";

/**
    @param user_id - 유저 아이디
    @returns - profiles 테이블에 저장된 유저의 모든 데이터
    @description profiles 테이블에서 user_id에 해당하는 유저의 모든 데이터를 가져옵니다.
*/
const getUserProfileDataById = async (user_id: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user_id)
        .single();

    if (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }

    return data;
};

export default getUserProfileDataById;
