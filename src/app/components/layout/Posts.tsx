"use client";

import { useEffect, useState } from "react";
import Post from "../Post";
import getPosts from "@/utils/supabase/api/getPosts";
import IPost from "@/app/types/IPost";

const Posts = () => {
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
    <div className="w-[630px] mx-auto">
      {posts.map((postData) => {
        const { id, content, image, user_id, created_at, updated_at } =
          postData;

        return (
          <Post
            key={id}
            id={id}
            content={content}
            image={image}
            user_id={user_id}
            created_at={created_at}
            updated_at={updated_at}
          />
        );
      })}
    </div>
  );
};

export default Posts;
