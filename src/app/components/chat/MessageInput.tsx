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

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      // Enter 키를 누르면 메시지를 전송

      await createMessage(`${currentChatRoomId}`, loggedInUser.id, messageText);

      setMessageText("");
    }
  };

  return (
    <div className="flex">
      <input
        onSubmit={(e) => {
          e.preventDefault(); // 폼제출 막기
        }}
        value={messageText} // 입력 값
        onChange={(e) => {
          setMessageText(e.target.value);
        }} // 입력 값 업데이트
        onKeyDown={handleKeyDown} // Enter 키 입력 처리
        type="text"
        className="flex-grow border rounded-lg p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default MessageInput;
