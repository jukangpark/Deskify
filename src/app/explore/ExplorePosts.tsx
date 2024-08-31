"use client";

import { useEffect, useState } from "react";
import getPosts from "@/utils/supabase/api/getPosts";
import IPost from "@/app/types/IPost";
import Image from "next/image";
import Link from "next/link";

const ExplorePosts = () => {
  const [posts, setPost] = useState<IPost[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts();

        if (posts) {
          setPost(posts);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-1 max-w-[910px] mx-auto">
      {posts.map((postData) => {
        const { id, content, image, user_id, created_at, updated_at } =
          postData;

        return (
          <div
            key={id}
            className="relative w-full"
            style={{ aspectRatio: "1/1" }}
          >
            <Link href={`/post/${id}`}>
              <Image
                src={image}
                alt={content}
                layout="fill"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  objectPosition: "center",
                }}
                priority={true} // Add the priority prop
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ExplorePosts;
