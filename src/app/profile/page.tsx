"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import IPost from "../types/IPost";
import getPostsByUserId from "@/utils/supabase/api/getPostsByUserId";
import ProfilePost from "../components/profile/ProfilePost";
import useRequireAuth from "@/hooks/useRequireAuth";
import getFollowersCountByUserId from "@/utils/supabase/api/getFollowerCountByUserId";
import getFollowingCountByUserId from "@/utils/supabase/api/getFollowingCountByUserId";

const ProfilePage = () => {
  const user = useRequireAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    if (user) {
      (async () => {
        const posts = await getPostsByUserId(user.id);

        setPosts(posts);
      })();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      (async () => {
        const followersCount = await getFollowersCountByUserId(user.id);
        const followingCount = await getFollowingCountByUserId(user.id);
        setFollowersCount(followersCount);
        setFollowingCount(followingCount);
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
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            className="rounded-full"
            src={user?.user_metadata.avatar_url}
            alt="avatar"
            width={150}
            height={150}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="ml-4">
          <h1 className="text-[20px]">{user_name}</h1>
          <div className="flex">
            <div className="p-4">
              <span className="font-black">{posts.length}</span> posts
            </div>
            <div className="p-4">
              <span className="font-black">{followersCount}</span> followers
            </div>
            <div className="p-4">
              <span className="font-black">{followingCount}</span> following
            </div>
          </div>
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
