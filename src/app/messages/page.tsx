"use client";

import useRequireAuth from "@/hooks/useRequireAuth";

const ConversationList = () => {
  const conversations = [
    { username: "User1", lastMessage: "Hello!", time: "2h" },
    { username: "User2", lastMessage: "How are you?", time: "5h" },
    { username: "User3", lastMessage: "Let's catch up!", time: "1d" },
  ];

  return (
    <ul>
      {conversations.map((conv, index) => (
        <li
          key={index}
          className="p-4 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          <div className="font-bold dark:text-white">{conv.username}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {conv.lastMessage}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {conv.time}
          </div>
        </li>
      ))}
    </ul>
  );
};

const MessageInput = () => {
  return (
    <div className="flex">
      <input
        type="text"
        className="flex-grow border rounded-lg p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        placeholder="Type a message..."
      />
    </div>
  );
};

const MessageList = () => {
  const messages = [
    { sender: "me", text: "Hello!", time: "2h" },
    { sender: "other", text: "Hi! How are you?", time: "1h" },
    { sender: "me", text: "I'm good, thanks!", time: "30m" },
  ];

  return (
    <div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-2 my-2 rounded-lg ${
              message.sender === "me"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            } max-w-xs`}
          >
            {message.text}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {message.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MessagesPage = () => {
  const user = useRequireAuth();

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
          <ConversationList />
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
