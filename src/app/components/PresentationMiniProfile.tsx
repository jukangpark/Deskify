import Link from "next/link";
import Image from "next/image";

const PresentationMiniProfile = ({
  date,
  user_id,
  avatar_url,
  username,
}: {
  date: string;
  user_id: string;
  avatar_url: string | undefined;
  username: string | undefined;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/profile/${user_id}`}
            className="display: flex items-center"
          >
            {avatar_url ? (
              <Image
                src={`${avatar_url}`}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-[32px] h-[32px] bg-gray-300 rounded-full"></div>
            )}

            <span className="ml-2 text-[14px]">{username}</span>
          </Link>
        </div>
        <div className="pr-3 text-gray-500">{date}</div>
      </div>
    </div>
  );
};

export default PresentationMiniProfile;
