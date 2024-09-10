import { createClient } from "@/utils/supabase/client";

/**
 * Get chatrooms by user_id (user_1_id or user_2_id) from chatrooms table
 * @param {string} loggedInUserId - 현재 로그인된 유저 id 값
 * @returns {Promise<any[]>} - chatroom list
 */
const getChatRoomsByUserId = async (loggedInUserId: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("chatrooms")
        .select(`
            id,
            created_at,
            user_1_id,
            user_2_id
        `)
        .or(`user_1_id.eq.${loggedInUserId},user_2_id.eq.${loggedInUserId}`);

    if (error) {
        console.error(error);
    }

    return data ? data : [];
};

export default getChatRoomsByUserId;
