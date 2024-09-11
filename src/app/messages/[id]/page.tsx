"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import MessageList from "@/app/components/chat/MessageList";
import MessageInput from "@/app/components/chat/MessageInput";
import { usePathname } from "next/navigation";

const MessagesPage = () => {
  const user = useRequireAuth();
  const pathname = usePathname(); // 현재 경로 가져오기
  const currentChatRoomId = pathname.split("/").pop(); // currentChatRoomId는 현재 채팅방 ID

  // MessagesPage 에서는, chatRoomId 를 가지고
  // messages 테이블 가서 채팅 메시지를 가져와서 렌더링한다.

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="font-bold text-lg dark:text-white">Username</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Active now
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <MessageList />
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessagesPage;
