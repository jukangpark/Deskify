import { createClient } from "../client";

/**
 * @param {string} userId - The user id of the user whose following count is to be fetched
 * @returns {Promise<number>} - The number of users the user is following
 */
const getFollowingCountByUserId = async (userId: string): Promise<number> => {
    const supabase = createClient();

    const { count, error } = await supabase
        .from("follow")
        .select("follow_id", { count: "exact" }) // 팔로잉 수를 정확하게 계산
        .eq("follower_id", userId); // 내가 팔로우하고 있는 사용자들의 수를 필터링

    if (error) {
        console.error("Error fetching following count:", error);
        return 0; // 오류 발생 시 0 반환
    }

    return count || 0; // 팔로우하고 있는 수 반환, 데이터가 없으면 0 반환
};

export default getFollowingCountByUserId;
