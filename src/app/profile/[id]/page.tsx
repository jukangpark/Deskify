"use client";

import Image from "next/image";
import getUserProfileDataById from "@/utils/supabase/api/getUserProfileDataById";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IUser from "@/app/types/IUser";
import IPost from "@/app/types/IPost";
import getPostsByUserId from "@/utils/supabase/api/getPostsByUserId";
import ProfilePost from "@/app/components/profile/ProfilePost";
import getFollowersCountByUserId from "@/utils/supabase/api/getFollowerCountByUserId";
import getFollowingCountByUserId from "@/utils/supabase/api/getFollowingCountByUserId";
import { useRecoilValue } from "recoil";
import loginUserAtom from "@/atom/loginUserAtom";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const ProfilePage = (props: ProfilePageProps) => {
  const router = useRouter();
  const loggedInUser = useRecoilValue(loginUserAtom);
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

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

  if (!user) {
    return null;
  }

  const isMyProfile = loggedInUser?.id === user?.id;
  const isLoggedIn = loggedInUser?.id;

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
            src={user.avatar_url}
            alt="avatar"
            width={150}
            height={150}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="ml-4">
          <h1 className="text-[20px] flex items-center space-x-4">
            <div>{user.username}</div>
            {!isMyProfile && isLoggedIn && (
              <>
                <button className="block text-[14px] bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition duration-300 ease-in-out">
                  Follow
                </button>
                <button className="block text-[14px] bg-gray-700 hover:bg-gray-500 text-white font-semibold py-1 px-2 rounded transition duration-300 ease-in-out">
                  Message
                </button>
              </>
            )}
          </h1>
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
