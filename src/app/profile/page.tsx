"use client";

import Feed from "../components/layout/Feed";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import loginUserAtom from "@/atom/loginUserAtom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const items = new Array(9).fill(0);
  const user = useRecoilValue(loginUserAtom);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // 상태 업데이트는 useEffect 내부에서 처리
    }
  }, [user, router]);

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user) {
    return null;
  }

  const user_name = user?.user_metadata.full_name;

  return (
    <div>
      <Feed>
        <div className="display: flex mx-auto max-w-[910px] border-b border-gray-600 pb-[174px]">
          <div>
            <Image
              className="rounded-full"
              src={user?.user_metadata.avatar_url}
              alt="avatar"
              width={150}
              height={150}
            />
          </div>
          <div className="ml-4">
            <h1 className="text-[20px]">{user_name}</h1>
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
