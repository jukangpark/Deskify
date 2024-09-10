import { createClient } from "@/utils/supabase/client";

// 채팅방 생성 및 메시지 저장 API
const createOrSendMessage = async (
    user_1_id: string,
    user_2_id: string,
    sender_id: string,
    text: string,
) => {
    const supabase = createClient();

    // 1. 채팅방이 이미 존재하는지 확인
    let { data: chatroom, error: chatroomError } = await supabase
        .from("chatrooms")
        .select("id")
        .or(`user_1_id.eq.${user_1_id},user_2_id.eq.${user_1_id}`)
        .or(`user_1_id.eq.${user_2_id},user_2_id.eq.${user_2_id}`)
        .single(); // 한 개의 채팅방만 가져옴

    if (chatroomError) {
        console.error(chatroomError);
        return { error: chatroomError };
    }

    let chatroomId;

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

        chatroomId = newChatroom.id;
    } else {
        chatroomId = chatroom.id;
    }

    // 3. 메시지 저장
    const { data: message, error: messageError } = await supabase
        .from("messages")
        .insert([
            {
                chatroom_id: chatroomId,
                sender_id,
                text,
                is_read: false,
            },
        ]);

    if (messageError) {
        console.error(messageError);
        return { error: messageError };
    }

    return { message };
};

export default createOrSendMessage;
