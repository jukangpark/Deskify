import { createClient } from "../client";

/**
 * @param {string} userId - The user id of the user whose followers count is to be fetched
 * @returns {Promise<number>} - The number of followers of the user
 */
const getFollowersCountByUserId = async (userId: string): Promise<number> => {
    const supabase = createClient();
    const { count, error } = await supabase
        .from("follow")
        .select("follower_id", { count: "exact" }) // 팔로워 수를 정확하게 계산
        .eq("follow_id", userId); // 팔로워를 조회할 사용자의 ID를 기준으로 필터링

    if (error) {
        console.error("Error fetching followers count:", error);
        return 0; // 오류 발생 시 0 반환
    }

    return count || 0; // 팔로워 수 반환, 데이터가 없으면 0 반환
};

export default getFollowersCountByUserId;
