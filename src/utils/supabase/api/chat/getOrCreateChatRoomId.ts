import { createClient } from "@/utils/supabase/client";

/**
 * 사용자 ID를 기반으로 채팅방 ID를 가져오거나 새로 생성합니다.
 * @param {string} user_1_id - 상대방의 ID
 * @param {string} user_2_id - 현재로그인된 사용자의 ID
 * @returns {string} - chatRoomId
 */
const getOrCreateChatRoomId = async (
    user_1_id: string,
    user_2_id: string,
) => {
    const supabase = createClient();

    // 1. 채팅방이 이미 존재하는지 확인
    let { data: chatroom, error: chatroomError } = await supabase
        .from("chatrooms")
        .select("id")
        .or(`user_1_id.eq.${user_1_id},user_2_id.eq.${user_1_id}`)
        .or(`user_1_id.eq.${user_2_id},user_2_id.eq.${user_2_id}`)
        .maybeSingle(); // 이 부분을 single()에서 maybeSingle()으로 변경

    if (chatroomError) {
        console.error(chatroomError);
        return { error: chatroomError };
    }

    let chatRoomId;

    // 2. 채팅방이 없으면 새로 생성
    if (!chatroom) {
        const { data: newChatroom, error: newChatroomError } = await supabase
            .from("chatrooms")
            .insert([
                { user_1_id, user_2_id },
            ])
            .select("id")
            .single(); // 새로 생성된 채팅방 ID 가져오기

        if (newChatroomError) {
            console.error(newChatroomError);
            return { error: newChatroomError };
        }

        chatRoomId = newChatroom.id;
    } else {
        chatRoomId = chatroom.id;
    }

    return chatRoomId;
};

export default getOrCreateChatRoomId;
