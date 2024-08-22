"use client";

import Image from "next/image";
import Feed from "@/app/components/layout/Feed";
import getUserProfileDataById from "@/app/lib/api/getUserProfileDataById";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IUser from "@/app/types/IUser";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const ProfilePage = (props: ProfilePageProps) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const items = Array.from({ length: 9 }); // 40개의 아이템을 생성
  const { id } = props.params;

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfileDataById(id);

        if (data) {
          setUser(data);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error(error);
        router.push("/404");
      }
    })();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Feed>
        <div className="display: flex mx-auto max-w-[910px] border-b border-gray-600 pb-[174px]">
          <div>
            {user.avatar_url ? (
              <Image
                className="rounded-full"
                src={user.avatar_url}
                alt="avatar"
                width={150}
                height={150}
              />
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-600 rounded-full"></div>
            )}
          </div>
          <div className="ml-4">
            {user.username ? (
              <h1 className="text-[20px]">{user.username}</h1>
            ) : (
              <>
                <h1>User not found</h1>
                <p className="text-color-[gray]">
                  The user you are looking for does not exist.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 max-w-[910px] mx-auto mt-20">
          {items.map((_, index) => (
            <div
              key={index}
              className="w-[300px] h-[300px] bg-gray-300 border border-gray-600 "
            />
          ))}
        </div>
      </Feed>
    </div>
  );
};

export default ProfilePage;
