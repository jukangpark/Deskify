"use client";

import Image from "next/image";
import getUserProfileDataById from "@/utils/supabase/api/getUserProfileDataById";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IUser from "@/app/types/IUser";
import IPost from "@/app/types/IPost";
import getPostsByUserId from "@/utils/supabase/api/getPostsByUserId";
import ProfilePost from "@/app/components/profile/ProfilePost";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const ProfilePage = (props: ProfilePageProps) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
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

  if (!user) {
    return null;
  }

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
          <h1 className="text-[20px]">{user.username}</h1>
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
