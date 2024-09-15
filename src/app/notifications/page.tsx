"use client";

import useRequireAuth from "@/hooks/useRequireAuth";

const NotificationList = () => {
  const notifications = [
    { type: "message", content: "User1 sent you a message", time: "2h" },
    { type: "follow", content: "User2 started following you", time: "5h" },
    { type: "like", content: "User3 liked your post", time: "1d" },
  ];

  return (
    <ul>
      {notifications.map((notification, index) => (
        <li
          key={index}
          className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
        >
          <div className="font-bold text-white">{notification.content}</div>
          <div className="text-xs text-gray-500">{notification.time}</div>
        </li>
      ))}
    </ul>
  );
};

const NotificationPage = () => {
  const user = useRequireAuth();

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-transparent">
      {/* 좌측 알림 목록 */}
      <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 bg-transparent border-r border-gray-700">
        <div className="p-4 font-bold text-lg text-white">Notifications</div>
        <div className="overflow-y-auto h-full">
          {/* 알림 목록 */}
          <NotificationList />
        </div>
      </div>

      {/* 우측 상세보기 창 (선택 시 내용 표시 영역, 현재는 비워둠) */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-transparent">
          <div className="font-bold text-lg text-white">Details</div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 bg-transparent">
          {/* 알림 선택 후의 세부 내용 */}
          <div className="text-gray-400">
            Select a notification to view details
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
