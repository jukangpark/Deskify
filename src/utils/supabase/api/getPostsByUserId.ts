import { createClient } from "@/utils/supabase/client";
import IPost from "@/app/types/IPost";

/**
 * posts 의 user_id 를 기준으로 매칭된 게시글 목록을 가져오는 함수
 * @param {string} userId - 사용자 ID
 * @returns {Promise<IPost[]>} - 해당 사용자와 관련된 게시글 목록
 * @description 주어진 user_id를 사용하여 posts 테이블에서 데이터를 가져옵니다.
 */
const getPostsByUserId = async (userId: string): Promise<IPost[]> => {
    try {
        // Supabase 클라이언트 인스턴스 생성
        const supabase = await createClient();

        // user_id를 기준으로 posts 테이블에서 데이터 가져오기
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            console.error("Error fetching posts:", error.message);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Unexpected error:", error);
        return [];
    }
};

export default getPostsByUserId;
