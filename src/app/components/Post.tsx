"use client";

import { useEffect, useState } from "react";
import Presentation from "./Presentation";
import PresentationHeader from "./PresentationHeader";
import IPost from "@/app/types/IPost";
import getUserProfileDataById from "@/app/lib/api/getUserProfileDataById";
import Link from "next/link";

const Post = ({
  id,
  content,
  image,
  user_id,
  created_at,
  updated_at,
}: IPost) => {
  const [userData, setUserData] = useState<any>(null);

  const avatar_url = userData?.avatar_url;
  const username = userData?.username;

  useEffect(() => {
    // 유저 데이터를 가져오는 비동기 함수 호출
    const getUserData = async () => {
      try {
        const data = await getUserProfileDataById(user_id);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, [user_id]);

  return (
    <div className="w-[479px] h-[813px] mb-[20px] border-b border-gray-600 pt-0 pr-0 pb-[16px] pl-0">
      <PresentationHeader
        created_at={created_at}
        user_id={user_id}
        avatar_url={avatar_url}
        username={username}
      />
      <Link href={`/post/${id}`}>
        <Presentation
          image={image}
          user_id={user_id}
          content={content}
          username={username}
        />
      </Link>
    </div>
  );
};

export default Post;
