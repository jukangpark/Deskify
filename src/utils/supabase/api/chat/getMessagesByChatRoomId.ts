import { createClient } from "@/utils/supabase/client";

/**
 * Get messages by chatroom_id from messages table
 * @param {string} chatroomId - 채팅방 ID
 * @returns {Promise<any[]>} - chatroom_id가 일치하는 메시지 리스트
 */
const getMessagesByChatRoomId = async (chatroomId: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("messages")
        .select(`
            id,
            created_at,
            chatroom_id,
            sender_id,
            text,
            is_read
        `)
        .eq("chatroom_id", chatroomId) // chatroom_id가 일치하는 메시지들만 가져옴
        .order("created_at", { ascending: true }); // 메시지를 시간 순으로 정렬

    if (error) {
        console.error(error);
    }

    return data ? data : [];
};

export default getMessagesByChatRoomId;
