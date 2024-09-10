import getUserProfileDataById from "@/utils/supabase/api/getUserProfileDataById";
import { useEffect, useState } from "react";

interface IChatRoom {
  id: string;
  user_1_id: string;
  user_2_id: string;
}

interface ChatRoomListProps {
  chatRoomList: IChatRoom[];
  loggedInUserId: string;
}

const ChatRoomList = ({ chatRoomList, loggedInUserId }: ChatRoomListProps) => {
  const [opponentProfiles, setOpponentProfiles] = useState<any>({});

  const getOpponentId = (chatRoom: IChatRoom, loggedInUserId: string) => {
    return chatRoom.user_1_id === loggedInUserId
      ? chatRoom.user_2_id
      : chatRoom.user_1_id;
  };

  useEffect(() => {
    (async () => {
      const opponentIdList = chatRoomList.map((chatRoom) =>
        getOpponentId(chatRoom, loggedInUserId)
      );

      const opponentProfileListData = await Promise.all(
        opponentIdList.map((opponentId) => getUserProfileDataById(opponentId))
      );

      // 상대방 ID를 키로 하는 객체로 프로필 데이터를 저장
      const profileMap: { [key: string]: any } = {};
      opponentProfileListData.forEach((profile) => {
        if (profile) {
          profileMap[profile.id] = profile;
        }
      });

      setOpponentProfiles(profileMap);
    })();
  }, [chatRoomList, loggedInUserId]);

  return (
    <ul>
      {chatRoomList.map((chatRoom, index) => {
        // lastMessage와 time은 메시지 데이터를 가져와서 추가할 수 있습니다.
        // 예시 데이터로 대체
        const lastMessage = "Last message text";
        const time = "2h";

        const opponentId = getOpponentId(chatRoom, loggedInUserId);
        const opponentProfile = opponentProfiles[opponentId];

        return (
          <li
            key={index}
            className="p-4 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          >
            {/* 상대방의 ID 또는 추후 상대방 이름으로 변경 가능 */}
            <div className="font-bold dark:text-white">
              {opponentProfile ? opponentProfile.username : "Loading..."}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {lastMessage}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {time}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatRoomList;
