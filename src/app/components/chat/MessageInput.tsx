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

export default MessageInput;
