import { createClient } from "../client";

/**
 * 현재 로그인한 사용자가 특정 유저를 팔로우하고 있는지 확인하는 함수
 * @param {string} followId - 팔로우하려는 사용자의 ID
 * @param {string} followerId - 현재 로그인된 사용자의 ID
 * @returns {Promise<boolean>} - 팔로우 여부 반환 (true: 팔로우 중, false: 팔로우 안 함)
 */
const getIsFollowingByLoggedInUserId = async (
    followId: string,
    followerId: string | undefined,
): Promise<boolean> => {
    const supabase = createClient();

    // 팔로우 여부 확인
    const { data: existingFollow, error: fetchError } = await supabase
        .from("follow")
        .select("*")
        .eq("follow_id", followId)
        .eq("follower_id", followerId)
        .single(); // 단일 레코드 반환

    if (fetchError && fetchError.code !== "PGRST116") {
        // 에러가 발생했으나, PGRST116(데이터 없음 에러)은 무시
        console.error("Error checking follow status:", fetchError);
        return false; // 에러 발생 시 팔로우 중이 아니라고 간주
    }

    // 팔로우 관계가 존재하면 true 반환, 그렇지 않으면 false
    return !!existingFollow;
};

export default getIsFollowingByLoggedInUserId;
