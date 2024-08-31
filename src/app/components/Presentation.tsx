import Image from "next/image";
import LikeButton from "./common/LikeButton";
import CommentButton from "./common/CommentButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import getCommentsByPostId from "@/utils/supabase/api/getCommentsByPostId";
import IComment from "../types/IComment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Presentation = ({
  image,
  post_id,
  user_id,
  content,
  username,
}: {
  image: string;
  post_id: string;
  user_id: string;
  content: string;
  username: string | undefined;
}) => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsByPostId(post_id);
      setComments(commentData);
    })();
  }, [post_id]);

  return (
    <div className="w-[100%] h-[585px] sm:w-[468px] border border-gray-600">
      <div className="relative w-full h-full">
        <Link href={`/post/${post_id}`}>
          <Image
            src={image}
            alt="post"
            width={466}
            height={583}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            priority={true} // Add the priority prop
          />
        </Link>
      </div>
      <div className="flex p-2 gap-x-4">
        <LikeButton />
        <CommentButton post_id={post_id} setComments={setComments} />
      </div>
      <div className="pl-2">
        <Link href={`/profile/${user_id}`}>
          <span className="font-black">{username}</span> : {""}
        </Link>
        <span className="font-extralight">{content}</span>
      </div>
      <div className="pl-2 overflow-y-auto max-h-20">
        {comments.map(({ content, id, updated_at }) => {
          const date = dayjs(updated_at);
          return (
            <div key={id} className="p-1 font-extralight">
              Writer : <span className="text-gray-400">{content}</span>
              <div className="text-sm text-gray-400">{date.fromNow()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Presentation;
