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
    <div className="flex sm:h-screen h-screen-minus-50 bg-transparent">
      {/* 좌측 대화 목록 h-screen-minus-50 은 사용자 정의 커스텀 클래스 자세한 내용은 tailwind.config.ts 참조 */}
      <div className="md:block w-1/4 md:w-1/3 lg:w-1/4 bg-transparent border-r border-gray-700">
        <div className="p-4 font-bold text-xs sm:text-lg text-white">
          Messages
        </div>
        <div className="overflow-y-auto">
          {/* 대화 목록 */}
          <ChatRoomList chatRoomList={chatRoomList} loggedInUserId={user.id} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default MessagesLayout;
