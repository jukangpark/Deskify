"use client";

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
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <Image
                  className="rounded-full"
                  src={`${avatar_url}`}
                  alt="avatar"
                  width={32}
                  height={32}
                  style={{ objectFit: "cover" }}
                />
              </div>
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
