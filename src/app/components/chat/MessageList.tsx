import IMessage from "@/app/types/IMessage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface MessageListProps {
  messages: IMessage[];
  loggedInUser: any;
}

const MessageList = ({ messages, loggedInUser }: MessageListProps) => {
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
              className={`p-2 my-2 rounded-lg ${
                isMyMessage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              } max-w-xs`}
            >
              {message.text}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {date.fromNow()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
