"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import MessageList from "@/app/components/chat/MessageList";
import MessageInput from "@/app/components/chat/MessageInput";
import { usePathname } from "next/navigation";
import getMessagesByChatRoomId from "@/utils/supabase/api/chat/getMessagesByChatRoomId";
import { useEffect, useState } from "react";
import IMessage from "@/app/types/IMessage";
import { createClient } from "@/utils/supabase/client";

const MessagesPage = () => {
  const loggedInUser = useRequireAuth();
  const pathname = usePathname(); // 현재 경로 가져오기
  const currentChatRoomId = pathname.split("/").pop(); // currentChatRoomId는 현재 채팅방 ID
  const [messages, setMessages] = useState<IMessage[]>([]); // 메시지 데이터를 저장할 상태

  // MessagesPage 에서는, chatRoomId 를 가지고
  // messages 테이블 가서 채팅 메시지를 가져와서 렌더링한다.

  useEffect(() => {
    // 초기 메시지 로드
    const loadMessages = async () => {
      const messagesData = await getMessagesByChatRoomId(
        `${currentChatRoomId}`
      );
      setMessages(messagesData);
    };

    loadMessages();

    const supabase = createClient();

    const channels = supabase
      .channel(`chatroom-messages-${currentChatRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // 모든 이벤트 감지 (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "messages",
          filter: `chatroom_id=eq.${currentChatRoomId}`, // 특정 채팅방에 대한 메시지만 구독
        },
        (payload) => {
          // 상태 업데이트: 새로운 메시지 추가
          if (payload.eventType === "INSERT") {
            setMessages((prevMessages) => [
              ...prevMessages,
              payload.new as IMessage,
            ]);
          }
        }
      )
      .subscribe();

    // 컴포넌트가 언마운트 될 때 구독 해제
    return () => {
      supabase.removeChannel(channels);
    };
  }, [currentChatRoomId]);
  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="font-bold text-xs sm:text-lg dark:text-white">
          Username
        </div>
        <div className="text-xs sm:text-lg text-gray-500 dark:text-gray-400">
          Active now
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <MessageList messages={messages} loggedInUser={loggedInUser} />
      </div>
      <div className="p-2 sm:p-3 border-t border-gray-300 dark:border-gray-700">
        <MessageInput loggedInUser={loggedInUser} />
      </div>
    </div>
  );
};

export default MessagesPage;
