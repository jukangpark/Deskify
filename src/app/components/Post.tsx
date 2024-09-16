"use client";

import { useEffect, useState } from "react";
import Presentation from "./Presentation";
import PresentationHeader from "./PresentationHeader";
import IPost from "@/app/types/IPost";
import getUserProfileDataById from "@/utils/supabase/api/getUserProfileDataById";
import { useRecoilValue } from "recoil";
import loginUserAtom from "@/atom/loginUserAtom";
import { usePathname } from "next/navigation";

const Post = ({
  id: post_id, // server 데이터 스키마 인터페이스를 그대로 사용하고, props 이름의 명확함을 위해 id를 post_id로 변경 [To Do] 테이블 데이터 스키마를 변경해도 좋을듯.
  content,
  image,
  user_id,
  created_at,
  updated_at,
}: IPost) => {
  const [userData, setUserData] = useState<any>(null);
  const loggedInUser = useRecoilValue(loginUserAtom);
  const { avatar_url, username } = userData || {};
  const pathname = usePathname(); // 현재 경로 가져오기
  const currentPost_id = pathname.split("/").pop(); // 현재 경로 가져오기
  const isDetailPostPage = currentPost_id === post_id;

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

  const loggedInUserId = loggedInUser?.id;

  return (
    <div
      className={`w-[350px] sm:w-[479px] h-[853px] mb-[20px] ${
        !isDetailPostPage && "border-b"
      }  border-gray-600 pt-0 pr-0 pb-[16px] pl-0`}
    >
      <PresentationHeader
        created_at={created_at}
        user_id={user_id}
        avatar_url={avatar_url}
        username={username}
      />
      <Presentation
        image={image}
        post_id={post_id}
        user_id={user_id}
        loggedInUserId={loggedInUserId}
        content={content}
        username={username}
        isDetailPostPage={isDetailPostPage}
      />
    </div>
  );
};

export default Post;
