import IMessage from "@/app/types/IMessage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef } from "react";

dayjs.extend(relativeTime);

interface MessageListProps {
  messages: IMessage[];
  loggedInUser: any;
}

const MessageList = ({ messages, loggedInUser }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null); // 마지막 메시지를 참조할 ref

  // 채팅 메시지 생성시, 자동으로 스크롤을 내려주기
  useEffect(() => {
    // 메시지가 업데이트될 때마다 마지막 메시지로 스크롤
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {messages.map((message, index) => {
        const { created_at, sender_id, text } = message;

        const date = dayjs(created_at);
        const isMyMessage = sender_id === loggedInUser.id;

        return (
          <div
            key={index}
            className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-1 sm:p-2 my-2 text-[12px] sm:text-lg rounded-lg ${
                isMyMessage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              } max-w-xs`}
            >
              {message.text}
              <div className="text-[9px] sm:text-xs text-gray-500text-gray-400 mt-1">
                {date.fromNow()}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} /> {/* 마지막 메시지를 참조하는 div */}
    </div>
  );
};

export default MessageList;
