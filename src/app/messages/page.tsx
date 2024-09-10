"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import ChatRoomList from "@/app/components/chat/ChatRoomList";
import MessageList from "@/app/components/chat/MessageList";
import MessageInput from "@/app/components/chat/MessageInput";
import { useEffect, useState } from "react";
import getChatRoomsByUserId from "@/utils/supabase/api/chat/getChatRoomsByUserId";

const MessagesPage = () => {
  const user = useRequireAuth();
  const [chatRoomList, setChatRoomList] = useState<any[]>([]); // [주의] 타입을 임시로 any로 설정

  useEffect(() => {
    if (!user) return;
    (async () => {
      const chatRoomListData = await getChatRoomsByUserId(user.id);

      setChatRoomList(chatRoomListData);
    })();
  }, [user]);

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-transparent">
      {/* 좌측 대화 목록 */}
      <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 bg-transparent border-r border-gray-300 dark:border-gray-700">
        <div className="p-4 font-bold text-lg dark:text-white">Messages</div>
        <div className="overflow-y-auto h-full">
          {/* 대화 목록 */}
          {user && (
            <ChatRoomList
              chatRoomList={chatRoomList}
              loggedInUserId={user.id}
            />
          )}
        </div>
      </div>

      {/* 우측 메시지 창 */}
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
    </div>
  );
};

export default MessagesPage;
