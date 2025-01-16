"use client";

import Post from "../Post";
import getPosts from "@/utils/supabase/api/getPosts";
import IPost from "@/app/types/IPost";
import { useSuspenseQuery } from "@tanstack/react-query";

const Posts = () => {
  const {
    data: posts,
    isPending,
    error,
    refetch, // 필요한 경우 수동으로 재요청할 수 있음
  } = useSuspenseQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center">Failed to load posts</div>
        <button
          onClick={() => refetch()}
          className="text-blue-500 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div>
        {posts?.map((postData) => {
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
    </div>
  );
};

export default Posts;
