import PresentationMiniProfile from "./PresentationMiniProfile";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PresentationHeader = ({
  created_at,
  user_id,
  avatar_url,
  username,
}: {
  created_at: string;
  user_id: string;
  avatar_url: string | undefined;
  username: string | undefined;
}) => {
  const date = dayjs(created_at);

  return (
    <div className="h-[46px] mb-[12px]">
      <PresentationMiniProfile
        date={date.fromNow()}
        user_id={user_id}
        avatar_url={avatar_url}
        username={username}
      />
    </div>
  );
};

export default PresentationHeader;
