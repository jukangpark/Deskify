import { createClient } from "@/utils/supabase/client";

const createMessage = async (
    chatroom_id: string,
    loggedInUserId: string,
    text: string,
) => {
    if (text.trim() === "") return;

    const supabase = createClient();

    // Supabase에 메시지 저장
    const { data, error } = await supabase
        .from("messages")
        .insert([
            {
                chatroom_id, // 현재 채팅방 ID
                sender_id: loggedInUserId, // 메시지 보낸 사람 (로그인한 사용자)
                text, // 입력된 메시지 내용
                is_read: false, // 기본값으로 읽지 않음 처리
            },
        ]);

    if (error) {
        console.error("Error sending message:", error);
    }
};

export default createMessage;
