"use client";

const MessagesPage = () => {
  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="font-bold text-xs sm:text-lg dark:text-white">
          Select Chat Room
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4"></div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700"></div>
    </div>
  );
};

export default MessagesPage;
