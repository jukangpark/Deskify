"use client";

import Image from "next/image";
import { useRecoilValue } from "recoil";
import loginUserAtom from "@/atom/loginUserAtom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IPost from "../types/IPost";
import getPostsByUserId from "@/utils/supabase/api/getPostsByUserId";
import ProfilePost from "../components/profile/ProfilePost";

const ProfilePage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const user = useRecoilValue(loginUserAtom);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // 상태 업데이트는 useEffect 내부에서 처리
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      (async () => {
        const posts = await getPostsByUserId(user.id);

        setPosts(posts);
      })();
    }
  }, [user]);

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user) {
    return null;
  }

  const user_name = user?.user_metadata.full_name;

  return (
    <div>
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
        {posts.map((postData, index) => {
          const { id: post_id, image } = postData;
          return <ProfilePost key={index} post_id={post_id} image={image} />;
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
