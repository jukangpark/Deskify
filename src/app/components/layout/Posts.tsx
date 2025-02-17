import Post from "../Post";
import getPosts from "@/utils/supabase/api/getPosts";
import IPost from "@/app/types/IPost";
import { use } from "react";

const Posts = () => {
  const posts: IPost[] = use(getPosts());

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
