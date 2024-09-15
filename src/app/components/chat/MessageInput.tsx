import createMessage from "@/utils/supabase/api/chat/createMessage";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface MessageInputProps {
  loggedInUser: any; // 임시로 any 로 설정
}

const MessageInput = ({ loggedInUser }: MessageInputProps) => {
  const [messageText, setMessageText] = useState(""); // 입력된 메시지 상태 관리
  const pathname = usePathname();
  const currentChatRoomId = pathname.split("/").pop(); // 현재 chatRoomId 추출

  const handleCreateMessage = async () => {
    await createMessage(`${currentChatRoomId}`, loggedInUser.id, messageText);
    setMessageText("");
  };

  return (
    <div className="flex w-full">
      <form
        className="block w-full"
        onSubmit={(e) => {
          e.preventDefault(); // 폼제출 막기
          handleCreateMessage();
        }}
      >
        <input
          value={messageText} // 입력 값
          onChange={(e) => {
            setMessageText(e.target.value);
          }} // 입력 값 업데이트
          type="text"
          className="text-[10px] sm:text-[12px] w-full flex-grow border rounded-lg p-1 sm:p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Type a message..."
        />
      </form>
    </div>
  );
};

export default MessageInput;
