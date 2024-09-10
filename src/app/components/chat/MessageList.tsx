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

export default MessageList;
