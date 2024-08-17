"use client";

import { useEffect, useState } from "react";
import getPosts from "@/utils/supabase/api/getPosts";
import IPost from "@/app/types/IPost";
import Image from "next/image";

const ExplorePosts = () => {
  const [posts, setPost] = useState<IPost[]>([]);

  useEffect(() => {
    (async () => {
      const posts = await getPosts();

      if (posts) {
        setPost(posts);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 max-w-[932px] mx-auto">
      {posts.map((postData) => {
        const { id, content, image, user_id, created_at, updated_at } =
          postData;

        return (
          <div key={id} className="w-[300px] h-[300px] relative">
            <Image
              src={image}
              alt={content}
              layout="fill"
              objectFit="cover" // 이미지가 박스에 맞게 자르거나 채우도록 함
              objectPosition="center" // 이미지의 중앙을 기준으로 채우도록 설정
            />
          </div>
        );
      })}
    </div>
  );
};

export default ExplorePosts;
