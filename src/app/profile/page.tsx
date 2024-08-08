"use client";

import Feed from "../components/layout/Feed";
import getSession from "@/utils/supabase/auth/getSession";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Session as SupabaseSession } from "@supabase/auth-js";

interface User {
  avatar_url: string;
  name: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const { session } = await getSession();

      if (session) {
        setUser({
          avatar_url: session.user.user_metadata.avatar_url,
          name: session.user.user_metadata.name,
        });
      } else {
        console.error("No session found");
      }
    })();
  }, []);

  if (!user) {
    return null;
  }

  const items = Array.from({ length: 9 }); // 40개의 아이템을 생성

  return (
    <div>
      <Feed>
        <div className="display: flex mx-auto max-w-[910px] border-b border-gray-600 pb-[174px]">
          <div>
            <Image
              className="rounded-full"
              src={user.avatar_url}
              alt="avatar"
              width={150}
              height={150}
            />
          </div>
          <div className="ml-4">
            <h1 className="text-[20px]">{user.name}</h1>
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
