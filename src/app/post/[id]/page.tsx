"use client";

import { useEffect, useState } from "react";
import Post from "../../components/Post";
import getPostById from "@/utils/supabase/api/getPostById";
import IPost from "@/app/types/IPost";
import { useRouter } from "next/navigation";

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage = (props: PostPageProps) => {
  const router = useRouter();
  const [post, setPost] = useState<IPost | any>(null);

  const { id } = props.params;

  useEffect(() => {
    (async () => {
      try {
        const data = await getPostById(id);
        if (data) {
          setPost(data);
        } else {
          router.replace("/404"); // 404 페이지로 리다이렉트
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  if (!post) {
    return null;
  }

  const { content, image, user_id, created_at, updated_at } = post;

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-center">
        <Post
          id={id}
          content={content}
          image={image}
          user_id={user_id}
          created_at={created_at}
          updated_at={updated_at}
        />
      </div>
    </div>
  );
};

export default PostPage;
