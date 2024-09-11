"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import ChatRoomList from "@/app/components/chat/ChatRoomList";
import { useEffect, useState } from "react";
import getChatRoomsByUserId from "@/utils/supabase/api/chat/getChatRoomsByUserId";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
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
          <ChatRoomList chatRoomList={chatRoomList} loggedInUserId={user.id} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default MessagesLayout;
