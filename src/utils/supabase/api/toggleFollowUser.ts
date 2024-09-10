import { createClient } from "../client";

/**
 * 현재 로그인한 사용자가 특정 유저를 팔로우하거나, 이미 팔로우 중이라면 취소하는 토글 함수
 * @param {string} followId - 팔로우하려는 사용자의 ID
 * @param {string} followerId - 팔로우를 시도하는 현재 로그인된 사용자의 ID
 * @returns {Promise<string>} - 성공 여부와 상태를 반환 ("followed", "unfollowed", "error")
 */
const toggleFollowUser = async (
    followId: string,
    followerId: string,
): Promise<string> => {
    const supabase = createClient();

    // 팔로우 여부 확인
    const { data: existingFollow, error: fetchError } = await supabase
        .from("follow")
        .select("*")
        .eq("follow_id", followId)
        .eq("follower_id", followerId)
        .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116은 데이터가 없다는 에러로 무시
        console.error("Error checking existing follow:", fetchError);
        return "error";
    }

    // 이미 팔로우 중이라면 팔로우 취소 (언팔로우)
    if (existingFollow) {
        const { error: deleteError } = await supabase
            .from("follow")
            .delete()
            .eq("follow_id", followId)
            .eq("follower_id", followerId);

        if (deleteError) {
            console.error("Error unfollowing:", deleteError);
            return "error";
        }

        return "unfollowed";
    }

    // 팔로우 추가 (팔로우 중이 아니면 팔로우)
    const { error: insertError } = await supabase
        .from("follow")
        .insert([{ follow_id: followId, follower_id: followerId }]);

    if (insertError) {
        console.error("Error inserting follow:", insertError);
        return "error";
    }

    return "followed";
};

export default toggleFollowUser;
